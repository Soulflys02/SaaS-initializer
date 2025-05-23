from django.test import TestCase
from users.models import User
from django.test import Client
from django.urls import reverse
from django.http import HttpResponse


# Create your tests here.
class AuthTests(TestCase):
    email: str = "tes@gmail.com"
    password: str = "test_password"
    user: User
    client: Client = Client()
    
    login_url: str = "/auth/browser/v1/auth/login"
    protected_url: str = reverse("hello_protected")
    scoped_url: str = reverse("hello_scoped")

    def setUp(self) -> None:
        self.user = User.objects.create_user(email=self.email, password=self.password) # type: ignore

    def test_token_good_credentials(self):
        """
        Test the token route with valid credentials.
        """
        response: HttpResponse = self.client.post(self.login_url, {"email": self.email, "password": self.password}, content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.cookies.get("sessionid"))
    
    def test_token_bad_credentials(self):
        """
        Test the token route with invalid credentials.
        """
        response: HttpResponse = self.client.post(self.login_url, {"email": self.email, "password": "wrong_password"}, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertIsNone(response.cookies.get("sessionid"))
    
    def test_authorized_route(self):
        """
        Test the protected route with valid credentials.
        """
        response: HttpResponse = self.client.post(self.login_url, {"email": self.email, "password": self.password}, content_type="application/json")
        self.assertEqual(response.status_code, 200)
        response: HttpResponse = self.client.get(self.protected_url)
        self.assertEqual(response.status_code, 200)
    
    def test_unauthorized_route(self):
        """
        Test the protected route with invalid credentials.
        """
        response: HttpResponse = self.client.get(self.protected_url)
        self.assertEqual(response.status_code, 403)

    def test_scoped_route(self):
        """
        Test the scoped route with valid credentials.
        """
        self.user.is_staff = True
        self.user.save()
        response: HttpResponse = self.client.post(self.login_url, {"email": self.email, "password": self.password}, content_type="application/json")
        self.assertEqual(response.status_code, 200)
        response: HttpResponse = self.client.get(self.scoped_url)
        self.assertEqual(response.status_code, 200)
        self.user.is_staff = False
        self.user.save()

    def test_unauthorized_scoped_route(self):
        """
        Test the scoped route with insufficient permissions.
        """
        response: HttpResponse = self.client.post(self.login_url, {"email": self.email, "password": self.password}, content_type="application/json")
        self.assertEqual(response.status_code, 200)
        response: HttpResponse = self.client.get(self.scoped_url)
        self.assertEqual(response.status_code, 403)

    def test_disabled_user(self):
        """
        Test the token route with a disabled user.
        """
        self.user.is_active = False
        self.user.save()
        response: HttpResponse = self.client.post(self.login_url, {"email": self.email, "password": self.password}, content_type="application/json")
        self.assertEqual(response.status_code, 401)

    def test_expired_access_token(self):
        """
        Test the token route with an expired access token.
        """
        # simulate an expired token
        self.client.cookies["sessionid"] = "fake_or_expired_sessionid"
        response: HttpResponse = self.client.get(self.protected_url)
        self.assertEqual(response.status_code, 403)