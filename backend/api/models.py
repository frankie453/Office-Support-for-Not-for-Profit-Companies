from django.db import models

# Create your models here.

class Task(models.Model):
    STATUS_CHOICES = [
        ("todo", "To Do"),
        ("inProgress", "In Progress"),
        ("done", "Done"),
    ]

    title = models.CharField(max_length=255, default="")
    details = models.TextField(blank=True, default="")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="todo")
    
    
    def __str__(self):
        return self.title