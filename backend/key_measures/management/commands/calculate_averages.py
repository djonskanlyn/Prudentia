from django.core.management.base import BaseCommand
from key_measures.models import CapitalKeyMeasure, LiquidityKeyMeasure, InvestmentKeyMeasure, CreditKeyMeasure, AverageKeyMeasure
from data.models import ScheduledFact
from django.db.models import Avg, DecimalField

class Command(BaseCommand):
    help = "Calculate and store average key measures for each quarter (only for returnIds where stateId=1)."

    def handle(self, *args, **kwargs):
        # Filter ScheduledFact by stateId=1
        scheduled_facts = ScheduledFact.objects.filter(state_id=1)

        # Loop through each type of key measure (capital, liquidity, etc.)
        all_key_measures = [
            (CapitalKeyMeasure.objects.filter(returnId__in=scheduled_facts), 'capital'),
            (LiquidityKeyMeasure.objects.filter(returnId__in=scheduled_facts), 'liquidity'),
            (InvestmentKeyMeasure.objects.filter(returnId__in=scheduled_facts), 'investment'),
            (CreditKeyMeasure.objects.filter(returnId__in=scheduled_facts), 'credit')
        ]

        # Loop through each type of key measure
        for queryset, source in all_key_measures:
            # Group the queryset by `quarter_ref` and calculate averages for each group
            for quarter_ref in queryset.values_list('returnId__quarterRef', flat=True).distinct():
                # Filter the queryset by the current `quarter_ref`
                group_queryset = queryset.filter(returnId__quarterRef=quarter_ref)

                # Loop through each DecimalField in the model
                for field in queryset.model._meta.get_fields():
                    if isinstance(field, DecimalField):
                        field_name = field.name
                        field_verbose_name = field.verbose_name

                        # Calculate the average value for this field in the current quarter_ref group
                        avg_value = group_queryset.aggregate(Avg(field_name))[f'{field_name}__avg']

                        if avg_value is not None:
                            # Use update_or_create to avoid duplicates
                            AverageKeyMeasure.objects.update_or_create(
                                quarter_ref=quarter_ref,
                                source=source,
                                measure_id=field_name,
                                defaults={
                                    'measure': field_verbose_name,
                                    'average_value': avg_value
                                }
                            )

        self.stdout.write(self.style.SUCCESS('Successfully calculated and stored key measure averages grouped by quarter_ref (stateId=1).'))




