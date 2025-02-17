from django.db import models

# Create your models here.


class InPersonVisitForm(models.Model):
    objects = models.Manager()
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
    visitPurpose = models.CharField(max_length=100, choices=VISIT_PURPOSE_CHOICES)
    taskTransferredTo = models.CharField(max_length=100, choices=TASK_TRANSFERRED_CHOICES)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField()
    notes = models.TextField(blank=True)
    date = models.DateField()

    def __str__(self):
        return f"{self.firstName} {self.lastName} - {self.visitPurpose}"


class PhoneCallForm(models.Model):
    objects = models.Manager()
    ISSUE_CHOICES = [
        ('counselling', 'Counselling'),
        ('business', 'Business'),
        ('general', 'General'),
    ]

    TASK_TRANSFERRED_CHOICES = [
        ('employee1', 'Employee 1'),
        ('employee2', 'Employee 2'),
        ('employee3', 'Employee 3'),
    ]

    CALL_TYPE_CHOICES = [
        ('incoming', 'Incoming'),
        ('outgoing', 'Outgoing')
    ]

    issue = models.CharField(max_length=100, choices=ISSUE_CHOICES)
    callTransferredTo = models.CharField(max_length=100, choices=TASK_TRANSFERRED_CHOICES)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField()
    notes = models.TextField(blank=True)
    date = models.DateField()

    def __str__(self):
        return f"{self.firstName} {self.lastName} - {self.issue}"