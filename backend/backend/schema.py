"""
This file defines the schema view for Swagger documentation.
"""
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Prudentia API",
        default_version='v1',
        description="API documentation for Prudentia",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="johnscanlon104@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)