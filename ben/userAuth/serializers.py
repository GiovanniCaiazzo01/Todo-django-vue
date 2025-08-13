from .validators import validate_strong_password

# from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token


# User = get_user_model()


class SignUpSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source="first_name", )
    lastName  = serializers.CharField(source="last_name", )
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["username", "firstName", "lastName", "email", "password", "token"]
        extra_kwargs = {
            "username": {
                "required": True,
                "error_messages": {"required": "Username is mandatory."},
            },
            "email": {
                "required": True,
                "error_messages": {"required": "Email is mandatory."},
            },
            "password": {
                "required": True,
                "write_only": True,
                "validators": [validate_strong_password],
                "error_messages": {"required": "Password is mandatory."},
            },
        }

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already taken")
        return value

    def validate_email(self, value):
        if value and User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already in use")
        return value

    def create(self, validated_data):
        # create_user gestisce hashing password
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
            firstName=validated_data["firstName"],
            lastName=validated_data["lastName"],
        )

    def get_token(self, obj):
        token, _ = Token.objects.get_or_create(user=obj)
        return token.key


class SignInSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True, validators=[validate_strong_password]
    )

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = User.objects.filter(email__iexact=email).first()
        user_wrong_credentail_message = (
            "Invalid e-mail or password, please check your credentials"
        )

        if not user:
            raise serializers.ValidationError(user_wrong_credentail_message)

        if not user.check_password(password):
            raise serializers.ValidationError(user_wrong_credentail_message)

        if not user.is_active:
            raise serializers.ValidationError("User inactive")

        attrs["user"] = user
        return attrs
