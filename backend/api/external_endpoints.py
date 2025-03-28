import requests

ML_ENDPOINT = "https://capstone-ai-email-categorizer-cpf7bfa3dyb5e5bh.canadacentral-01.azurewebsites.net/predict"


def get_ml_categories(subject, sender, body):
    post_data = {"subject": subject, "sender": sender, "body": body}
    response = requests.post(ML_ENDPOINT, json=post_data)
    categories = list(response.json())
    return categories


# get_ml_categories(
#     "Web Shop Order Confirmation",
#     "Your best manager",
#     "I want to know if you have this item in stock. I need it for my project.",
# )
