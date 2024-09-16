from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FirmDimViewSet, TemplateDimViewSet, StatusDimViewSet, StateDimViewSet,
    ScheduledFactViewSet, IncomeExpenditureFactViewSet, BalanceSheetFactViewSet,
    DepositsInvestmentsFactViewSet, CreditRiskFactViewSet,
    OutstandingLoanMaturityFactViewSet, AdvancedLoanMaturityFactViewSet,
    OutstandingLoanCategoryFactViewSet, AdvancedLoanCategoryFactViewSet,
    DepositsInvestmentsDimViewSet, CreditRiskDimViewSet,
    LoanMaturityDimViewSet, LoanCategoryDimViewSet
)

router = DefaultRouter()
router.register(r'firm-dim', FirmDimViewSet)
router.register(r'template-dim', TemplateDimViewSet)
router.register(r'status-dim', StatusDimViewSet)
router.register(r'state-dim', StateDimViewSet)
router.register(r'scheduled-fact', ScheduledFactViewSet)
router.register(r'income-expenditure-fact', IncomeExpenditureFactViewSet)
router.register(r'balance-sheet-fact', BalanceSheetFactViewSet)
router.register(r'deposits-investments-fact', DepositsInvestmentsFactViewSet)
router.register(r'credit-risk-fact', CreditRiskFactViewSet)
router.register(r'deposits-investments-dim', DepositsInvestmentsDimViewSet)
router.register(r'credit-risk-dim', CreditRiskDimViewSet)
router.register(r'outstanding-loan-maturity-fact', OutstandingLoanMaturityFactViewSet)
router.register(r'advanced-loan-maturity-fact', AdvancedLoanMaturityFactViewSet)
router.register(r'outstanding-loan-category-fact', OutstandingLoanCategoryFactViewSet)
router.register(r'advanced-loan-category-fact', AdvancedLoanCategoryFactViewSet)
router.register(r'loan-maturity-dim', LoanMaturityDimViewSet)
router.register(r'loan-category-dim', LoanCategoryDimViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
