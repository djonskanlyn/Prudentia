from django.db import models

class FirmDim(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class TemplateDim(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class StatusDim(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class StateDim(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
class DepositsInvestmentsDim(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
class CreditRiskDim(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class LoanMaturityDim(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
class LoanCategoryDim(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class ScheduledFact(models.Model):
    firm = models.ForeignKey(FirmDim, on_delete=models.PROTECT, verbose_name="Firm Id")
    template = models.ForeignKey(TemplateDim, on_delete=models.PROTECT, verbose_name="Template Id")
    status = models.ForeignKey(StatusDim, on_delete=models.PROTECT, verbose_name="Status Id")
    state = models.ForeignKey(StateDim, on_delete=models.PROTECT, verbose_name="State Id")
    versionRef = models.IntegerField(verbose_name="Version Ref")
    quarterRef = models.IntegerField(verbose_name="Quarter Ref")
    reportingDate = models.DateField(verbose_name="Reporting Date")
    dueDate = models.DateField(verbose_name="Due Date")
    firstSubmittedDatetime = models.DateTimeField(verbose_name="First Submitted Datetime")
    lastSubmittedDatetime = models.DateTimeField(verbose_name="Last Submitted Datetime")

    def __str__(self):
        return f"Return Id {self.id} - Firm: {self.firm.name}, Template: {self.template.name}, Reporting Date: {self.reportingDate}"

class IncomeExpenditureFact(models.Model):
    returnId = models.OneToOneField('ScheduledFact', on_delete=models.CASCADE, primary_key=True, verbose_name="Return Id")
    memberLoanInterest = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Member Loan Interest")
    otherInterestIncome = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Other Interest Income")
    otherIncome = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Other Income")
    totalIncome = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Total Income")
    employmentCosts = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Employment Costs")
    otherManagementCosts = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Other Management Costs")
    depreciationCosts = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Depreciation Costs")
    netMemberLoanImpairment = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Net Member Loan Impairment")
    totalExpenditure = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Total Expenditure")
    surplusOrDeficit = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Surplus Or Deficit IEA")

    def __str__(self):
        return f"Income and Expenditure Account for Return Id {self.returnId.id}"

class BalanceSheetFact(models.Model):
    returnId = models.OneToOneField('ScheduledFact', on_delete=models.CASCADE, primary_key=True, verbose_name="Return Id")
    cashBalancesBank = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Cash Balances at Bank")
    depositsInvestmentsCashEquivalents = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Deposits and Investments: Cash Equivalents")
    depositsInvestmentsOther = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Deposits and Investments: Other")
    membersLoans = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Members Loans")
    badDebtProvisions = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Bad Debt Provisions")
    tangibleFixedAssets = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Tangible Fixed Assets")
    debtorsPrepayments = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Debtors and Prepayments")
    totalAssets = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Total Assets")
    membersShares = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Members Shares")
    membersBudgetAccounts = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Members Budget Accounts")
    liabilitiesAccruals = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Liabilities and Accruals")
    otherProvisions = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Other Provisions")
    totalLiabilities = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Total Liabilities")
    regulatoryReserve = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Regulatory Reserve")
    operationalRiskReserve = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Operational Risk Reserve")
    surplusOrDeficit = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Surplus or Deficit BS")
    otherRealisedReserves = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Other Realised Reserves")
    otherUnrealisedReserves = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Other Unrealised Reserves")
    totalReserves = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Total Reserves")
    totalLiabilitiesReserves = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Total Liabilities and Reserves")

    def __str__(self):
        return f"Balance Sheet for Return Id {self.returnId.id}"

class DepositsInvestmentsFact(models.Model):
    returnId = models.ForeignKey('ScheduledFact', on_delete=models.CASCADE, verbose_name="Return Id")
    depositsInvestmentsDim = models.ForeignKey('DepositsInvestmentsDim', on_delete=models.PROTECT, verbose_name="Deposits and Investments Maturity Id")
    accountsAuthorisedCreditInstitutions = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Accounts in Authorised Credit Institutions by Maturity")
    irishEeaStateSecurities = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Irish and EEA State Securities by Maturity")
    centralBankDeposits = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Central Bank Deposits by Maturity")
    bankBonds = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Bank Bonds by Maturity")
    otherInvestments = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Other Investments by Maturity")
    totalDepositsAndInvestments = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Total Deposits and Investments by Maturity")

    def __str__(self):
        return f"Deposits and Investments Breakdown for Return Id {self.returnId.id}, Dimension: {self.depositsInvestmentsDim.name}"

class CreditRiskFact(models.Model):
    returnId = models.ForeignKey('ScheduledFact', on_delete=models.CASCADE, verbose_name="Return Id")
    creditRiskDim = models.ForeignKey('CreditRiskDim', on_delete=models.PROTECT, verbose_name="Credit Risk Id")
    numberCreditRisk = models.IntegerField(verbose_name="Number of Loans by Credit Risk")
    amountCreditRisk = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Amount of Loans by Credit Risk")
    provisionsAmountCreditRisk = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Amount of Provisions by Credit Risk")

    def __str__(self):
        return f"Credit Risk Breakdown for Return Id {self.returnId.id}, Dimension: {self.creditRiskDim.name}"

class OutstandingLoanMaturityFact(models.Model):
    returnId = models.ForeignKey('ScheduledFact', on_delete=models.CASCADE, verbose_name="Return Id")
    loanMaturityDim = models.ForeignKey('LoanMaturityDim', on_delete=models.PROTECT, verbose_name="Loan Maturity Id")
    numberOutstandingMaturity = models.IntegerField(verbose_name="Number of Outstanding Loans by Maturity")
    amountOutstandingMaturity = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Amount of Outstanding Loans by Maturity")

    def __str__(self):
        return f"Outstanding Loans Breakdown for Return Id {self.returnId.id}, Dimension: {self.loanMaturityDim.name}"

class AdvancedLoanMaturityFact(models.Model):
    returnId = models.ForeignKey('ScheduledFact', on_delete=models.CASCADE, verbose_name="Return Id")
    loanMaturityDim = models.ForeignKey('LoanMaturityDim', on_delete=models.PROTECT, verbose_name="Loan Maturity Id")
    numberAdvancedMaturity = models.IntegerField(verbose_name="Number of Advanced Loans by Maturity")
    amountAdvancedMaturity = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Amount of Advanced Loans by Maturity")

    def __str__(self):
        return f"Advanced Loans Breakdown for Return Id {self.returnId.id}, Dimension: {self.loanMaturityDim.name}"

class OutstandingLoanCategoryFact(models.Model):
    returnId = models.ForeignKey('ScheduledFact', on_delete=models.CASCADE, verbose_name="Return Id")
    loanCategoryDim = models.ForeignKey('LoanCategoryDim', on_delete=models.PROTECT, verbose_name="Loan Category Id")
    numberOutstandingCategory = models.IntegerField(verbose_name="Number of Outstanding Loans by Category")
    amountOutstandingCategory = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Amount of Outstanding Loans by Category")

    def __str__(self):
        return f"Outstanding Loans Breakdown for Return Id {self.returnId.id}, Dimension: {self.loanCategoryDim.name}"
    
class AdvancedLoanCategoryFact(models.Model):
    returnId = models.ForeignKey('ScheduledFact', on_delete=models.CASCADE, verbose_name="Return Id")
    loanCategoryDim = models.ForeignKey('LoanCategoryDim', on_delete=models.PROTECT, verbose_name="Loan Category Id")
    numberAdvancedCategory = models.IntegerField(verbose_name="Number of Advanced Loans by Category")
    amountAdvancedCategory = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Amount of Advanced Loans by Category")

    def __str__(self):
        return f"Advanced Loans Breakdown for Return Id {self.returnId.id}, Dimension: {self.loanCategoryDim.name}"
