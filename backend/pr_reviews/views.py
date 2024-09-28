# pr_reviews/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PivotedKeyMeasureSerializer, ReturnPreviousSerializer, ReturnWithMeasuresSerializer
from key_measures.models import CapitalKeyMeasure, LiquidityKeyMeasure, InvestmentKeyMeasure, CreditKeyMeasure  # Import models
from data.models import ScheduledFact
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Helper function to pivot a single model instance into long format
def pivot_model_to_long_format(model_instance, source, exclude_fields=['returnId']):
    """
    Pivot a Django model instance into a long format where each field is a key and the value is the measure.
    Includes ScheduledFact fields (template_id, status_id, state_id, reportingDate) and source of the measure.
    """
    long_format_data = []
    
    # Access the related ScheduledFact instance through returnId
    scheduled_fact = model_instance.returnId

    # Loop through the model fields, excluding fields like returnId
    for field in model_instance._meta.get_fields():
        if field.name not in exclude_fields and hasattr(model_instance, field.name):
            value = getattr(model_instance, field.name, None)
            long_format_data.append({
                'returnId': model_instance.returnId.id,
                'source': source,
                'measureId': field.name,
                'measure': field.verbose_name,
                'value': value
            })
    return long_format_data

# Function to pivot all key measures across all models and optionally filter by returnId
def pivot_all_key_measures(return_id=None):
    all_long_format_data = []
    
    if return_id:
        capital_qs = CapitalKeyMeasure.objects.filter(returnId=return_id)
        liquidity_qs = LiquidityKeyMeasure.objects.filter(returnId=return_id)
        investment_qs = InvestmentKeyMeasure.objects.filter(returnId=return_id)
        credit_qs = CreditKeyMeasure.objects.filter(returnId=return_id)
    else:
        capital_qs = CapitalKeyMeasure.objects.all()
        liquidity_qs = LiquidityKeyMeasure.objects.all()
        investment_qs = InvestmentKeyMeasure.objects.all()
        credit_qs = CreditKeyMeasure.objects.all()

    for instance in capital_qs:
        all_long_format_data.extend(pivot_model_to_long_format(instance, source="capital"))
    
    for instance in liquidity_qs:
        all_long_format_data.extend(pivot_model_to_long_format(instance, source="liquidity"))
    
    for instance in investment_qs:
        all_long_format_data.extend(pivot_model_to_long_format(instance, source="investment"))
    
    for instance in credit_qs:
        all_long_format_data.extend(pivot_model_to_long_format(instance, source="credit"))
    
    return all_long_format_data


class KeyMeasuresLongFormatView(APIView):
    """
    API View to retrieve key measures in long format. Optional filtering by returnId.
    """

    return_id_param = openapi.Parameter('returnId', openapi.IN_QUERY, description="Return Id to filter key measures", type=openapi.TYPE_INTEGER)

    @swagger_auto_schema(
        operation_description="Retrieve key measures in pivoted long format. Optionally filter by returnId.",
        manual_parameters=[return_id_param],
        responses={200: PivotedKeyMeasureSerializer(many=True)}
    )
    def get(self, request):
        return_id = request.query_params.get('returnId')
        long_format_data = pivot_all_key_measures(return_id)
        
        if not long_format_data:
            return Response({"detail": "No data found for the given returnId."}, status=status.HTTP_404_NOT_FOUND)

        # Serialize the data before returning
        serializer = PivotedKeyMeasureSerializer(long_format_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



def get_previous_four_quarters(quarter_ref):
    """
    Calculate the previous four quarterRefs based on the input quarter_ref (e.g., 202402 -> ['202401', '202304', '202303', '202302'])
    """
    year = int(str(quarter_ref)[:4])  # Extract the year (e.g., 2024 from 202402)
    quarter = int(str(quarter_ref)[4:])  # Extract the quarter number (e.g., 02 from 202402)

    previous_quarters = []
    
    for _ in range(4):
        # Decrement the quarter and adjust the year if needed
        if quarter == 1:
            quarter = 4
            year -= 1
        else:
            quarter -= 1
        
        previous_quarters.append(f"{year}{quarter:02d}")  # Format as 'YYYYQQ'

    return previous_quarters

def get_flattened_return_and_previous_quarters(base_return):
    """
    Fetch the base returnId details and the previous four quarters with sub_rank, sub_quarterRef, and sub_returnId in a flattened structure.
    """
    firm_id = base_return.firm_id
    current_quarter_ref = base_return.quarterRef

    # Get the previous four quarterRefs
    previous_quarters = get_previous_four_quarters(current_quarter_ref)

    # Initialize the flattened result list
    flattened_result = []

    # Add the base return as sub_rank 1
    flattened_result.append({
        "base_return_id": base_return.id,
        "firm_id": firm_id,
        "quarter_ref": current_quarter_ref,
        "sub_rank": 1,
        "sub_quarterRef": current_quarter_ref,
        "sub_returnId": base_return.id
    })

    # Now, loop through the previous quarters and add sub_rank 2, 3, 4, 5
    sub_rank = 2
    for quarter in previous_quarters:
        sub_return = ScheduledFact.objects.filter(
            firm_id=firm_id,
            quarterRef=quarter,
            state_id=1
        ).first()  # Get the first matching ScheduledFact for the quarterRef

        flattened_result.append({
            "base_return_id": base_return.id,
            "firm_id": firm_id,
            "quarter_ref": current_quarter_ref,
            "sub_rank": sub_rank,
            "sub_quarterRef": quarter,
            "sub_returnId": sub_return.id if sub_return else None  # Handle if no matching returnId is found
        })
        sub_rank += 1

    return flattened_result


class ReturnAndPreviousQuartersView(APIView):
    """
    API View to get the base returnId and the previous returnIds with their corresponding sub_rank and sub_quarterRef
    for all returnIds, or filtered by a specific returnId using a query parameter.
    """

    # Swagger query parameter for returnId
    return_id_param = openapi.Parameter('returnId', openapi.IN_QUERY, description="Return Id to filter key measures", type=openapi.TYPE_INTEGER)

    @swagger_auto_schema(
        operation_description="Retrieve previous return details with sub_ranks. Optionally filter by returnId.",
        manual_parameters=[return_id_param],
        responses={200: ReturnPreviousSerializer(many=True)}
    )
    def get(self, request):
        # Get the 'returnId' query parameter if provided
        return_id = request.query_params.get('returnId', None)

        # If returnId is provided, filter the ScheduledFact by that returnId
        if return_id:
            try:
                base_return = ScheduledFact.objects.get(id=return_id, state_id=1)
                result = get_flattened_return_and_previous_quarters(base_return)
                # Serialize the result
                serializer = ReturnPreviousSerializer(result, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ScheduledFact.DoesNotExist:
                return Response({"detail": "No return found for the given returnId."}, status=status.HTTP_404_NOT_FOUND)
        
        # If no returnId is provided, process all returnIds in the database
        all_base_returns = ScheduledFact.objects.filter(state_id=1)

        # Initialize an empty list to store all results
        all_results = []

        for base_return in all_base_returns:
            flattened_result = get_flattened_return_and_previous_quarters(base_return)
            all_results.extend(flattened_result)

        # Serialize the result
        serializer = ReturnPreviousSerializer(all_results, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

def get_reporting_period_from_quarter(quarter_ref):
    """
    Convert a quarterRef (e.g., 202402) to a reporting period in the format YYYY-MM,
    representing the end of the quarter (e.g., 2024-03 for Q1, 2024-06 for Q2, etc.).
    """
    year = int(str(quarter_ref)[:4])
    quarter = int(str(quarter_ref)[4:])

    quarter_end_months = {1: '03', 2: '06', 3: '09', 4: '12'}
    month = quarter_end_months.get(quarter, '03')
    return f"{year}-{month}"

# Add this new view to your views.py
class ReturnWithMeasuresView(APIView):
    """
    API View to get the base returnId and the previous returnIds with their corresponding sub_rank,
    sub_quarterRef, sub_reportingPeriod, sub_returnId, and the related source, measure, and value.
    """

    return_id_param = openapi.Parameter(
        'returnId', openapi.IN_QUERY, description="Return Id to filter by", type=openapi.TYPE_INTEGER
    )

    @swagger_auto_schema(
        operation_description="Retrieve previous return details with reporting periods, sources, measures, and values.",
        manual_parameters=[return_id_param],
        responses={200: ReturnWithMeasuresSerializer(many=True)}
    )
    def get(self, request):
        return_id = request.query_params.get('returnId')

        if return_id:
            try:
                base_return = ScheduledFact.objects.get(id=return_id, state_id=1)
                previous_quarters = get_flattened_return_and_previous_quarters(base_return)
                response_data = []

                # Loop through each quarter and add the key measures
                for quarter_data in previous_quarters:
                    sub_return_id = quarter_data["sub_returnId"]

                    if sub_return_id:
                        # Fetch key measures using the existing pivot function
                        key_measures = pivot_all_key_measures(sub_return_id)
                        sub_reporting_period = get_reporting_period_from_quarter(quarter_data["sub_quarterRef"])

                        # Append key measures to the response
                        for measure in key_measures:
                            response_data.append({
                                "base_return_id": quarter_data["base_return_id"],
                                "sub_quarterRef": quarter_data["sub_quarterRef"],
                                "sub_reportingPeriod": sub_reporting_period,
                                "sub_returnId": sub_return_id,
                                "source": measure["source"],
                                "measure": measure["measure"],
                                "value": measure["value"]
                            })

                # Return serialized response data
                if response_data:
                    serializer = ReturnWithMeasuresSerializer(response_data, many=True)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response({"detail": "No key measures found for the given returnId."}, status=status.HTTP_404_NOT_FOUND)

            except ScheduledFact.DoesNotExist:
                return Response({"detail": "No return found for the given returnId."}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({"detail": "returnId query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

