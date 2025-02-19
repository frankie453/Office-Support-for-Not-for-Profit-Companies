from django.db import models


class InPersonVisitForm(models.Model):
    VISIT_PURPOSE_CHOICES = [
        ('counselling', 'Counselling'),
        ('business', 'Business'),
        ('general', 'General'),
    ]

    TASK_TRANSFERRED_CHOICES = [
        ('employee1', 'Employee 1'),
        ('employee2', 'Employee 2'),
        ('employee3', 'Employee 3'),
    ]
    visit_purpose = models.CharField(max_length=100, choices=VISIT_PURPOSE_CHOICES)
    task_transferred_to = models.CharField(max_length=100, choices=TASK_TRANSFERRED_CHOICES)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField()
    notes = models.TextField(blank=True)
    date = models.DateField()
class Category(models.Model):
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["name"]
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name