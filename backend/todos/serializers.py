from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    """
    Serializer for Todo model with all CRUD operations
    """
    is_overdue = serializers.ReadOnlyField()

    class Meta:
        model = Todo
        fields = [
            'id',
            'title',
            'description',
            'completed',
            'created_at',
            'updated_at',
            'is_overdue'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_title(self, value):
        """
        Validate that title is not empty
        """
        if not value.strip():
            raise serializers.ValidationError("Title cannot be empty.")
        return value.strip()


class TodoCreateSerializer(TodoSerializer):
    """
    Serializer for creating todos with minimal required fields
    """
    class Meta(TodoSerializer.Meta):
        fields = ['title', 'description']


class TodoUpdateSerializer(TodoSerializer):
    """
    Serializer for updating todos - all fields optional except id
    """
    title = serializers.CharField(max_length=200, required=False)
    
    class Meta(TodoSerializer.Meta):
        fields = ['title', 'description', 'completed']
