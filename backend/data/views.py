from rest_framework import viewsets, generics
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import (
    FirmDim, TemplateDim, StatusDim, StateDim, ScheduledFact,
    IncomeExpenditureFact, BalanceSheetFact, DepositsInvestmentsFact,
    CreditRiskFact, OutstandingLoanMaturityFact, AdvancedLoanMaturityFact,
    OutstandingLoanCategoryFact, AdvancedLoanCategoryFact, DepositsInvestmentsDim,
    CreditRiskDim, LoanMaturityDim, LoanCategoryDim
)
from .serializers import (
    FirmDimSerializer, TemplateDimSerializer, StatusDimSerializer, StateDimSerializer, ScheduledFactSerializer,
    IncomeExpenditureFactSerializer, BalanceSheetFactSerializer, DepositsInvestmentsFactSerializer,
    CreditRiskFactSerializer, OutstandingLoanMaturityFactSerializer, AdvancedLoanMaturityFactSerializer,
    OutstandingLoanCategoryFactSerializer, AdvancedLoanCategoryFactSerializer, DepositsInvestmentsDimSerializer,
    LoanCategoryDimSerializer, LoanMaturityDimSerializer, CreditRiskDimSerializer,
    ReturnsListSerializer
)

class FirmDimViewSet(viewsets.ModelViewSet):
    queryset = FirmDim.objects.all()
    serializer_class = FirmDimSerializer

class TemplateDimViewSet(viewsets.ModelViewSet):
    queryset = TemplateDim.objects.all()
    serializer_class = TemplateDimSerializer

class StatusDimViewSet(viewsets.ModelViewSet):
    queryset = StatusDim.objects.all()
    serializer_class = StatusDimSerializer

class StateDimViewSet(viewsets.ModelViewSet):
    queryset = StateDim.objects.all()
    serializer_class = StateDimSerializer

class DepositsInvestmentsDimViewSet(viewsets.ModelViewSet):
    queryset = DepositsInvestmentsDim.objects.all()
    serializer_class = DepositsInvestmentsDimSerializer

class CreditRiskDimViewSet(viewsets.ModelViewSet):
    queryset = CreditRiskDim.objects.all()
    serializer_class = CreditRiskDimSerializer

class LoanCategoryDimViewSet(viewsets.ModelViewSet):
    queryset = LoanCategoryDim.objects.all()
    serializer_class = LoanCategoryDimSerializer

class LoanMaturityDimViewSet(viewsets.ModelViewSet):
    queryset = LoanMaturityDim.objects.all()
    serializer_class = LoanMaturityDimSerializer

class ScheduledFactViewSet(viewsets.ModelViewSet):
    queryset = ScheduledFact.objects.all()
    serializer_class = ScheduledFactSerializer

class IncomeExpenditureFactViewSet(viewsets.ModelViewSet):
    queryset = IncomeExpenditureFact.objects.all()
    serializer_class = IncomeExpenditureFactSerializer

class BalanceSheetFactViewSet(viewsets.ModelViewSet):
    queryset = BalanceSheetFact.objects.all()
    serializer_class = BalanceSheetFactSerializer

class DepositsInvestmentsFactViewSet(viewsets.ModelViewSet):
    queryset = DepositsInvestmentsFact.objects.all()
    serializer_class = DepositsInvestmentsFactSerializer

    # Add Swagger documentation for the query parameter 'returnId'
    @swagger_auto_schema(manual_parameters=[
        openapi.Parameter(
            'returnId',  # Query parameter name
            openapi.IN_QUERY,  # Specify that it's in the query string
            description="Filter by Return ID",  # Description of the parameter
            type=openapi.TYPE_INTEGER  # The expected data type
        )
    ])
    def list(self, request, *args, **kwargs):
        queryset = super().get_queryset()

        # Get 'returnId' from the query parameters in the URL
        return_id = self.request.query_params.get('returnId', None)

        if return_id is not None:
            try:
                # Convert 'returnId' to an integer and filter by ForeignKey ID (returnId_id)
                return_id = int(return_id)
                queryset = queryset.filter(returnId_id=return_id)
            except ValueError:
                # If 'returnId' is not a valid integer, return an empty queryset
                queryset = queryset.none()

        return Response(self.get_serializer(queryset, many=True).data)

class CreditRiskFactViewSet(viewsets.ModelViewSet):
    queryset = CreditRiskFact.objects.all()
    serializer_class = CreditRiskFactSerializer

    # Add Swagger documentation for the query parameter 'returnId'
    @swagger_auto_schema(manual_parameters=[
        openapi.Parameter(
            'returnId',  # Query parameter name
            openapi.IN_QUERY,  # Specify that it's in the query string
            description="Filter by Return ID",  # Description of the parameter
            type=openapi.TYPE_INTEGER  # The expected data type
        )
    ])
    def list(self, request, *args, **kwargs):
        queryset = super().get_queryset()

        # Get 'returnId' from the query parameters in the URL
        return_id = self.request.query_params.get('returnId', None)

        if return_id is not None:
            try:
                # Convert 'returnId' to an integer and filter by ForeignKey ID (returnId_id)
                return_id = int(return_id)
                queryset = queryset.filter(returnId_id=return_id)
            except ValueError:
                # If 'returnId' is not a valid integer, return an empty queryset
                queryset = queryset.none()

        return Response(self.get_serializer(queryset, many=True).data)

class OutstandingLoanMaturityFactViewSet(viewsets.ModelViewSet):
    queryset = OutstandingLoanMaturityFact.objects.all()
    serializer_class = OutstandingLoanMaturityFactSerializer

class AdvancedLoanMaturityFactViewSet(viewsets.ModelViewSet):
    queryset = AdvancedLoanMaturityFact.objects.all()
    serializer_class = AdvancedLoanMaturityFactSerializer

class OutstandingLoanCategoryFactViewSet(viewsets.ModelViewSet):
    queryset = OutstandingLoanCategoryFact.objects.all()
    serializer_class = OutstandingLoanCategoryFactSerializer

class AdvancedLoanCategoryFactViewSet(viewsets.ModelViewSet):
    queryset = AdvancedLoanCategoryFact.objects.all()
    serializer_class = AdvancedLoanCategoryFactSerializer

class ReturnsListView(generics.ListAPIView):
    queryset = ScheduledFact.objects.select_related('firm', 'template', 'status', 'state')
    serializer_class = ReturnsListSerializer





