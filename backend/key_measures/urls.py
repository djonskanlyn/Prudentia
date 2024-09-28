from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    CapitalKeyMeasureViewSet,
    LiquidityKeyMeasureViewSet,
    InvestmentKeyMeasureViewSet,
    CreditKeyMeasureViewSet
)

router = DefaultRouter()
router.register(r'capital-key-measures', CapitalKeyMeasureViewSet)
router.register(r'liquidity-key-measures', LiquidityKeyMeasureViewSet)
router.register(r'investment-key-measures', InvestmentKeyMeasureViewSet)
router.register(r'credit-key-measures', CreditKeyMeasureViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
