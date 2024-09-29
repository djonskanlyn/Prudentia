from django.urls import path
from .views import (
    KeyMeasuresLongFormatView, 
    ReturnAndPreviousQuartersView, 
    ReturnWithMeasuresView, 
    ReturnWithPivotedMeasuresView, 
    ReturnWithPivotedMeasuresWithAverageView,
    PRReviewWithDetailsView
)

urlpatterns = [
    path('key-measures/', KeyMeasuresLongFormatView.as_view(), name='key-measures-long-format'),
    path('return-previous/', ReturnAndPreviousQuartersView.as_view(), name='return-previous'),
    path('return-with-measures/', ReturnWithMeasuresView.as_view(), name='return-with-measures'),
    path('return-pivoted-measures/', ReturnWithPivotedMeasuresView.as_view(), name='return-pivoted-measures'),
    path('return-with-averages/', ReturnWithPivotedMeasuresWithAverageView.as_view(), name='return-with-averages'),
    path('pr-reviews-with-details/', PRReviewWithDetailsView.as_view(), name='pr-reviews-with-details'),

]
