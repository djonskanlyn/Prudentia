from django.db import models
from data.models import ScheduledFact


class CapitalKeyMeasure(models.Model):
    returnId = models.OneToOneField(ScheduledFact, on_delete=models.CASCADE, primary_key=True, verbose_name="Return Id")
    
    # Computed fields for key measures
    totalAssets = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Total Assets", null=True, blank=True)
    surplusOrDeficit = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Surplus Or Deficit", null=True, blank=True)
    regulatoryReserve = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Regulatory Reserve", null=True, blank=True)
    totalRealisedReserves = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Total Realised Reserves", null=True, blank=True)
    totalMemberSavings = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Total Member Savings", null=True, blank=True)
    regulatoryReserveRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Regulatory Reserve Ratio (TA)", null=True, blank=True)
    totalRealisedReservesRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Total Realised Reserves Ratio (TA)", null=True, blank=True)
    tangibleFixedAssetsTaRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Tangible Fixed Assets Ratio (TA)", null=True, blank=True)
    tangibleFixedAssetsTrrRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Tangible Fixed Assets Ratio (TRR)", null=True, blank=True)
    returnOnAssetsRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Return On Assets Ratio (TA)", null=True, blank=True)
    costToIncomeRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Cost To Income Ratio (TI)", null=True, blank=True)

    def calculate_total_assets(self, balance_sheet_fact):
        self.totalAssets = balance_sheet_fact.totalAssets

    def calculate_surplus_or_deficit(self, balance_sheet_fact):
        self.surplusOrDeficit = balance_sheet_fact.surplusOrDeficit

    def calculate_regulatory_reserve(self, balance_sheet_fact):
        self.regulatoryReserve = balance_sheet_fact.regulatoryReserve
    
    def calculate_total_realised_reserves(self, balance_sheet_fact):
        self.totalRealisedReserves = balance_sheet_fact.totalReserves - balance_sheet_fact.otherUnrealisedReserves
    
    def calculate_total_member_savings(self, balance_sheet_fact):
        self.totalMemberSavings = balance_sheet_fact.membersShares + balance_sheet_fact.membersBudgetAccounts

    def calculate_regulatory_reserve_ratio(self, balance_sheet_fact):
        if balance_sheet_fact.totalAssets > 0:
            self.regulatoryReserveRatio = (balance_sheet_fact.regulatoryReserve / balance_sheet_fact.totalAssets) * 100
        else:
            self.regulatoryReserveRatio = 0
    
    def calculate_total_realised_reserves_ratio(self, balance_sheet_fact):
        if balance_sheet_fact.totalAssets > 0:
            self.totalRealisedReservesRatio = ((balance_sheet_fact.totalReserves - balance_sheet_fact.otherUnrealisedReserves) / balance_sheet_fact.totalAssets) * 100
        else:
            self.totalRealisedReservesRatio = 0
    
    def calculate_tangible_fixed_assets_ta_ratio(self, balance_sheet_fact):
        if balance_sheet_fact.totalAssets > 0:
            self.tangibleFixedAssetsTaRatio = (balance_sheet_fact.tangibleFixedAssets / balance_sheet_fact.totalAssets) * 100
        else:
            self.tangibleFixedAssetsTaRatio = 0
    
    def calculate_tangible_fixed_assets_trr_ratio(self, balance_sheet_fact):
        realised_reserves = balance_sheet_fact.totalReserves - balance_sheet_fact.otherUnrealisedReserves
        if realised_reserves  > 0:
            self.tangibleFixedAssetsTrrRatio = (balance_sheet_fact.tangibleFixedAssets / realised_reserves) * 100
        else:
            self.tangibleFixedAssetsTrrRatio = 0

    def calculate_return_on_assets_ratio(self, balance_sheet_fact):
        if balance_sheet_fact.totalAssets> 0:
            self.returnOnAssetsRatio = (balance_sheet_fact.surplusOrDeficit / balance_sheet_fact.totalAssets) * 100
        else:
            self.returnOnAssetsRatio  = 0

    def calculate_cost_to_income_ratio(self, income_expenditure_fact):
        if income_expenditure_fact.totalIncome> 0:
            self.costToIncomeRatio = (income_expenditure_fact.totalExpenditure / income_expenditure_fact.totalIncome) * 100
        else:
            self.costToIncomeRatio  = 0

    def __str__(self):
        return f"Capital Key Measures for Return Id {self.returnId.id}"
    

class LiquidityKeyMeasure(models.Model):
    returnId = models.OneToOneField(ScheduledFact, on_delete=models.CASCADE, primary_key=True, verbose_name="Return Id")

    # Computed fields for key measures
    liquidityRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Liquidity Ratio", null=True, blank=True)
    shortTermLiquidityRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Short Term Liquidity Ratio", null=True, blank=True)


    def calculate_liquidity_ratio(self, balance_sheet_fact, investments_facts):

        # Filter by dimension keys 1 and 2 in DepositsInvestmentsFact
        liquidity_investments = investments_facts.filter(depositsInvestmentsDim_id__in=[1, 2])
        
        # Sum the liquidity-related investments
        liquidity_investments_total = liquidity_investments.aggregate(models.Sum('totalDepositsAndInvestments'))['totalDepositsAndInvestments__sum'] or 0

        # Get total savings from BalanceSheetFact (membersShares + membersBudgetAccounts)
        total_savings = balance_sheet_fact.membersShares + balance_sheet_fact.membersBudgetAccounts

        # Calculate the liquidity ratio
        if total_savings > 0:
            self.liquidityRatio = (liquidity_investments_total / total_savings) * 100
        else:
            self.liquidityRatio = 0

    def calculate_short_term_liquidity_ratio(self, balance_sheet_fact, investments_facts):

        # Filter by dimension keys 1 in DepositsInvestmentsFact
        liquidity_investments = investments_facts.filter(depositsInvestmentsDim_id__in=[1])
        
        # Sum the liquidity-related investments
        liquidity_investments_total = liquidity_investments.aggregate(models.Sum('totalDepositsAndInvestments'))['totalDepositsAndInvestments__sum'] or 0

        # Get total savings from BalanceSheetFact (membersShares + membersBudgetAccounts)
        total_savings = balance_sheet_fact.membersShares + balance_sheet_fact.membersBudgetAccounts

        # Calculate the liquidity ratio
        if total_savings > 0:
            self.shortTermLiquidityRatio = (liquidity_investments_total / total_savings) * 100
        else:
            self.shortTermLiquidityRatio = 0
    
    def __str__(self):
        return f"Liquidity Key Measures for Return Id {self.returnId.id}"

class InvestmentKeyMeasure(models.Model):
    returnId = models.OneToOneField(ScheduledFact, on_delete=models.CASCADE, primary_key=True, verbose_name="Return Id")

    # Computed fields for key measures
    totalInvestments = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Total Investments", null=True, blank=True)
    investmentsToAssetsRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Investments to Assets Ratio", null=True, blank=True)
    aaciToInvestmentsRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="AACI to Investments Ratio", null=True, blank=True)
    ieeassToInvestmentsRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="IEEASS to Investments Ratio", null=True, blank=True)
    centralBankDepositsToInvestmentsRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="CBD to Investments Ratio", null=True, blank=True)
    bankBondsToInvestmentsRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Bank Bonds to Investments Ratio", null=True, blank=True)
    otherInvestmentsToInvestmentsRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Other Investments to Investments Ratio", null=True, blank=True)
    investmentsOver5YearsRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Investments Over 5 Years Ratio", null=True, blank=True)
    investmentsOver7YearsRatio= models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Investments Over 7 Years Ratio", null=True, blank=True)
    investmentsOver10YearsRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Investments Over 10 Years Ratio", null=True, blank=True)
    returnOnInvestmentsRatio = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Return on Investments", null=True, blank=True)

    def calculate_total_investments(self, balance_sheet_fact):
        self.totalInvestments = balance_sheet_fact.depositsInvestmentsCashEquivalents + balance_sheet_fact.depositsInvestmentsOther

    def calculate_investments_to_assets_ratio(self, balance_sheet_fact):
        total_investments = balance_sheet_fact.depositsInvestmentsCashEquivalents + balance_sheet_fact.depositsInvestmentsOther
        if balance_sheet_fact.totalAssets > 0:
            self.investmentsToAssetsRatio = (total_investments / balance_sheet_fact.totalAssets) * 100
        else:
            self.investmentsToAssetsRatio = 0
    
    def calculate_aaci_investments_ratio(self, balance_sheet_fact, investments_facts):

        # Filter by dimension keys 8 in DepositsInvestmentsFact
        investments = investments_facts.filter(depositsInvestmentsDim_id__in=[8])
        
        # Sum the related investments
        investments_total = investments.aggregate(models.Sum('accountsAuthorisedCreditInstitutions'))['accountsAuthorisedCreditInstitutions__sum'] or 0

        if balance_sheet_fact.totalAssets > 0:
            self.aaciToInvestmentsRatio = (investments_total / (balance_sheet_fact.depositsInvestmentsCashEquivalents + balance_sheet_fact.depositsInvestmentsOther)) * 100
        else:
            self.aaciToInvestmentsRatio = 0

    def calculate_ieeass_investments_ratio(self, balance_sheet_fact, investments_facts):

        # Filter by dimension keys 8 in DepositsInvestmentsFact
        investments = investments_facts.filter(depositsInvestmentsDim_id__in=[8])
        
        # Sum the related investments
        investments_total = investments.aggregate(models.Sum('irishEeaStateSecurities'))['irishEeaStateSecurities__sum'] or 0

        if balance_sheet_fact.totalAssets > 0:
            self.ieeassToInvestmentsRatio = (investments_total / (balance_sheet_fact.depositsInvestmentsCashEquivalents + balance_sheet_fact.depositsInvestmentsOther)) * 100
        else:
            self.ieeassToInvestmentsRatio = 0
    
    def calculate_cbd_investments_ratio(self, balance_sheet_fact, investments_facts):

        # Filter by dimension keys 8 in DepositsInvestmentsFact
        investments = investments_facts.filter(depositsInvestmentsDim_id__in=[8])
        
        # Sum the related investments
        investments_total = investments.aggregate(models.Sum('centralBankDeposits'))['centralBankDeposits__sum'] or 0

        if balance_sheet_fact.totalAssets > 0:
            self.centralBankDepositsToInvestmentsRatio = (investments_total / (balance_sheet_fact.depositsInvestmentsCashEquivalents + balance_sheet_fact.depositsInvestmentsOther)) * 100
        else:
            self.centralBankDepositsToInvestmentsRatio = 0
    
    def calculate_bb_investments_ratio(self, balance_sheet_fact, investments_facts):

        # Filter by dimension keys 8 in DepositsInvestmentsFact
        investments = investments_facts.filter(depositsInvestmentsDim_id__in=[8])
        
        # Sum the related investments
        investments_total = investments.aggregate(models.Sum('bankBonds'))['bankBonds__sum'] or 0

        if balance_sheet_fact.totalAssets > 0:
            self.bankBondsToInvestmentsRatio = (investments_total / (balance_sheet_fact.depositsInvestmentsCashEquivalents + balance_sheet_fact.depositsInvestmentsOther)) * 100
        else:
            self.bankBondsToInvestmentsRatio = 0
    
    def calculate_oi_investments_ratio(self, balance_sheet_fact, investments_facts):

        # Filter by dimension keys 8 in DepositsInvestmentsFact
        investments = investments_facts.filter(depositsInvestmentsDim_id__in=[8])
        
        # Sum the related investments
        investments_total = investments.aggregate(models.Sum('otherInvestments'))['otherInvestments__sum'] or 0

        if balance_sheet_fact.totalAssets > 0:
            self.otherInvestmentsToInvestmentsRatio = (investments_total / (balance_sheet_fact.depositsInvestmentsCashEquivalents + balance_sheet_fact.depositsInvestmentsOther)) * 100
        else:
            self.otherInvestmentsToInvestmentsRatio = 0
    
    def calculate_investments_over_5_yrs_ratio(self, balance_sheet_fact, investments_facts):

        # Filter by dimension keys 5,6,7 in DepositsInvestmentsFact
        investments = investments_facts.filter(depositsInvestmentsDim_id__in=[5,6,7])
        
        # Sum the related investments
        investments_total = investments.aggregate(models.Sum('totalDepositsAndInvestments'))['totalDepositsAndInvestments__sum'] or 0

        if balance_sheet_fact.totalAssets > 0:
            self.investmentsOver5YearsRatio = (investments_total / (balance_sheet_fact.depositsInvestmentsCashEquivalents + balance_sheet_fact.depositsInvestmentsOther)) * 100
        else:
            self.investmentsOver5YearsRatio = 0
    
    def calculate_investments_over_7_yrs_ratio(self, balance_sheet_fact, investments_facts):

        # Filter by dimension keys 6,7 in DepositsInvestmentsFact
        investments = investments_facts.filter(depositsInvestmentsDim_id__in=[6,7])
        
        # Sum the related investments
        investments_total = investments.aggregate(models.Sum('totalDepositsAndInvestments'))['totalDepositsAndInvestments__sum'] or 0

        if balance_sheet_fact.totalAssets > 0:
            self.investmentsOver7YearsRatio = (investments_total / (balance_sheet_fact.depositsInvestmentsCashEquivalents + balance_sheet_fact.depositsInvestmentsOther)) * 100
        else:
            self.investmentsOver7YearsRatio = 0
    
    def calculate_investments_over_10_yrs_ratio(self, balance_sheet_fact, investments_facts):

        # Filter by dimension keys 7 in DepositsInvestmentsFact
        investments = investments_facts.filter(depositsInvestmentsDim_id__in=[7])
        
        # Sum the related investments
        investments_total = investments.aggregate(models.Sum('totalDepositsAndInvestments'))['totalDepositsAndInvestments__sum'] or 0

        if balance_sheet_fact.totalAssets > 0:
            self.investmentsOver10YearsRatio = (investments_total / (balance_sheet_fact.depositsInvestmentsCashEquivalents + balance_sheet_fact.depositsInvestmentsOther)) * 100
        else:
            self.investmentsOver10YearsRatio = 0

    def calculate_return_on_investments_ratio(self, balance_sheet_fact, income_expenditure_fact):
        total_investments = balance_sheet_fact.depositsInvestmentsCashEquivalents + balance_sheet_fact.depositsInvestmentsOther
        if total_investments> 0:
            self.returnOnInvestmentsRatio= (income_expenditure_fact.otherInterestIncome / total_investments) * 100
        else:
            self.returnOnInvestmentsRatio = 0
    
    def __str__(self):
        return f"Investment Key Measures for Return Id {self.returnId.id}"
    
