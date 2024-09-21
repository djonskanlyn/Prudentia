from rest_framework import serializers
from .models import (
    FirmDim, TemplateDim, StatusDim, StateDim, ScheduledFact,
    IncomeExpenditureFact, BalanceSheetFact, DepositsInvestmentsFact,
    CreditRiskFact, OutstandingLoanMaturityFact, AdvancedLoanMaturityFact,
    OutstandingLoanCategoryFact, AdvancedLoanCategoryFact,
    DepositsInvestmentsDim, CreditRiskDim, LoanMaturityDim, LoanCategoryDim
)

class FirmDimSerializer(serializers.ModelSerializer):
    class Meta:
        model = FirmDim
        fields = '__all__'

class TemplateDimSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemplateDim
        fields = '__all__'

class StatusDimSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusDim
        fields = '__all__'

class StateDimSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateDim
        fields = '__all__'

class DepositsInvestmentsDimSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepositsInvestmentsDim
        fields = '__all__'

class CreditRiskDimSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditRiskDim
        fields = '__all__'

class LoanMaturityDimSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanMaturityDim
        fields = '__all__'

class LoanCategoryDimSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanCategoryDim
        fields = '__all__'

class ScheduledFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduledFact
        fields = '__all__'

class IncomeExpenditureFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncomeExpenditureFact
        fields = '__all__'

class BalanceSheetFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = BalanceSheetFact
        fields = '__all__'

class DepositsInvestmentsFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepositsInvestmentsFact
        fields = '__all__'

class CreditRiskFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditRiskFact
        fields = '__all__'

class OutstandingLoanMaturityFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutstandingLoanMaturityFact
        fields = '__all__'

class AdvancedLoanMaturityFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdvancedLoanMaturityFact
        fields = '__all__'

class OutstandingLoanCategoryFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutstandingLoanCategoryFact
        fields = '__all__'

class AdvancedLoanCategoryFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdvancedLoanCategoryFact
        fields = '__all__'

# custom views

class ReturnsListSerializer(serializers.ModelSerializer):
    firmName = serializers.CharField(source='firm.name', read_only=True)
    templateName = serializers.CharField(source='template.name', read_only=True)
    statusName = serializers.CharField(source='status.name', read_only=True)
    stateName = serializers.CharField(source='state.name', read_only=True)

    class Meta:
        model = ScheduledFact
        fields = [
            'id', 'firm', 'firmName', 'templateName', 'reportingDate', 'quarterRef', 'dueDate', 'stateName', 'statusName', 'versionRef', 'firstSubmittedDatetime', 'lastSubmittedDatetime', 
        ]
