from django.core.management.base import BaseCommand
from data.models import (
    ScheduledFact, 
    BalanceSheetFact, 
    IncomeExpenditureFact, 
    DepositsInvestmentsFact, 
    CreditRiskFact, 
    OutstandingLoanCategoryFact, 
    AdvancedLoanCategoryFact, 
    OutstandingLoanMaturityFact, 
    AdvancedLoanMaturityFact
)
from key_measures.models import (
    CapitalKeyMeasure, 
    LiquidityKeyMeasure, 
    InvestmentKeyMeasure, 
    CreditKeyMeasure
)

class Command(BaseCommand):
    help = 'Generate Key Measure entries for existing data'

    def handle(self, *args, **kwargs):
        # Loop over each ScheduledFact
        for scheduled_fact in ScheduledFact.objects.all():

            # === CapitalKeyMeasure calculations ===
            capital_key_measure, _ = CapitalKeyMeasure.objects.get_or_create(returnId=scheduled_fact)
            balance_sheet_fact = BalanceSheetFact.objects.filter(returnId=scheduled_fact).first()
            income_expenditure_fact = IncomeExpenditureFact.objects.filter(returnId=scheduled_fact).first()

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

            if income_expenditure_fact:
                capital_key_measure.calculate_cost_to_income_ratio(income_expenditure_fact)
            
            capital_key_measure.save()


            # === LiquidityKeyMeasure calculations ===
            liquidity_key_measure, _ = LiquidityKeyMeasure.objects.get_or_create(returnId=scheduled_fact)
            investments_facts = DepositsInvestmentsFact.objects.filter(returnId=scheduled_fact)

            if balance_sheet_fact and investments_facts.exists():
                liquidity_key_measure.calculate_liquidity_ratio(balance_sheet_fact, investments_facts)
                liquidity_key_measure.calculate_short_term_liquidity_ratio(balance_sheet_fact, investments_facts)

            liquidity_key_measure.save()


            # === InvestmentKeyMeasure calculations ===
            investment_key_measure, _ = InvestmentKeyMeasure.objects.get_or_create(returnId=scheduled_fact)

            if balance_sheet_fact:
                investment_key_measure.calculate_total_investments(balance_sheet_fact)
                investment_key_measure.calculate_investments_to_assets_ratio(balance_sheet_fact)

            if income_expenditure_fact:
                investment_key_measure.calculate_return_on_investments_ratio(balance_sheet_fact, income_expenditure_fact)

            if balance_sheet_fact and investments_facts.exists():
                investment_key_measure.calculate_aaci_investments_ratio(balance_sheet_fact, investments_facts)
                investment_key_measure.calculate_ieeass_investments_ratio(balance_sheet_fact, investments_facts)
                investment_key_measure.calculate_cbd_investments_ratio(balance_sheet_fact, investments_facts)
                investment_key_measure.calculate_bb_investments_ratio(balance_sheet_fact, investments_facts)
                investment_key_measure.calculate_oi_investments_ratio(balance_sheet_fact, investments_facts)
                investment_key_measure.calculate_investments_over_5_yrs_ratio(balance_sheet_fact, investments_facts)
                investment_key_measure.calculate_investments_over_7_yrs_ratio(balance_sheet_fact, investments_facts)
                investment_key_measure.calculate_investments_over_10_yrs_ratio(balance_sheet_fact, investments_facts)

            investment_key_measure.save()


            # === CreditKeyMeasure calculations ===
            credit_key_measure, _ = CreditKeyMeasure.objects.get_or_create(returnId=scheduled_fact)
            credit_risk_facts = CreditRiskFact.objects.filter(returnId=scheduled_fact)
            outstanding_loan_category_facts = OutstandingLoanCategoryFact.objects.filter(returnId=scheduled_fact)
            advanced_loan_category_facts = AdvancedLoanCategoryFact.objects.filter(returnId=scheduled_fact)
            outstanding_loan_maturity_facts = OutstandingLoanMaturityFact.objects.filter(returnId=scheduled_fact)
            advanced_loan_maturity_facts = AdvancedLoanMaturityFact.objects.filter(returnId=scheduled_fact)

            if balance_sheet_fact:
                credit_key_measure.calculate_total_loans(balance_sheet_fact)
                credit_key_measure.calculate_total_provisions(balance_sheet_fact)
                credit_key_measure.calculate_loan_to_assets_ratio(balance_sheet_fact)

            if credit_risk_facts.exists():
                credit_key_measure.calculate_arrears_over_9_weeks(credit_risk_facts)

                # Calculate arrears ratio if BalanceSheetFact exists
                if balance_sheet_fact:
                    credit_key_measure.calculate_arrears_over_9_weeks_ratio(credit_risk_facts, balance_sheet_fact)

            if outstanding_loan_category_facts.exists():
                credit_key_measure.calculate_personal_loans_ratio(balance_sheet_fact, outstanding_loan_category_facts)
                credit_key_measure.calculate_house_loans_ratio(balance_sheet_fact, outstanding_loan_category_facts)
                credit_key_measure.calculate_commercial_loans_ratio(balance_sheet_fact, outstanding_loan_category_facts)
                credit_key_measure.calculate_community_loans_ratio(balance_sheet_fact, outstanding_loan_category_facts)
                credit_key_measure.calculate_other_loans_ratio(balance_sheet_fact, outstanding_loan_category_facts)

            if advanced_loan_category_facts.exists():
                credit_key_measure.calculate_advanced_personal_loans_ratio(advanced_loan_category_facts)
                credit_key_measure.calculate_advanced_house_loans_ratio(advanced_loan_category_facts)
                credit_key_measure.calculate_advanced_commercial_loans_ratio(advanced_loan_category_facts)
                credit_key_measure.calculate_advanced_community_loans_ratio(advanced_loan_category_facts)
                credit_key_measure.calculate_advanced_other_loans_ratio(advanced_loan_category_facts)

            if outstanding_loan_maturity_facts.exists():
                credit_key_measure.calculate_loans_over_5_years_ratio(balance_sheet_fact, outstanding_loan_maturity_facts)
                credit_key_measure.calculate_loans_over_10_years_ratio(balance_sheet_fact, outstanding_loan_maturity_facts)

            if advanced_loan_maturity_facts.exists():
                credit_key_measure.calculate_advanced_loans_over_5_years_ratio(advanced_loan_maturity_facts)
                credit_key_measure.calculate_advanced_loans_over_10_years_ratio(advanced_loan_maturity_facts)

            credit_key_measure.save()

        self.stdout.write(self.style.SUCCESS('Successfully generated key measures for all existing data'))



