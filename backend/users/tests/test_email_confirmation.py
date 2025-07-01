from django.test import TestCase, Client
from django.core import mail
from users.models import User
from allauth.account.models import EmailAddress
import re
import urllib.parse

class EmailConfirmationTests(TestCase):
    email: str = "test@gmail.com"
    password: str = "test_password"
    client: Client = Client()
    user: User

    register_url: str = "/users/browser/v1/auth/signup"
    confirm_email_url: str = "/users/browser/v1/auth/email/verify"

    def setUp(self) -> None:
        response = self.client.post(
            self.register_url,
            {
                "email": self.email,
                "password": self.password,
            },
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 401)
        self.assertIsNotNone(response.cookies.get("sessionid"))
        self.user = User.objects.get(email=self.email)
        self.assertIsNotNone(self.user)

    def test_email_confirmation_invalid_key(self):
        """
        Test the email confirmation route with an invalid key.
        """
        response = self.client.post(
            self.confirm_email_url,
            {"key": "invalid_key"},
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)

    def test_email_confirmation(self):
        email_address = EmailAddress.objects.get(user=self.user, email=self.email, primary=True)
        self.assertFalse(email_address.verified, "Email should not be verified initially")

        email = mail.outbox[-1]
        match = re.search(r'/confirm-email/([^/\s]+)', email.body)
        assert match, "Confirmation key not found in email body"
        key = match.group(1)
        key = urllib.parse.unquote(key)

        response = self.client.post(
            self.confirm_email_url,
            {"key": key},
            content_type="application/json"
        )
        email_address.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertTrue(email_address.verified, "Email should be verified after confirmation")

