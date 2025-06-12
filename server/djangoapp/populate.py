
from .models import CarMake, CarModel
from datetime import datetime


def initiate():
    current_year = datetime.now().year

    car_make_data = [
        {"name": "NISSAN", "description": "Great cars. Japanese technology"},
        {"name": "Mercedes", "description": "Great cars. German technology"},
        {"name": "Audi", "description": "Great cars. German technology"},
        {"name": "Kia", "description": "Great cars. Korean technology"},
        {"name": "Toyota", "description": "Great cars. Japanese technology"},
    ]

    car_make_instances = []
    for data in car_make_data:
        make, created = CarMake.objects.get_or_create(
            name=data["name"],
            defaults={"description": data["description"]},
        )
        car_make_instances.append(make)
        print(f"{'Created' if created else 'Found'} CarMake: {make.name}")

    car_model_data = [
        {
            "name": "Pathfinder",
            "type": "SUV",
            "car_make": car_make_instances[0],
            "dealer_id": 1,
        },
        {
            "name": "Qashqai",
            "type": "SUV",
            "car_make": car_make_instances[0],
            "dealer_id": 1,
        },
        {
            "name": "XTRAIL",
            "type": "SUV",
            "car_make": car_make_instances[0],
            "dealer_id": 1,
        },
        {
            "name": "A-Class",
            "type": "SUV",
            "car_make": car_make_instances[1],
            "dealer_id": 2,
        },
        {
            "name": "C-Class",
            "type": "SUV",
            "car_make": car_make_instances[1],
            "dealer_id": 2,
        },
        {
            "name": "E-Class",
            "type": "SUV",
            "car_make": car_make_instances[1],
            "dealer_id": 2,
        },
        {
            "name": "A4",
            "type": "SUV",
            "car_make": car_make_instances[2],
            "dealer_id": 3,
        },
        {
            "name": "A5",
            "type": "SUV",
            "car_make": car_make_instances[2],
            "dealer_id": 3,
        },
        {
            "name": "A6",
            "type": "SUV",
            "car_make": car_make_instances[2],
            "dealer_id": 3,
        },
        {
            "name": "Sorrento",
            "type": "SUV",
            "car_make": car_make_instances[3],
            "dealer_id": 4,
        },
        {
            "name": "Carnival",
            "type": "SUV",
            "car_make": car_make_instances[3],
            "dealer_id": 4,
        },
        {
            "name": "Cerato",
            "type": "SEDAN",
            "car_make": car_make_instances[3],
            "dealer_id": 4,
        },
        {
            "name": "Corolla",
            "type": "SEDAN",
            "car_make": car_make_instances[4],
            "dealer_id": 5,
        },
        {
            "name": "Camry",
            "type": "SEDAN",
            "car_make": car_make_instances[4],
            "dealer_id": 5,
        },
        {
            "name": "Kluger",
            "type": "SUV",
            "car_make": car_make_instances[4],
            "dealer_id": 5,
        },
    ]

    for data in car_model_data:
        model, created = CarModel.objects.get_or_create(
            name=data["name"],
            car_make=data["car_make"],
            defaults={
                "type": data["type"].upper(),
                "year": current_year,
                "dealer_id": data["dealer_id"],
            },
        )
        print(f"{'Created' if created else 'Found'} CarModel: {model.name}")
