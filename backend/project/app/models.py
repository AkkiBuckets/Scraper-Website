from django.db import models

class ScrapedData(models.Model):
    url = models.URLField()
    scraped_content = models.TextField()

    def __str__(self):
        return self.url
