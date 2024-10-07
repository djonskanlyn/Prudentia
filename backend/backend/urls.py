from django.contrib import admin
from django.urls import path, include
from .schema import schema_view, redoc_view
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path('admin/', (admin.site.urls)),
    path('api/', include('authapp.urls')),
    path('api/data/', include('data.urls')),
    path('api/key-measures/', include('key_measures.urls')),
    path('api/pr-reviews/', include('pr_reviews.urls')),

    # Add Swagger documentation URLs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', redoc_view, name='schema-redoc'),  # Protect ReDoc URL
]
