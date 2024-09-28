from rest_framework import serializers

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