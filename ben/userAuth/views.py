from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.authtoken.models import Token
from .serializers import SignInSerializer, SignUpSerializer, UserPublicSerializer, ProfileSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class SignUpView(CreateAPIView):
    serializer_class = SignUpSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        ser = self.get_serializer(data=request.data)
        ser.is_valid(raise_exception=True)
        user = ser.save()
        token, _ = Token.objects.get_or_create(user=user)

        return Response(
            {"token": token.key, "user": UserPublicSerializer(user).data},
            status=status.HTTP_201_CREATED,
        )


class SignInView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = SignInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, _ = Token.objects.get_or_create(user=user)

        return Response(
            {"token": token.key, "user": UserPublicSerializer(user).data},
            status=status.HTTP_201_CREATED,
        )


class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            if request.auth:
                request.auth.delete()
            else:
                Token.objects.filter(user=request.user).delete()
        except Exception:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)



class ProfileViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
