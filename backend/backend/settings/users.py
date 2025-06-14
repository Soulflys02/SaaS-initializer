from .base import INSTALLED_APPS, MIDDLEWARE, FRONTEND_URL

INSTALLED_APPS += [
    'users',
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
AUTH_USER_MODEL = "users.User"
HEADLESS_ONLY = True
HEADLESS_FRONTEND_URLS = {
    "account_confirm_email": f"{FRONTEND_URL}/confirm-email/{{key}}",
    "account_signup" : f"{FRONTEND_URL}/signup",
    "account_reset_password": f"{FRONTEND_URL}/reset-password",
}
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_SIGNUP_FIELDS = ['email*', 'password1*', 'password2*']
ACCOUNT_LOGIN_METHODS = {'email'}
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
SESSION_COOKIE_AGE = 60 * 60 * 24
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
ACCOUNT_LOGIN_ON_EMAIL_CONFIRMATION = True