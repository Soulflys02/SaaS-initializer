from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from auth.permissions import IsAdminUser


# Create your views here.
class HelloView(APIView):
    def get(self, request):
        return Response(data={"message": "Hello, World!"})

class HelloProtectedView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response(data={"message": "Hello, World! (Protected)"})
    
class HelloScopedView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    def get(self, request):
        return Response(data={"message": "Hello, World! (Scoped)"})