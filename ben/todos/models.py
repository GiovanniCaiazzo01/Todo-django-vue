from django.db import models
from django.utils import timezone


class Todo(models.Model):
    """
    Todo model with basic CRUD functionality
    """
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Todo'
        verbose_name_plural = 'Todos'

    def __str__(self):
        return self.title

    @property
    def is_overdue(self):
        """Check if todo is overdue (for future enhancement)"""
        return False  # Placeholder for due date functionality
