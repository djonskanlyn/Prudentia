from rest_framework import viewsets
from .models import CapitalKeyMeasure, LiquidityKeyMeasure, InvestmentKeyMeasure, CreditKeyMeasure, AverageKeyMeasure
from .serializers import (
    CapitalKeyMeasureSerializer,
    LiquidityKeyMeasureSerializer,
    InvestmentKeyMeasureSerializer,
    CreditKeyMeasureSerializer,
    AverageKeyMeasureSerializer
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

class AverageKeyMeasureViewSet(viewsets.ModelViewSet):
    queryset = AverageKeyMeasure.objects.all()
    serializer_class = AverageKeyMeasureSerializer