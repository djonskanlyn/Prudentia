from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    KeyMeasuresLongFormatView, 
    ReturnAndPreviousQuartersView, 
    ReturnWithMeasuresView, 
    ReturnWithPivotedMeasuresView, 
    ReturnWithPivotedMeasuresWithAverageView,
    PRReviewWithDetailsView,
    PRReviewMeasuresView,
    create_pr_review,
    update_measure_comments,
    PRReviewTableDetailView
)

# Add a DRF DefaultRouter for a browsable REST page
router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),  # This will handle the default /api/pr-reviews/ page
    path('key-measures/', KeyMeasuresLongFormatView.as_view(), name='key-measures-long-format'),
    path('return-previous/', ReturnAndPreviousQuartersView.as_view(), name='return-previous'),
    path('return-with-measures/', ReturnWithMeasuresView.as_view(), name='return-with-measures'),
    path('return-pivoted-measures/', ReturnWithPivotedMeasuresView.as_view(), name='return-pivoted-measures'),
    path('return-with-averages/', ReturnWithPivotedMeasuresWithAverageView.as_view(), name='return-with-averages'),
    path('pr-reviews-with-details/', PRReviewWithDetailsView.as_view(), name='pr-reviews-with-details'),
    path('create-pr-review/', create_pr_review, name='create-pr-review'),
    path('pr-reviews-details/<int:review_id>/', PRReviewMeasuresView.as_view(), name='pr-review-details'),
    path('update-measure-comments/<int:pk>/', update_measure_comments, name='update-measure-comments'),
    path('pr-reviews-with-comments/<int:pk>/', PRReviewTableDetailView.as_view(), name='pr-reviews-with-comments')
]


