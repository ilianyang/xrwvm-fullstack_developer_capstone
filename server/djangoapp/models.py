from datetime import datetime

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name  # Nice, clean name string

class CarModel(models.Model):
    car_make = models.ForeignKey(
        CarMake,
        on_delete=models.CASCADE,
        related_name="models"
    )
    name = models.CharField(max_length=100)

    CAR_TYPES = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('WAGON', 'Wagon'),
        ('COUPE', 'Coupe'),
        ('TRUCK', 'Truck'),
        ('CONVERTIBLE', 'Convertible'),
    ]
    type = models.CharField(
        max_length=20,
        choices=CAR_TYPES,
        default='SEDAN'
    )
    year = models.IntegerField(
        default=datetime.now().year,
        validators=[
            MinValueValidator(1990),
            MaxValueValidator(datetime.now().year)
        ]
    )
    dealer_id = models.IntegerField()  # From Cloudant or MongoDB

    def __str__(self):
        return f"{self.car_make.name} {self.name} ({self.year})"

class Review(models.Model):
    name = models.CharField(max_length=100)
    dealership = models.IntegerField()
    review = models.TextField()
    purchase = models.BooleanField()
    purchase_date = models.DateField(null=True, blank=True)
    car_make = models.CharField(max_length=100, null=True, blank=True)
    car_model = models.CharField(max_length=100, null=True, blank=True)
    car_year = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.review[:30]}"
