
import requests
import datetime
from collections import Counter, defaultdict

FORMS_VISIT_ENDPOINT = "http://127.0.0.1:8000/api/form/visits/"

def retrieve_data():
    response = requests.get(FORMS_VISIT_ENDPOINT)
    if response.status_code != 200:
        return f"Error: {response.status_code}"
    
    forms = response.json()
    
    # Initialize report data structures
    visits_per_month = Counter()
    visits_per_week = Counter()
    visits_per_category = Counter()

    for form in forms:
        visit_date = datetime.datetime.strptime(form["date"], "%Y-%m-%d")  # Convert string to date
        year_month = visit_date.strftime("%Y-%m")  # Format as "YYYY-MM"
        year_week = visit_date.strftime("%Y-%W")   # Format as "YYYY-WW"
        
        visits_per_month[year_month] += 1
        visits_per_week[year_week] += 1
        visits_per_category[form["visitPurpose"]] += 1

    # Print report
    print("Number of visits per month:")
    for month, count in visits_per_month.items():
        print(f"{month}: {count}")

    print("\nNumber of visits per week:")
    for week, count in visits_per_week.items():
        print(f"Week {week}: {count}")

    print("\nNumber of visits per category:")
    for category, count in visits_per_category.items():
        print(f"{category}: {count}")

if __name__ == "__main__":
    retrieve_data()

        

    


