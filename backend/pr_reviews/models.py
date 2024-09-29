from django.db import models
from key_measures.models import ScheduledFact

class PRReviewTable(models.Model):
    returnId = models.ForeignKey(ScheduledFact, on_delete=models.CASCADE, related_name='pr_reviews')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

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





