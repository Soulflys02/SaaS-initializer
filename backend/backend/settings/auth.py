from datetime import timedelta
from .base import INSTALLED_APPS

INSTALLED_APPS += [
    'rest_framework_simplejwt',
    'authentification',
]

AUTH_USER_MODEL = "authentification.User"

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'authentification.models.CookieJWTAuthentication',
    ],
}

AUTHENTICATION_BACKENDS = ['authentification.backends.EmailBackend']

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "UPDATE_LAST_LOGIN": True,
    "AUTH_COOKIE_HTTP_ONLY": True,
    "AUTH_COOKIE_SECURE": False,
    "AUTH_COOKIE_SAMESITE": "Lax",
}