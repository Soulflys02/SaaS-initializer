from django.urls import path
from . import views

urlpatterns = [
    path('refresh/', views.RefreshTokenView.as_view(), name='token_refresh'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
]
