from django.urls import path, include

urlpatterns = [
    path("accounts/", include("allauth.urls")),
    path("", include("allauth.headless.urls")),
]
