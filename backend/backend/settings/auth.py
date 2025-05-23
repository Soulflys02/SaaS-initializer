from datetime import timedelta
from .base import INSTALLED_APPS, MIDDLEWARE

INSTALLED_APPS += [
    'authentification',
    'allauth.account',
    'allauth.headless',
]

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

MIDDLEWARE += [
    "allauth.account.middleware.AccountMiddleware",
]

AUTH_USER_MODEL = "authentification.User"
HEADLESS_ONLY = True
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_SIGNUP_FIELDS = ['email*', 'password1*', 'password2*']
ACCOUNT_LOGIN_METHODS = {'email'}
SESSION_COOKIE_AGE = 60 * 60 * 24