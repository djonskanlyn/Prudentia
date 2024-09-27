from django.contrib import admin
from .models import CapitalKeyMeasure, LiquidityKeyMeasure

@admin.register(CapitalKeyMeasure)
class CapitalKeyMeasureAdmin(admin.ModelAdmin):
    list_display = ('returnId', 'totalAssets', 'surplusOrDeficit', 'regulatoryReserve', 
                    'totalRealisedReserves', 'totalMemberSavings', 'regulatoryReserveRatio', 
                    'totalRealisedReservesRatio', 'tangibleFixedAssetsTaRatio', 'tangibleFixedAssetsTrrRatio',
                    'returnOnAssetsRatio', 'costToIncomeRatio')

@admin.register(LiquidityKeyMeasure)
class LiquidityKeyMeasureAdmin(admin.ModelAdmin):
    list_display = ('returnId', 'liquidityRatio', 'shortTermLiquidityRatio')
