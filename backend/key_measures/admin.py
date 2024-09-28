from django.contrib import admin
from .models import CapitalKeyMeasure, LiquidityKeyMeasure, InvestmentKeyMeasure, CreditKeyMeasure

@admin.register(CapitalKeyMeasure)
class CapitalKeyMeasureAdmin(admin.ModelAdmin):
    list_display = ('returnId', 'totalAssets', 'surplusOrDeficit', 'regulatoryReserve', 
                    'totalRealisedReserves', 'totalMemberSavings', 'regulatoryReserveRatio', 
                    'totalRealisedReservesRatio', 'tangibleFixedAssetsTaRatio', 'tangibleFixedAssetsTrrRatio',
                    'returnOnAssetsRatio', 'costToIncomeRatio')

@admin.register(LiquidityKeyMeasure)
class LiquidityKeyMeasureAdmin(admin.ModelAdmin):
    list_display = ('returnId', 'liquidityRatio', 'shortTermLiquidityRatio')

@admin.register(InvestmentKeyMeasure)
class InvestmentKeyMeasureAdmin(admin.ModelAdmin):
    list_display = ('returnId', 'totalInvestments', 'investmentsToAssetsRatio',
                    'aaciToInvestmentsRatio', 'ieeassToInvestmentsRatio', 'centralBankDepositsToInvestmentsRatio', 
                    'bankBondsToInvestmentsRatio', 'otherInvestmentsToInvestmentsRatio', 'investmentsOver5YearsRatio', 
                    'investmentsOver7YearsRatio', 'investmentsOver10YearsRatio', 'returnOnInvestmentsRatio')

@admin.register(CreditKeyMeasure)
class CreditKeyMeasureAdmin(admin.ModelAdmin):
    list_display = ('returnId', 'totalLoans', 'totalProvisions', 'arrearsOver9Weeks', 'loanToAssetsRatio',
                    'arrearsOver9WeeksRatio', 'personalLoansRatio', 'houseLoansRatio', 'commercialLoansRatio', 
                    'communityLoansRatio', 'otherLoansRatio', 'advancedPersonalLoansRatio', 
                    'advancedHouseLoansRatio', 'advancedCommercialLoansRatio', 'advancedCommunityLoansRatio', 
                    'advancedOtherLoansRatio', 'loansOver5YearsRatio', 'loansOver10YearsRatio', 
                    'advancedLoansOver5YearsRatio', 'advancedLoansOver10YearsRatio')

