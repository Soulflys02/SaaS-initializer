from django.test import TestCase, Client
from django.core import mail
import re
import urllib.parse
from users.models import User

class ResetPasswordTests(TestCase):
    email: str = "test@gmail.com"
    password: str = "test_password"
    client: Client = Client()
    user: User

    reset_url: str = "/users/browser/v1/auth/password/reset"
    request_url: str = "/users/browser/v1/auth/password/request"

    def setUp(self) -> None:
        self.user = User.objects.create_user(email=self.email, password=self.password) # type: ignore
    
    def test_request(self):
        """
        Test the password reset request route.
        """
        response = self.client.post(
            self.request_url,
            {"email": self.email},
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)

    def test_request_invalid_email(self):
        """
        Test the password reset request route with an invalid email.
        """
        response = self.client.post(
            self.request_url,
            {"email": ""},
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        
    def test_reset_password(self):
        """Test the password reset route with a valid key.
        """
        # First, request a password reset
        response = self.client.post(
            self.request_url,
            {"email": self.email},
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)

        # Extract the key from the email sent
        email = mail.outbox[-1]
        match = re.search(r'/reset-password/([^/\s]+)', email.body)
        assert match, "Confirmation key not found in email body"
        key = match.group(1)
        key = urllib.parse.unquote(key)

        # Now reset the password using the key
        response = self.client.post(
            self.reset_url,
            {"key": key, "password": "new_password"},
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 401)
    
    def test_reset_password_invalid_key(self):
        """
        Test the password reset route with an invalid key.
        """
        response = self.client.post(
            self.reset_url,
            {"key": "invalid_key", "password": "new_password"},
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)

    def test_reset_password_invalid_password(self):
        """
        Test the password reset route with an invalid password.
        """
        # First, request a password reset
        response = self.client.post(
            self.request_url,
            {"email": self.email},
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)

        # Extract the key from the email sent
        email = mail.outbox[-1]
        match = re.search(r'/reset-password/([^/\s]+)', email.body)
        assert match, "Confirmation key not found in email body"
        key = match.group(1)
        key = urllib.parse.unquote(key)

        # Now reset the password using the key with an invalid password
        response = self.client.post(
            self.reset_url,
            {"key": key, "password": ""},
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)