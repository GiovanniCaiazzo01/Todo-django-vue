from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer, TodoCreateSerializer, TodoUpdateSerializer


class TodoViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Todo instances
    """

    queryset = Todo.objects.all()

    def get_serializer_class(self):
        if self.action == "create":
            return TodoCreateSerializer
        elif self.action in ["update", "partial_update"]:
            return TodoUpdateSerializer
        return TodoSerializer

    def create(self, request, *args, **kwargs):
        # Use the create serializer for validation
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Save the instance
        instance = serializer.save()

        # Return the complete object using the full serializer
        full_serializer = TodoSerializer(instance)
        headers = self.get_success_headers(full_serializer.data)
        return Response(
            full_serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def destroy(self, request, *ergs, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

    def perform_update(self, serializer):
        serializer.save()
