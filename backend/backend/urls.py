from django.contrib import admin
from django.urls import path, include
from .schema import schema_view
from django.contrib.auth.decorators import user_passes_test

# Custom decorator to check if the user is a superuser
def superuser_required(view_func):
    """
    Decorator that only allows superusers to access the view.
    If the user is not a superuser, they are redirected to the login page.
    """
    return user_passes_test(lambda u: u.is_superuser, login_url='/admin/login/')(view_func)

urlpatterns = [
    path('admin/', (admin.site.urls)),
    path('api/', include('authapp.urls')),
    path('api/data/', include('data.urls')),
    path('api/key-measures/', include('key_measures.urls')),
    path('api/pr-reviews/', include('pr_reviews.urls')),

    # Add Swagger documentation URLs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    # Swagger UI - restricted to superusers only
    path('swagger/', superuser_required(schema_view.with_ui('swagger', cache_timeout=0)), name='schema-swagger-ui'),

    # ReDoc documentation - also restricted to superusers
    path('redoc/', superuser_required(schema_view.with_ui('redoc', cache_timeout=0)), name='schema-redoc'),
]
