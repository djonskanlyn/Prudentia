from django.contrib import admin
from .models import PRReviewTable, PRReviewMeasure

# Register the PRReviewTable model
class PRReviewTableAdmin(admin.ModelAdmin):
    list_display = ['returnId', 'created_at', 'updated_at']

# Register the PRReviewMeasure model
class PRReviewMeasureAdmin(admin.ModelAdmin):
    list_display = ['pr_review', 'source', 'measure', 'current_Q0', 'average']

# Register the models in the admin interface
admin.site.register(PRReviewTable, PRReviewTableAdmin)
admin.site.register(PRReviewMeasure, PRReviewMeasureAdmin)
