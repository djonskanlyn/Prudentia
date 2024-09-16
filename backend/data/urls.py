from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FirmDimViewSet, TemplateDimViewSet, StatusDimViewSet, StateDimViewSet,
    ScheduledFactViewSet, IncomeExpenditureFactViewSet, BalanceSheetFactViewSet,
    DepositsInvestmentsFactViewSet, CreditRiskFactViewSet,
    OutstandingLoanMaturityFactViewSet, AdvancedLoanMaturityFactViewSet,
    OutstandingLoanCategoryFactViewSet, AdvancedLoanCategoryFactViewSet
)

router = DefaultRouter()
router.register(r'firms', FirmDimViewSet)
router.register(r'templates', TemplateDimViewSet)
router.register(r'statuses', StatusDimViewSet)
router.register(r'states', StateDimViewSet)
router.register(r'scheduled-facts', ScheduledFactViewSet)
router.register(r'income-expenditure', IncomeExpenditureFactViewSet)
router.register(r'balance-sheets', BalanceSheetFactViewSet)
router.register(r'deposits-investments', DepositsInvestmentsFactViewSet)
router.register(r'credit-risks', CreditRiskFactViewSet)
router.register(r'outstanding-loan-maturities', OutstandingLoanMaturityFactViewSet)
router.register(r'advanced-loan-maturities', AdvancedLoanMaturityFactViewSet)
router.register(r'outstanding-loan-categories', OutstandingLoanCategoryFactViewSet)
router.register(r'advanced-loan-categories', AdvancedLoanCategoryFactViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
