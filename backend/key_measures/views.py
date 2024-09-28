from rest_framework import viewsets
from .models import CapitalKeyMeasure, LiquidityKeyMeasure, InvestmentKeyMeasure, CreditKeyMeasure
from .serializers import (
    CapitalKeyMeasureSerializer,
    LiquidityKeyMeasureSerializer,
    InvestmentKeyMeasureSerializer,
    CreditKeyMeasureSerializer
)

class CapitalKeyMeasureViewSet(viewsets.ModelViewSet):
    queryset = CapitalKeyMeasure.objects.all()
    serializer_class = CapitalKeyMeasureSerializer

class LiquidityKeyMeasureViewSet(viewsets.ModelViewSet):
    queryset = LiquidityKeyMeasure.objects.all()
    serializer_class = LiquidityKeyMeasureSerializer

class InvestmentKeyMeasureViewSet(viewsets.ModelViewSet):
    queryset = InvestmentKeyMeasure.objects.all()
    serializer_class = InvestmentKeyMeasureSerializer

class CreditKeyMeasureViewSet(viewsets.ModelViewSet):
    queryset = CreditKeyMeasure.objects.all()
    serializer_class = CreditKeyMeasureSerializer

