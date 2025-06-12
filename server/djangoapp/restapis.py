import requests
import os
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv('backend_url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv
(
    'sentiment_analyzer_url', 
    default="http://localhost:5050"
)


def get_request(endpoint, **kwargs):
    request_url = f"{backend_url.rstrip('/')}/{endpoint.lstrip('/')}"
    print(f"GET from {request_url} with params {kwargs}")
    try:
        response = requests.get(request_url, params=kwargs)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Network exception occurred: {e}")
        return None


def analyze_review_sentiments(text):
    request_url = f"{sentiment_analyzer_url.rstrip('/')}/analyze/{text}"
    print(f"Analyzing sentiment for text: {text}")
    try:
        response = requests.get(request_url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Sentiment analysis failed: {e}")
        return None


def post_review(data_dict):
    request_url = f"{backend_url.rstrip('/')}/insert_review"
    print(f"Posting review to {request_url} with data: {data_dict}")
    try:
        response = requests.post(request_url, json=data_dict)
        response.raise_for_status()
        print(response.json())
        return response.json()
    except requests.RequestException as e:
        print(f"Review submission failed: {e}")
        return None
