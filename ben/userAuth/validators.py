# app/validators.py
import re
from rest_framework import serializers


def validate_strong_password(value: str) -> str:
    if len(value) < 8:
        raise serializers.ValidationError(
            "Password must be at least 8 characters long."
        )
    if not re.search(r"[A-Z]", value):
        raise serializers.ValidationError(
            "Password must contain at least one uppercase letter."
        )
    if not re.search(r"[a-z]", value):
        raise serializers.ValidationError(
            "Password must contain at least one lowercase letter."
        )
    if not re.search(r"\d", value):
        raise serializers.ValidationError("Password must contain at least one number.")
    return value
