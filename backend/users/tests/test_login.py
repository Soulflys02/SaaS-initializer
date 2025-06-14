from django.test import TestCase, Client
from users.models import User
from allauth.account.models import EmailAddress

class LoginTests(TestCase):
    email: str = "test@gmail.com"
    password: str = "test_password"
    user: User
    client: Client = Client()
    
    login_url: str = "/users/browser/v1/auth/login"

    def setUp(self) -> None:
        self.user = User.objects.create_user(email=self.email, password=self.password) # type: ignore
        EmailAddress.objects.create(user=self.user, email=self.email, verified=True, primary=True)

    def test_login_with_no_credentials(self):
        """
        Test the login route with no credentials.
        """
        response = self.client.post(self.login_url, {}, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertIsNone(response.cookies.get("sessionid"))
    
    def test_login_with_invalid_credentials(self):
        """
        Test the login route with invalid credentials.
        """
        response = self.client.post(self.login_url, {"email": "fake@gmail.com", "password": "fakePassword"}, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertIsNone(response.cookies.get("sessionid"))
    
    def test_login_with_valid_credentials(self):
        """
        Test the login route with valid credentials.
        """
        response = self.client.post(self.login_url, {"email": self.email, "password": self.password}, content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.cookies.get("sessionid"))
        
        # Check if the user is logged in
        self.assertTrue(response.wsgi_request.user.is_authenticated)
    
    def test_login_with_unverified_email(self):
        """
        Test the login route with an unverified email.
        """
        emailAddress: EmailAddress = EmailAddress.objects.get(user=self.user, email=self.email, primary=True)
        emailAddress.verified = False
        emailAddress.save()
        response = self.client.post(self.login_url, {"email": self.email, "password": self.password}, content_type="application/json")
        self.assertEqual(response.status_code, 401)
        self.assertIsNotNone(response.cookies.get("sessionid"))
    
    def test_login_with_disabled_user(self):
        """
        Test the login route with a disabled user.
        """
        self.user.is_active = False
        self.user.save()
        response = self.client.post(self.login_url, {"email": self.email, "password": self.password}, content_type="application/json")
        self.assertEqual(response.status_code, 401)
        self.assertIsNotNone(response.cookies.get("sessionid"))