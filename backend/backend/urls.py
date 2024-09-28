from django.contrib import admin
from django.urls import path, include
from .schema import schema_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tasks.urls')),
    path('api/', include('authapp.urls')),
    path('api/data/', include('data.urls')),
    path('api/key-measures/', include('key_measures.urls')),
    path('api/pr-reviews/', include('pr_reviews.urls')),

    # Add Swagger documentation URLs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
