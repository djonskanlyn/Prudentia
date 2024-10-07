"""
This file defines the schema view for Swagger documentation.
"""
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
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
    public=False,
    permission_classes=(IsAuthenticated,),
    authentication_classes=(SessionAuthentication, JWTAuthentication),
)
