from django.db import models

# Create your models here.

from django.db import models

class Book(models.Model):
    
    name = models.CharField(max_length=255, verbose_name="Book Title") 
    author = models.CharField(max_length=255, verbose_name="Author")
    category = models.CharField(max_length=100, verbose_name="Category")
    release_date = models.DateField(null=True, blank=True, verbose_name="Release Date")
    language = models.CharField(max_length=50, default='English', verbose_name="Language")
    
    
    cover = models.ImageField(upload_to='covers/', default='default.jpg', verbose_name="Cover Image")

  
    def __str__(self):
        return self.name

  
    class Meta:
        
        ordering = ['-id']
    
        verbose_name = "Book"
        verbose_name_plural = "Books"
        
        