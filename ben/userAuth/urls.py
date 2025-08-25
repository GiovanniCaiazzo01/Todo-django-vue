from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SignUpView, SignInView, ProfileViewSet, LogoutView

router = DefaultRouter()

router.register(r"profile", ProfileViewSet, basename="profile")

urlpatterns = [
    path("sign-up/", SignUpView.as_view(), name="sign-up"),
    path("sign-in/", SignInView.as_view(), name="sign-in"),
    path("log-out/", LogoutView.as_view(), name="auth-logout"),
    path("", include(router.urls)),
]
