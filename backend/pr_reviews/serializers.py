from rest_framework import serializers
from .models import PRReviewTable, PRReviewMeasure

class PivotedKeyMeasureSerializer(serializers.Serializer):
    returnId = serializers.IntegerField()
    source = serializers.CharField()  # The source key measure table
    measureId = serializers.CharField()  # The field name as measureId
    measure = serializers.CharField()  # The human-readable verbose name
    value = serializers.DecimalField(max_digits=15, decimal_places=2)  # The value of the measure

class ReturnPreviousSerializer(serializers.Serializer):
    base_return_id = serializers.IntegerField()
    firm_id = serializers.IntegerField()
    quarter_ref = serializers.CharField()
    sub_rank = serializers.IntegerField()
    sub_quarterRef = serializers.CharField()
    sub_returnId = serializers.IntegerField(allow_null=True)

class ReturnWithMeasuresSerializer(serializers.Serializer):
    base_return_id = serializers.IntegerField()
    sub_quarterRef = serializers.CharField()
    sub_reportingPeriod = serializers.CharField()  # Will be in the format YYYY-MM
    sub_returnId = serializers.IntegerField(allow_null=True)
    source = serializers.CharField(allow_null=True)
    measure = serializers.CharField(allow_null=True)
    value = serializers.DecimalField(max_digits=15, decimal_places=2, allow_null=True)

class ReturnWithPivotedMeasuresSerializer(serializers.Serializer):
    base_return_id = serializers.IntegerField()
    source = serializers.CharField()  # The source key measure table (e.g., "capital", "liquidity")
    measure = serializers.CharField()  # The human-readable verbose name of the measure
    current_Q0 = serializers.DecimalField(max_digits=15, decimal_places=2)  # Current quarter measure value
    prior_Q1 = serializers.DecimalField(max_digits=15, decimal_places=2, allow_null=True)  # Prior quarter measure value
    prior_Q2 = serializers.DecimalField(max_digits=15, decimal_places=2, allow_null=True)  # Second prior quarter value
    prior_Q3 = serializers.DecimalField(max_digits=15, decimal_places=2, allow_null=True)  # Third prior quarter value
    prior_Q4 = serializers.DecimalField(max_digits=15, decimal_places=2, allow_null=True)  # Fourth prior quarter value
    perc_diff_pq = serializers.DecimalField(max_digits=15, decimal_places=2, allow_null=True)  # Percentage diff with prior Q
    perc_diff_py = serializers.DecimalField(max_digits=15, decimal_places=2, allow_null=True)  # Percentage diff with prior year (4 quarters ago)

class ReturnWithPivotedMeasuresWithAverageSerializer(serializers.Serializer):
    base_return_id = serializers.IntegerField()
    source = serializers.CharField()  # The source key measure table (e.g., "capital", "liquidity")
    measure = serializers.CharField()  # The human-readable verbose name of the measure
    current_Q0 = serializers.DecimalField(max_digits=15, decimal_places=2)  # Current quarter measure value
    prior_Q1 = serializers.DecimalField(max_digits=15, decimal_places=2, allow_null=True)  # Prior quarter measure value
    prior_Q2 = serializers.DecimalField(max_digits=15, decimal_places=2, allow_null=True)  # Second prior quarter value
    prior_Q3 = serializers.DecimalField(max_digits=15, decimal_places=2, allow_null=True)  # Third prior quarter value
    prior_Q4 = serializers.DecimalField(max_digits=15, decimal_places=2, allow_null=True)  # Fourth prior quarter value
    perc_diff_pq = serializers.DecimalField(max_digits=15, decimal_places=2, allow_null=True)  # Percentage diff with prior Q
    perc_diff_py = serializers.DecimalField(max_digits=15, decimal_places=2, allow_null=True)  # Percentage diff with prior year (4 quarters ago)
    average = serializers.DecimalField(max_digits=15, decimal_places=2, allow_null=True)  # New field for average measure value


class PRReviewWithDetailsSerializer(serializers.ModelSerializer):
    returnId = serializers.IntegerField(source='returnId.id')
    firm = serializers.CharField(source='returnId.firm.name')
    reportingDate = serializers.DateField(source='returnId.reportingDate')
    returnState = serializers.CharField(source='returnId.state.name')
    returnVersion = serializers.IntegerField(source='returnId.versionRef')

    class Meta:
        model = PRReviewTable
        fields = ['id', 'returnId', 'firm', 'reportingDate', 'returnState', 'returnVersion', 'created_at', 'updated_at','supervisor_so_by','supervisor_so_at','senior_supervisor_so_by','senior_supervisor_so_at']

class PRReviewTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = PRReviewTable
        fields = ['id', 'returnId', 'created_at', 'updated_at', 'capital_comment', 'liquidity_comment', 'investments_comment', 'credit_comment', 'final_comment']
        read_only_fields = ['created_at', 'updated_at']

    def validate_returnId(self, value):
        if not value:
            raise serializers.ValidationError("ReturnId is required.")
        return value

class PRReviewMeasureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PRReviewMeasure
        fields = '__all__'

class MeasureCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PRReviewMeasure
        fields = ['id', 'comments'] 

class DashboardDataSerializer(serializers.Serializer):
    reportingDate = serializers.DateField()
    total_returns = serializers.IntegerField()
    submitted_returns = serializers.IntegerField()
    supervisor_signoffs = serializers.IntegerField()
    senior_supervisor_signoffs = serializers.IntegerField()