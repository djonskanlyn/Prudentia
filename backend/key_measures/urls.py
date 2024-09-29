from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    CapitalKeyMeasureViewSet,
    LiquidityKeyMeasureViewSet,
    InvestmentKeyMeasureViewSet,
    CreditKeyMeasureViewSet,
    AverageKeyMeasureViewSet
)

router = DefaultRouter()
router.register(r'capital-key-measures', CapitalKeyMeasureViewSet)
router.register(r'liquidity-key-measures', LiquidityKeyMeasureViewSet)
router.register(r'investment-key-measures', InvestmentKeyMeasureViewSet)
router.register(r'credit-key-measures', CreditKeyMeasureViewSet)
router.register(r'average-key-measures', AverageKeyMeasureViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
