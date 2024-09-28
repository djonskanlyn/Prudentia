from django.db.models.signals import post_save
from django.dispatch import receiver
from data.models import (
    BalanceSheetFact, 
    IncomeExpenditureFact, 
    DepositsInvestmentsFact, 
    CreditRiskFact, 
    OutstandingLoanCategoryFact, 
    AdvancedLoanCategoryFact, 
    OutstandingLoanMaturityFact, 
    AdvancedLoanMaturityFact
)
from .models import (
    CapitalKeyMeasure, 
    LiquidityKeyMeasure, 
    InvestmentKeyMeasure, 
    CreditKeyMeasure
)

# Update Capital, Liquidity, Investment, and Credit Key Measures based on BalanceSheetFact
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
    # Retrieve the related DepositsInvestmentsFact records once
    investments_facts = DepositsInvestmentsFact.objects.filter(returnId=instance.returnId)
    liquidity_key_measure.calculate_liquidity_ratio(instance, investments_facts)
    liquidity_key_measure.calculate_short_term_liquidity_ratio(instance, investments_facts)
    liquidity_key_measure.save()

    # Update InvestmentKeyMeasure
    investment_key_measure, _ = InvestmentKeyMeasure.objects.get_or_create(returnId=instance.returnId)
    investment_key_measure.calculate_total_investments(instance)
    investment_key_measure.calculate_investments_to_assets_ratio(instance)
    investment_key_measure.save()

    # Update CreditKeyMeasure
    credit_key_measure, _ = CreditKeyMeasure.objects.get_or_create(returnId=instance.returnId)
    credit_key_measure.calculate_total_loans(instance)
    credit_key_measure.calculate_total_provisions(instance)
    credit_key_measure.calculate_loan_to_assets_ratio(instance)
    credit_key_measure.save()

# Update CapitalKeyMeasure and InvestmentKeyMeasure based on IncomeExpenditureFact
@receiver(post_save, sender=IncomeExpenditureFact)
def update_capital_and_investment_key_measures_from_income_expenditure(sender, instance, **kwargs):
    # Update CapitalKeyMeasure
    capital_key_measure, _ = CapitalKeyMeasure.objects.get_or_create(returnId=instance.returnId)
    capital_key_measure.calculate_cost_to_income_ratio(instance)
    capital_key_measure.save()

    # Update InvestmentKeyMeasure (Return on Investments Ratio)
    investment_key_measure, _ = InvestmentKeyMeasure.objects.get_or_create(returnId=instance.returnId)
    # Retrieve BalanceSheetFact for returnId
    balance_sheet_fact = BalanceSheetFact.objects.filter(returnId=instance.returnId).first()
    if balance_sheet_fact:
        investment_key_measure.calculate_return_on_investments_ratio(balance_sheet_fact, instance)
        investment_key_measure.save()

# Update LiquidityKeyMeasure and InvestmentKeyMeasure based on DepositsInvestmentsFact
@receiver(post_save, sender=DepositsInvestmentsFact)
def update_liquidity_and_investment_key_measures_from_investments(sender, instance, **kwargs):
    # Update LiquidityKeyMeasure
    liquidity_key_measure, _ = LiquidityKeyMeasure.objects.get_or_create(returnId=instance.returnId)
    balance_sheet_fact = BalanceSheetFact.objects.filter(returnId=instance.returnId).first()

    if balance_sheet_fact:
        # Reuse the investments_facts query
        investments_facts = DepositsInvestmentsFact.objects.filter(returnId=instance.returnId)
        liquidity_key_measure.calculate_liquidity_ratio(balance_sheet_fact, investments_facts)
        liquidity_key_measure.calculate_short_term_liquidity_ratio(balance_sheet_fact, investments_facts)
        liquidity_key_measure.save()

    # Update InvestmentKeyMeasure
    investment_key_measure, _ = InvestmentKeyMeasure.objects.get_or_create(returnId=instance.returnId)
    if balance_sheet_fact:
        # Use the same investments_facts queryset to calculate all investment-related ratios
        investment_key_measure.calculate_aaci_investments_ratio(balance_sheet_fact, investments_facts)
        investment_key_measure.calculate_ieeass_investments_ratio(balance_sheet_fact, investments_facts)
        investment_key_measure.calculate_cbd_investments_ratio(balance_sheet_fact, investments_facts)
        investment_key_measure.calculate_bb_investments_ratio(balance_sheet_fact, investments_facts)
        investment_key_measure.calculate_oi_investments_ratio(balance_sheet_fact, investments_facts)
        investment_key_measure.calculate_investments_over_5_yrs_ratio(balance_sheet_fact, investments_facts)
        investment_key_measure.calculate_investments_over_7_yrs_ratio(balance_sheet_fact, investments_facts)
        investment_key_measure.calculate_investments_over_10_yrs_ratio(balance_sheet_fact, investments_facts)
        investment_key_measure.save()

# Update CreditKeyMeasure based on CreditRiskFact and include arrears calculations
@receiver(post_save, sender=CreditRiskFact)
def update_credit_key_measures_from_credit_risk(sender, instance, **kwargs):
    # Update CreditKeyMeasure with arrears calculations
    credit_key_measure, _ = CreditKeyMeasure.objects.get_or_create(returnId=instance.returnId)
    arrears_facts = CreditRiskFact.objects.filter(returnId=instance.returnId)
    credit_key_measure.calculate_arrears_over_9_weeks(arrears_facts)
    
    # Calculate arrears over 9 weeks ratio
    balance_sheet_fact = BalanceSheetFact.objects.filter(returnId=instance.returnId).first()
    if balance_sheet_fact:
        credit_key_measure.calculate_arrears_over_9_weeks_ratio(arrears_facts, balance_sheet_fact)
    
    credit_key_measure.save()

# Update CreditKeyMeasure with loan category ratios based on OutstandingLoanCategoryFact
@receiver(post_save, sender=OutstandingLoanCategoryFact)
def update_credit_key_measures_from_outstanding_loans(sender, instance, **kwargs):
    # Update CreditKeyMeasure with category ratios
    credit_key_measure, _ = CreditKeyMeasure.objects.get_or_create(returnId=instance.returnId)
    balance_sheet_fact = BalanceSheetFact.objects.filter(returnId=instance.returnId).first()

    if balance_sheet_fact:
        outstanding_loans_facts = OutstandingLoanCategoryFact.objects.filter(returnId=instance.returnId)
        credit_key_measure.calculate_personal_loans_ratio(balance_sheet_fact, outstanding_loans_facts)
        credit_key_measure.calculate_house_loans_ratio(balance_sheet_fact, outstanding_loans_facts)
        credit_key_measure.calculate_commercial_loans_ratio(balance_sheet_fact, outstanding_loans_facts)
        credit_key_measure.calculate_community_loans_ratio(balance_sheet_fact, outstanding_loans_facts)
        credit_key_measure.calculate_other_loans_ratio(balance_sheet_fact, outstanding_loans_facts)
        credit_key_measure.save()

# Update CreditKeyMeasure with advanced loan category ratios based on AdvancedLoanCategoryFact
@receiver(post_save, sender=AdvancedLoanCategoryFact)
def update_credit_key_measures_from_advanced_loans(sender, instance, **kwargs):
    # Update CreditKeyMeasure with advanced loans category ratios
    credit_key_measure, _ = CreditKeyMeasure.objects.get_or_create(returnId=instance.returnId)
    advanced_loans_facts = AdvancedLoanCategoryFact.objects.filter(returnId=instance.returnId)

    credit_key_measure.calculate_advanced_personal_loans_ratio(advanced_loans_facts)
    credit_key_measure.calculate_advanced_house_loans_ratio(advanced_loans_facts)
    credit_key_measure.calculate_advanced_commercial_loans_ratio(advanced_loans_facts)
    credit_key_measure.calculate_advanced_community_loans_ratio(advanced_loans_facts)
    credit_key_measure.calculate_advanced_other_loans_ratio(advanced_loans_facts)
    credit_key_measure.save()

# Update CreditKeyMeasure with loan maturity ratios based on OutstandingLoanMaturityFact
@receiver(post_save, sender=OutstandingLoanMaturityFact)
def update_credit_key_measures_from_outstanding_maturity(sender, instance, **kwargs):
    # Update CreditKeyMeasure with maturity ratios for outstanding loans
    credit_key_measure, _ = CreditKeyMeasure.objects.get_or_create(returnId=instance.returnId)
    balance_sheet_fact = BalanceSheetFact.objects.filter(returnId=instance.returnId).first()

    if balance_sheet_fact:
        outstanding_maturity_facts = OutstandingLoanMaturityFact.objects.filter(returnId=instance.returnId)
        credit_key_measure.calculate_loans_over_5_years_ratio(balance_sheet_fact, outstanding_maturity_facts)
        credit_key_measure.calculate_loans_over_10_years_ratio(balance_sheet_fact, outstanding_maturity_facts)
        credit_key_measure.save()

# Update CreditKeyMeasure with loan maturity ratios based on AdvancedLoanMaturityFact
@receiver(post_save, sender=AdvancedLoanMaturityFact)
def update_credit_key_measures_from_advanced_maturity(sender, instance, **kwargs):
    # Update CreditKeyMeasure with maturity ratios for advanced loans
    credit_key_measure, _ = CreditKeyMeasure.objects.get_or_create(returnId=instance.returnId)
    advanced_maturity_facts = AdvancedLoanMaturityFact.objects.filter(returnId=instance.returnId)

    credit_key_measure.calculate_advanced_loans_over_5_years_ratio(advanced_maturity_facts)
    credit_key_measure.calculate_advanced_loans_over_10_years_ratio(advanced_maturity_facts)
    credit_key_measure.save()




