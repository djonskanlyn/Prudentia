from django.urls import path
from .views import KeyMeasuresLongFormatView, ReturnAndPreviousQuartersView, ReturnWithMeasuresView

urlpatterns = [
    path('key-measures/', KeyMeasuresLongFormatView.as_view(), name='key-measures-long-format'),
    path('return-previous/', ReturnAndPreviousQuartersView.as_view(), name='return-previous'),
    path('return-with-measures/', ReturnWithMeasuresView.as_view(), name='return-with-measures'),
]
