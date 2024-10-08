from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import (
    PivotedKeyMeasureSerializer, 
    ReturnPreviousSerializer, 
    ReturnWithMeasuresSerializer, 
    ReturnWithPivotedMeasuresSerializer, 
    ReturnWithPivotedMeasuresWithAverageSerializer,
    PRReviewWithDetailsSerializer,
    PRReviewTableSerializer,
    PRReviewMeasureSerializer,
    MeasureCommentsSerializer,
)
from key_measures.models import CapitalKeyMeasure, LiquidityKeyMeasure, InvestmentKeyMeasure, CreditKeyMeasure, AverageKeyMeasure
from data.models import ScheduledFact
from .models import PRReviewTable, PRReviewMeasure
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


class ReturnWithPivotedMeasuresView(APIView):
    """
    API View to get the base returnId and pivot out the values for the current quarter and the previous four quarters.
    Fields: base_return_id, source, measure, current_Q0, prior_Q1, prior_Q2, prior_Q3, prior_Q4, perc_diff_pq, perc_diff_py.
    """

    return_id_param = openapi.Parameter(
        'returnId', openapi.IN_QUERY, description="Return Id to filter by", type=openapi.TYPE_INTEGER
    )

    @swagger_auto_schema(
        operation_description="Retrieve pivoted key measures across current and previous quarters with percent differences.",
        manual_parameters=[return_id_param],
        responses={200: ReturnWithPivotedMeasuresSerializer(many=True)}
    )
    def get(self, request):
        return_id = request.query_params.get('returnId')

        if return_id:
            try:
                base_return = ScheduledFact.objects.get(id=return_id, state_id=1)
                previous_quarters = get_flattened_return_and_previous_quarters(base_return)

                pivoted_data = {}

                # Iterate over each quarter and get key measures
                for idx, quarter_data in enumerate(previous_quarters):
                    sub_return_id = quarter_data["sub_returnId"]

                    if sub_return_id:
                        # Fetch key measures for the quarter
                        key_measures = pivot_all_key_measures(sub_return_id)

                        # Pivot data for each measure
                        for measure in key_measures:
                            measure_key = (measure["source"], measure["measure"])

                            # Initialize if the measure is not yet in the pivoted_data
                            if measure_key not in pivoted_data:
                                pivoted_data[measure_key] = {
                                    "base_return_id": return_id,
                                    "source": measure["source"],
                                    "measure": measure["measure"],
                                    "current_Q0": None, "prior_Q1": None, "prior_Q2": None,
                                    "prior_Q3": None, "prior_Q4": None,
                                    "perc_diff_pq": None,  # Initialize as None
                                    "perc_diff_py": None   # Initialize as None
                                }

                            # Assign the measure's value to the respective quarter (Q0 to Q4)
                            if idx == 0:
                                pivoted_data[measure_key]["current_Q0"] = measure["value"]
                            elif idx == 1:
                                pivoted_data[measure_key]["prior_Q1"] = measure["value"]
                            elif idx == 2:
                                pivoted_data[measure_key]["prior_Q2"] = measure["value"]
                            elif idx == 3:
                                pivoted_data[measure_key]["prior_Q3"] = measure["value"]
                            elif idx == 4:
                                pivoted_data[measure_key]["prior_Q4"] = measure["value"]

                # Now, calculate percentage differences where applicable
                for measure_key, data in pivoted_data.items():
                    current_Q0 = data.get("current_Q0")
                    prior_Q1 = data.get("prior_Q1")
                    prior_Q4 = data.get("prior_Q4")

                    # Calculate perc_diff_pq ((current_Q0 - prior_Q1) / prior_Q1) * 100
                    if current_Q0 is not None and prior_Q1 is not None and prior_Q1 != 0:
                        data["perc_diff_pq"] = ((current_Q0 - prior_Q1) / prior_Q1) * 100
                    else:
                        data["perc_diff_pq"] = None

                    # Calculate perc_diff_py ((current_Q0 - prior_Q4) / prior_Q4) * 100
                    if current_Q0 is not None and prior_Q4 is not None and prior_Q4 != 0:
                        data["perc_diff_py"] = ((current_Q0 - prior_Q4) / prior_Q4) * 100
                    else:
                        data["perc_diff_py"] = None

                # Convert pivoted_data to a list for serialization
                response_data = list(pivoted_data.values())

                # Return serialized response
                serializer = ReturnWithPivotedMeasuresSerializer(response_data, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

            except ScheduledFact.DoesNotExist:
                return Response({"detail": "No return found for the given returnId."}, status=status.HTTP_404_NOT_FOUND)

        return Response({"detail": "returnId query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)


def get_pivoted_measures_with_averages(return_id):
    """
    Fetch pivoted key measures with averages for a specific returnId.
    """

    try:
        # Fetch the base return object
        base_return = ScheduledFact.objects.get(id=return_id, state_id=1)

        # Get the flattened structure for the previous four quarters, including the base return
        previous_quarters = get_flattened_return_and_previous_quarters(base_return)

        pivoted_data = {}

        # Iterate over each quarter and get key measures
        for idx, quarter_data in enumerate(previous_quarters):
            sub_return_id = quarter_data["sub_returnId"]

            if sub_return_id:
                # Fetch key measures for the quarter
                key_measures = pivot_all_key_measures(sub_return_id)

                # Pivot data for each measure
                for measure in key_measures:
                    measure_key = (measure["source"], measure["measureId"])  # Using measureId for consistency

                    # Initialize if the measure is not yet in the pivoted_data
                    if measure_key not in pivoted_data:
                        pivoted_data[measure_key] = {
                            "base_return_id": return_id,
                            "source": measure["source"],
                            "measure": measure["measure"],
                            "current_Q0": None, "prior_Q1": None, "prior_Q2": None,
                            "prior_Q3": None, "prior_Q4": None,
                            "perc_diff_pq": None,  # Initialize as None
                            "perc_diff_py": None,   # Initialize as None
                            "average": None         # New field for average
                        }

                    # Assign the measure's value to the respective quarter (Q0 to Q4)
                    if idx == 0:
                        pivoted_data[measure_key]["current_Q0"] = measure["value"]
                    elif idx == 1:
                        pivoted_data[measure_key]["prior_Q1"] = measure["value"]
                    elif idx == 2:
                        pivoted_data[measure_key]["prior_Q2"] = measure["value"]
                    elif idx == 3:
                        pivoted_data[measure_key]["prior_Q3"] = measure["value"]
                    elif idx == 4:
                        pivoted_data[measure_key]["prior_Q4"] = measure["value"]

        # Calculate percentage differences and fetch the average values
        for measure_key, data in pivoted_data.items():
            current_Q0 = data.get("current_Q0")
            prior_Q1 = data.get("prior_Q1")
            prior_Q4 = data.get("prior_Q4")

            # Calculate perc_diff_pq ((current_Q0 - prior_Q1) / prior_Q1) * 100
            if current_Q0 is not None and prior_Q1 is not None and prior_Q1 != 0:
                data["perc_diff_pq"] = ((current_Q0 - prior_Q1) / prior_Q1) * 100
            else:
                data["perc_diff_pq"] = None

            # Calculate perc_diff_py ((current_Q0 - prior_Q4) / prior_Q4) * 100
            if current_Q0 is not None and prior_Q4 is not None and prior_Q4 != 0:
                data["perc_diff_py"] = ((current_Q0 - prior_Q4) / prior_Q4) * 100
            else:
                data["perc_diff_py"] = None

            # Fetch the average for the measure from AverageKeyMeasure table using source, measureId and quarter_ref
            average_obj = AverageKeyMeasure.objects.filter(
                quarter_ref=base_return.quarterRef,  # Use the base quarterRef for averages
                source=data["source"],
                measure_id=measure_key[1]  # Use the measureId from the pivot data
            ).first()

            if average_obj:
                data["average"] = average_obj.average_value
            else:
                data["average"] = None

        # Return the pivoted data in list format
        return list(pivoted_data.values())

    except ScheduledFact.DoesNotExist:
        raise ValueError('ScheduledFact not found')


class ReturnWithPivotedMeasuresWithAverageView(APIView):

    return_id_param = openapi.Parameter(
        'returnId', openapi.IN_QUERY, description="Return Id to filter by", type=openapi.TYPE_INTEGER
    )

    @swagger_auto_schema(
        operation_description="Retrieve pivoted key measures across current and previous quarters with averages and percent differences.",
        manual_parameters=[return_id_param],
        responses={200: ReturnWithPivotedMeasuresWithAverageSerializer(many=True)}
    )
    def get(self, request):
        return_id = request.query_params.get('returnId')

        if return_id:
            try:
                # Use the helper function to fetch the measures
                pivoted_data = get_pivoted_measures_with_averages(return_id)

                # Return serialized response
                serializer = ReturnWithPivotedMeasuresWithAverageSerializer(pivoted_data, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

            except ValueError as e:
                return Response({"detail": str(e)}, status=status.HTTP_404_NOT_FOUND)

        return Response({"detail": "returnId query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)


class PRReviewWithDetailsView(generics.ListAPIView):
    queryset = PRReviewTable.objects.all()
    serializer_class = PRReviewWithDetailsSerializer

@api_view(['POST'])
def create_pr_review(request):
    try:
        # Get the `returnId` from the request data
        return_id = request.data.get('returnId')

        # Check if `returnId` is provided
        if not return_id:
            return Response({'error': 'Return ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch the ScheduledFact instance using return_id
        return_instance = ScheduledFact.objects.get(id=return_id)

        # Check if a PRReview already exists for this returnId
        if PRReviewTable.objects.filter(returnId=return_instance).exists():
            return Response({'error': 'A PR Review already exists for this return ID.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new PRReviewTable instance
        pr_review = PRReviewTable.objects.create(returnId=return_instance)

        # Fetch pivoted measures directly (without HTTP request)
        measure_data = get_pivoted_measures_with_averages(return_id)
        
        if not measure_data:
            return Response({'error': 'No measures found for this return ID.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create PRReviewMeasure entries for the created PRReviewTable
        for measure in measure_data:
            PRReviewMeasure.objects.create(
                pr_review=pr_review,
                source=measure['source'],
                measure=measure['measure'],
                current_Q0=measure.get('current_Q0'),
                prior_Q1=measure.get('prior_Q1'),
                prior_Q2=measure.get('prior_Q2'),
                prior_Q3=measure.get('prior_Q3'),
                prior_Q4=measure.get('prior_Q4'),
                perc_diff_pq=measure.get('perc_diff_pq'),
                perc_diff_py=measure.get('perc_diff_py'),
                average=measure.get('average'),
                comments=None  # Set comments to NULL
            )

        # Serialize and return the created PRReviewTable instance
        serializer = PRReviewTableSerializer(pr_review)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except ScheduledFact.DoesNotExist:
        return Response({'error': 'ScheduledFact not found.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class PRReviewMeasuresView(APIView):
    def get(self, request, review_id):
        try:
            # Fetch all measures related to the provided review_id (PRReviewTable)
            measures = PRReviewMeasure.objects.filter(pr_review_id=review_id)
            
            if measures.exists():
                # Serialize the measures data
                serializer = PRReviewMeasureSerializer(measures, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error": "No measures found for this PR review."}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_measure_comments(request, pk):
    try:
        review = PRReviewMeasure.objects.get(pk=pk)
    except PRReviewMeasure.DoesNotExist:
        return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = MeasureCommentsSerializer(review, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': 'Comment updated successfully'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
