from rest_framework import serializers
from .models import CapitalKeyMeasure, LiquidityKeyMeasure, InvestmentKeyMeasure, CreditKeyMeasure

class CapitalKeyMeasureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CapitalKeyMeasure
        fields = '__all__' 
        
class LiquidityKeyMeasureSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiquidityKeyMeasure
        fields = '__all__'

class InvestmentKeyMeasureSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvestmentKeyMeasure
        fields = '__all__'

class CreditKeyMeasureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditKeyMeasure
        fields = '__all__'