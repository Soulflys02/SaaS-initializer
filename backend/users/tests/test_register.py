from django.test import TestCase, Client


class RegisterTests(TestCase):
    email: str = "test@gmail.com"
    password: str = "test_password"
    client: Client = Client()

    register_url = "/users/browser/v1/auth/signup"

    def test_register(self):
        """
        Test the registration route with valid credentials.
        """
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
    
    def test_register_with_existing_email(self):
        """
        Test the registration route with an existing email.
        """
        response = self.client.post(
            self.register_url,
            {
                "email": self.email,
                "password": self.password,
            },
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 401)
        self.client.cookies.clear()
        response = self.client.post(
            self.register_url,
            {
                "email": self.email,
                "password": self.password,
            },
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 401)
    
    def test_register_with_invalid_email(self):
        """
        Test the registration route with an invalid email.
        """
        response = self.client.post(
            self.register_url,
            {
                "email": "invalid-email",
                "password": self.password,
            },
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        self.assertIsNone(response.cookies.get("sessionid"))
    
    def test_register_with_missing_fields(self):
        """
        Test the registration route with missing fields.
        """
        response = self.client.post(
            self.register_url,
            {},
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        self.assertIsNone(response.cookies.get("sessionid"))