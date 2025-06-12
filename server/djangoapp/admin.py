from django.contrib import admin
from .models import CarMake, CarModel, Review

admin.site.register(CarMake)
admin.site.register(CarModel)
admin.site.register(Review)
