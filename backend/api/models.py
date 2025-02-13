from django.db import models

# Create your models here.
class Category(models.Model):
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["name"]
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name