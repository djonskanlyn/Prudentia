from django.db import models
from key_measures.models import ScheduledFact
from django.contrib.auth.models import User

class PRReviewTable(models.Model):
    returnId = models.ForeignKey(ScheduledFact, on_delete=models.CASCADE, related_name='pr_reviews')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Adding large text fields for comments
    capital_comment = models.TextField(null=True, blank=True)
    liquidity_comment = models.TextField(null=True, blank=True)
    investments_comment = models.TextField(null=True, blank=True)
    credit_comment = models.TextField(null=True, blank=True)
    final_comment = models.TextField(null=True, blank=True)

    # Sign-off fields
    supervisor_so_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name="supervisor_signoffs")  
    supervisor_so_at = models.DateTimeField(null=True, blank=True)  # Supervisor sign-off date
    senior_supervisor_so_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name="senior_supervisor_signoffs")  
    senior_supervisor_so_at = models.DateTimeField(null=True, blank=True)  # Senior Supervisor sign-off date

    def __str__(self):
        return f"PRReview for Return Id {self.returnId.id}"
    
class PRReviewMeasure(models.Model):
    pr_review = models.ForeignKey(PRReviewTable, on_delete=models.CASCADE, related_name='measures')
    source = models.CharField(max_length=50)
    measure = models.CharField(max_length=100)
    current_Q0 = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    prior_Q1 = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    prior_Q2 = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    prior_Q3 = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    prior_Q4 = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    perc_diff_pq = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    perc_diff_py = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    average = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    comments = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.measure} for PRReview {self.pr_review_id}"





