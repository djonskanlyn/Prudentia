from django.core.management.base import BaseCommand
from data.models import ScheduledFact, BalanceSheetFact, IncomeExpenditureFact, DepositsInvestmentsFact
from key_measures.models import CapitalKeyMeasure, LiquidityKeyMeasure, InvestmentKeyMeasure

class Command(BaseCommand):
    help = 'Generate CapitalKeyMeasure entries for existing data'

    def handle(self, *args, **kwargs):
        # Loop over each ScheduledFact
        for scheduled_fact in ScheduledFact.objects.all():

            # === CapitalKeyMeasure calculations ===
            capital_key_measure, created = CapitalKeyMeasure.objects.get_or_create(returnId=scheduled_fact)

            # Find the corresponding BalanceSheetFact and IncomeExpenditureFact
            balance_sheet_fact = BalanceSheetFact.objects.filter(returnId=scheduled_fact).first()
            income_expenditure_fact = IncomeExpenditureFact.objects.filter(returnId=scheduled_fact).first()

            # If BalanceSheetFact exists, update key measures based on balance sheet
            if balance_sheet_fact:
                capital_key_measure.calculate_total_assets(balance_sheet_fact)
                capital_key_measure.calculate_surplus_or_deficit(balance_sheet_fact)
                capital_key_measure.calculate_regulatory_reserve(balance_sheet_fact)
                capital_key_measure.calculate_total_realised_reserves(balance_sheet_fact)
                capital_key_measure.calculate_total_member_savings(balance_sheet_fact)
                capital_key_measure.calculate_regulatory_reserve_ratio(balance_sheet_fact)
                capital_key_measure.calculate_total_realised_reserves_ratio(balance_sheet_fact)
                capital_key_measure.calculate_tangible_fixed_assets_ta_ratio(balance_sheet_fact)
                capital_key_measure.calculate_tangible_fixed_assets_trr_ratio(balance_sheet_fact)
                capital_key_measure.calculate_return_on_assets_ratio(balance_sheet_fact)

            # If IncomeExpenditureFact exists, update the cost-to-income ratio
            if income_expenditure_fact:
                capital_key_measure.calculate_cost_to_income_ratio(income_expenditure_fact)

            # Save the capital key measures
            capital_key_measure.save()


             # === LiquidityKeyMeasure calculations ===
            liquidity_key_measure, created = LiquidityKeyMeasure.objects.get_or_create(returnId=scheduled_fact)

            # Get all DepositsInvestmentsFact records related to this ScheduledFact
            investments_facts = DepositsInvestmentsFact.objects.filter(returnId=scheduled_fact)

            # Calculate the liquidity ratio if both balance sheet and investment facts exist
            if balance_sheet_fact and investments_facts.exists():
                liquidity_key_measure.calculate_liquidity_ratio(balance_sheet_fact, investments_facts)
                liquidity_key_measure.calculate_short_term_liquidity_ratio(balance_sheet_fact, investments_facts)

            # Save the liquidity key measures
            liquidity_key_measure.save()
            

            # === InvestmentKeyMeasure calculations ===
            investment_key_measure, created = InvestmentKeyMeasure.objects.get_or_create(returnId=scheduled_fact)

            # If BalanceSheetFact exists, update the investment measures
            if balance_sheet_fact:
                investment_key_measure.calculate_total_investments(balance_sheet_fact)
                investment_key_measure.calculate_investments_to_assets_ratio(balance_sheet_fact)

            # If IncomeExpenditureFact exists, update the return on investments ratio
            if income_expenditure_fact:
                investment_key_measure.calculate_return_on_investments_ratio(balance_sheet_fact, income_expenditure_fact)

            # If InvestmentsFacts exist, update the related ratios
            if balance_sheet_fact and investments_facts.exists():
                investment_key_measure.calculate_aaci_investments_ratio(balance_sheet_fact, investments_facts)
                investment_key_measure.calculate_ieeass_investments_ratio(balance_sheet_fact, investments_facts)
                investment_key_measure.calculate_cbd_investments_ratio(balance_sheet_fact, investments_facts)
                investment_key_measure.calculate_bb_investments_ratio(balance_sheet_fact, investments_facts)
                investment_key_measure.calculate_oi_investments_ratio(balance_sheet_fact, investments_facts)
                investment_key_measure.calculate_investments_over_5_yrs_ratio(balance_sheet_fact, investments_facts)
                investment_key_measure.calculate_investments_over_7_yrs_ratio(balance_sheet_fact, investments_facts)
                investment_key_measure.calculate_investments_over_10_yrs_ratio(balance_sheet_fact, investments_facts)

            # Save the investment key measures
            investment_key_measure.save()
        
        self.stdout.write(self.style.SUCCESS('Successfully generated key measures for all existing data'))
