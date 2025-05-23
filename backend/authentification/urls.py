from django.urls import path, include
from .views import *

urlpatterns = [
    path("accounts/", include("allauth.urls")),
    path("", include("allauth.headless.urls")),
    path("csrf/", csrf, name="csrf"),
    path("user/", UserView.as_view(), name="user"),
]
