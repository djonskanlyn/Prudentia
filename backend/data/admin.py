from django.contrib import admin
from .models import (
    FirmDim, TemplateDim, StatusDim, StateDim, DepositsInvestmentsDim, 
    CreditRiskDim, LoanMaturityDim, LoanCategoryDim, ScheduledFact, 
    IncomeExpenditureFact, BalanceSheetFact, DepositsInvestmentsFact, 
    CreditRiskFact, OutstandingLoanMaturityFact, AdvancedLoanMaturityFact, 
    OutstandingLoanCategoryFact, AdvancedLoanCategoryFact
)

admin.site.register(FirmDim)
admin.site.register(TemplateDim)
admin.site.register(StatusDim)
admin.site.register(StateDim)
admin.site.register(DepositsInvestmentsDim)
admin.site.register(CreditRiskDim)
admin.site.register(LoanMaturityDim)
admin.site.register(LoanCategoryDim)
admin.site.register(ScheduledFact)
admin.site.register(IncomeExpenditureFact)
admin.site.register(BalanceSheetFact)
admin.site.register(DepositsInvestmentsFact)
admin.site.register(CreditRiskFact)
admin.site.register(OutstandingLoanMaturityFact)
admin.site.register(AdvancedLoanMaturityFact)
admin.site.register(OutstandingLoanCategoryFact)
admin.site.register(AdvancedLoanCategoryFact)

