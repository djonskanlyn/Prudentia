from rest_framework import viewsets
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
    LoanCategoryDimSerializer, LoanMaturityDimSerializer, CreditRiskDimSerializer
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

class CreditRiskFactViewSet(viewsets.ModelViewSet):
    queryset = CreditRiskFact.objects.all()
    serializer_class = CreditRiskFactSerializer

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