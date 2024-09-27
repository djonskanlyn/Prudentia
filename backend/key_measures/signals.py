from django.db.models.signals import post_save
from django.dispatch import receiver
from data.models import BalanceSheetFact, IncomeExpenditureFact, ScheduledFact, DepositsInvestmentsFact
from .models import CapitalKeyMeasure, LiquidityKeyMeasure

@receiver(post_save, sender=BalanceSheetFact)
def update_key_measures_from_balance_sheet(sender, instance, **kwargs):
    # Update CapitalKeyMeasure
    capital_key_measure, _ = CapitalKeyMeasure.objects.get_or_create(returnId=instance.returnId)
    capital_key_measure.calculate_total_assets(instance)
    capital_key_measure.calculate_surplus_or_deficit(instance)
    capital_key_measure.calculate_regulatory_reserve(instance)
    capital_key_measure.calculate_total_realised_reserves(instance)
    capital_key_measure.calculate_total_member_savings(instance)
    capital_key_measure.calculate_regulatory_reserve_ratio(instance)
    capital_key_measure.calculate_total_realised_reserves_ratio(instance)
    capital_key_measure.calculate_tangible_fixed_assets_ta_ratio(instance)
    capital_key_measure.calculate_tangible_fixed_assets_trr_ratio(instance)
    capital_key_measure.calculate_return_on_assets_ratio(instance)
    capital_key_measure.save()

    # Update LiquidityKeyMeasure
    liquidity_key_measure, _ = LiquidityKeyMeasure.objects.get_or_create(returnId=instance.returnId)
    investments_facts = DepositsInvestmentsFact.objects.filter(returnId=instance.returnId)
    liquidity_key_measure.calculate_liquidity_ratio(instance, investments_facts)
    liquidity_key_measure.calculate_short_term_liquidity_ratio(instance, investments_facts)
    liquidity_key_measure.save()

@receiver(post_save, sender=IncomeExpenditureFact)
def update_capital_key_measures_from_income_expenditure(sender, instance, **kwargs):
    key_measure, _ = CapitalKeyMeasure.objects.get_or_create(returnId=instance.returnId)
    key_measure.calculate_cost_to_income_ratio(instance)
    key_measure.save()

@receiver(post_save, sender=DepositsInvestmentsFact)
def update_liquidity_key_measures_from_investments(sender, instance, **kwargs):
    liquidity_key_measure, _ = LiquidityKeyMeasure.objects.get_or_create(returnId=instance.returnId)
    balance_sheet_fact = BalanceSheetFact.objects.filter(returnId=instance.returnId).first()

    if balance_sheet_fact:
        investments_facts = DepositsInvestmentsFact.objects.filter(returnId=instance.returnId)
        liquidity_key_measure.calculate_liquidity_ratio(balance_sheet_fact, investments_facts)
        liquidity_key_measure.calculate_short_term_liquidity_ratio(balance_sheet_fact, investments_facts)
        liquidity_key_measure.save()
