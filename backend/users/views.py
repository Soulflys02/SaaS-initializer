from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from users.serializers import UserSerializer

@api_view(['GET'])
@ensure_csrf_cookie
def csrf(request):
    return Response({'detail': 'CSRF cookie set'})

class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({"user": serializer.data})