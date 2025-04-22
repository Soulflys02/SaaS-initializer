from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from backend.settings import SIMPLE_JWT
from django.contrib.auth import authenticate

# Create your views here.
class LoginView(APIView):
    def post(self, request):
        # Handle login logic here
        username: str = request.data.get('username')
        password: str = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is None:
            return Response({"error": "Invalid credentials"}, status=401)
        if not user.is_active:
            return Response({"error": "User is inactive"}, status=401)
        
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        response = Response({"message": "Login successful!"}, status=200)
        response.set_cookie(
            key='access_token',
            value=str(access),
            httponly=SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            max_age=SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            samesite=SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
            secure=SIMPLE_JWT['AUTH_COOKIE_SECURE']
        )
        response.set_cookie(
            key='refresh_token',
            value=str(refresh), 
            httponly=SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            max_age=SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            samesite=SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
            secure=SIMPLE_JWT['AUTH_COOKIE_SECURE']
        )
        
        return response
    
class RefreshTokenView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({"error": "Refresh token not provided"}, status=400)
        
        try:
            refresh = RefreshToken(refresh_token)
            access = refresh.access_token

            response = Response({"message": "Token refreshed successfully!"}, status=200)
            response.set_cookie(
                key='access_token',
                value=str(access),
                httponly=SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                max_age=SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                samesite=SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                secure=SIMPLE_JWT['AUTH_COOKIE_SECURE']
            )
            return response

        except Exception as e:
            return Response({"error": str(e)}, status=401)
        
        

class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Logout successful!"}, status=200)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response