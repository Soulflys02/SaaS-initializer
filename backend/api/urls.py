from django.urls import path, include
from . import views

urlpatterns = [
   path("public/", views.HelloView.as_view(), name="hello"),
   path("protected/", views.HelloProtectedView.as_view(), name="hello_protected"),
   path("scoped/", views.HelloScopedView.as_view(), name="hello_scoped"),
]
