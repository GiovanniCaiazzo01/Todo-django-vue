from django.contrib.auth import get_user_model
from rest_framework import serializers
from .validators import validate_strong_password


User = get_user_model()
BASE_USER_FIELDS = ["id", "username", "email", "firstName", "lastName"]


class UserPublicSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(
        source="first_name", allow_blank=True, required=False
    )
    lastName = serializers.CharField(
        source="last_name", allow_blank=True, required=False
    )

    class Meta:
        model = User
        fields = BASE_USER_FIELDS
        extra_kwargs = {
            "username": {
                "required": True,
                "error_messages": {"required": "Username is mandatory."},
            },
            "email": {
                "required": True,
                "error_messages": {"required": "Email is mandatory."},
            },
        }


class SignUpSerializer(UserPublicSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_strong_password],
        error_messages={"required": "Password is mandatory."},
    )

    class Meta(UserPublicSerializer.Meta):
        fields = BASE_USER_FIELDS + ["password"]

    def validate_username(self, value):
        if value and User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "A user with that username already exists."
            )
        return value

    def validate_email(self, value):
        if value and User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with that e-mail already exists.")
        return value

    def create(self, validated_data):
        # create_user gestisce hashing password
        password = validated_data.pop("password")
        return User.objects.create_user(password=password, **validated_data)


class SignInSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = User.objects.filter(email__iexact=email).first()
        user_wrong_credentail_message = (
            "Invalid e-mail or password, please check your credentials"
        )

        if not user:
            raise serializers.ValidationError(
                {
                    "email": user_wrong_credentail_message,
                    "password": user_wrong_credentail_message,
                }
            )

        if not user.check_password(password):
            raise serializers.ValidationError(
                {
                    "email": user_wrong_credentail_message,
                    "password": user_wrong_credentail_message,
                }
            )

        attrs["user"] = user
        return attrs


class ProfileSerializer(UserPublicSerializer):
    class Meta(UserPublicSerializer.Meta):
      fields = BASE_USER_FIELDS
