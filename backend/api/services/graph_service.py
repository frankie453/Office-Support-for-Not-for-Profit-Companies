# backend/api/services/graph_service.py

from datetime import datetime, timedelta
import requests
from django.core.cache import cache
from typing import List, Dict, Any

class GraphEmailService:
    BASE_URL = "https://graph.microsoft.com/v1.0/me/messages"
    CACHE_TTL = 3600


    def fetch_emails_by_date_range(self, token: str, start_date: datetime, end_date: datetime, additional_filter: str = None) -> List[Dict[Any, Any]]:
        """Fetch emails within date range with caching"""
        cache_key = f"emails_{start_date.strftime('%Y%m')}_{end_date.strftime('%Y%m')}_{additional_filter}"
        
        cached_emails = cache.get(cache_key)
        if cached_emails:
            return cached_emails

        start_date_str = start_date.strftime('%Y-%m-%dT00:00:00Z')
        end_date_str = end_date.strftime('%Y-%m-%dT23:59:59Z')

        filter_query = (
            f"receivedDateTime ge {start_date_str} and "
            f"receivedDateTime le {end_date_str}"
        )
        
        if additional_filter:
            filter_query += f" and {additional_filter}"

        params = {
            '$filter': filter_query,
            '$select': 'id,subject,receivedDateTime,categories,from,sender',
            '$orderby': 'receivedDateTime desc',
            '$top': 999
        }

        headers = {
            'Authorization': token,
            'Prefer': 'outlook.timezone="UTC"'
        }
        
        try:
            print(f"Fetching emails with filter: {filter_query}")  # Debug print
            response = requests.get(
                self.BASE_URL,
                params=params,
                headers=headers
            )
            response.raise_for_status()
            
            data = response.json()
            emails = data.get('value', [])
            
            print(f"API Response: {response.status_code}")
            print(f"Found {len(emails)} emails")
            
            # Cache the results
            cache.set(cache_key, emails, self.CACHE_TTL)
            
            return emails
            
        except requests.exceptions.RequestException as e:
            print(f"Error fetching emails: {str(e)}")
            print(f"Response content: {e.response.content if hasattr(e, 'response') else 'No response'}")
            return []

    def group_by_week(self, emails: List[Dict]) -> List[int]:
        """Group emails into weekly counts"""
        weekly_counts = [0] * 4  
        
        for email in emails:
            received_date = datetime.fromisoformat(email['receivedDateTime'].replace('Z', '+00:00'))
            week_number = (received_date.day - 1) // 7  
            if 0 <= week_number < 4:
                weekly_counts[week_number] += 1
                
        return weekly_counts

    def group_by_category(self, emails: List[Dict], token: str) -> List[Dict]:
        """Count emails per category from existing emails"""
        category_counts = {}
        
        for email in emails:
            email_categories = email.get('categories', [])
            for category in email_categories:
                category_counts[category] = category_counts.get(category, 0) + 1
        
        return [
            {'label': category, 'value': count}
            for category, count in category_counts.items()
            if count > 0
        ]
  
        