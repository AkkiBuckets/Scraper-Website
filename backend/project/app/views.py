from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
import requests
from bs4 import BeautifulSoup
from .models import ScrapedData

@csrf_exempt
def scrape_website(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            url = body.get('url')

            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            }
            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code != 200:
                return JsonResponse({'error': f'Failed to fetch content, status {response.status_code}'}, status=500)

            soup = BeautifulSoup(response.content, 'html.parser')
            content = ' '.join(soup.stripped_strings).strip()

            if not content:
                return JsonResponse({'error': 'No content found on page'}, status=500)

            ScrapedData.objects.create(url=url, scraped_content=content)

            return JsonResponse({'scraped_content': content}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
