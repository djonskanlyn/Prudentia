"""
This file defines the schema view for Swagger documentation.
"""
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Swagger schema configuration
schema_view = get_schema_view(
    openapi.Info(
        title="Prudentia API",
        default_version='v1',
        description="API documentation for Prudentia",
        contact=openapi.Contact(email="johnscanlon104@gmail.com"),
    ),
    public=False,  # Set public=False so authentication is required
    permission_classes=(IsAuthenticated,),  # Require authentication
    authentication_classes=(SessionAuthentication),  # Use session-based authentication
)
