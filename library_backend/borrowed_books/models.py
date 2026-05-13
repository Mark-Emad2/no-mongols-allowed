from django.db import models
from django.contrib.auth.models import User
from admindashboard.models import Book
from datetime import date, timedelta
# Create your models here.

class borrwedBooks(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Borrower")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, verbose_name="Borrowed Book")
    borrowed_date = models.DateField(auto_now_add=True, verbose_name="Borrowed Date")
    due_date = models.DateField(verbose_name="Due Date")
    returned = models.BooleanField(default=False, verbose_name="Returned Status")

    def save(self, *args, **kwargs):
        if not self.due_date:
            self.due_date = date.today() + timedelta(days=14)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.user.username} - {self.book.name}"
    
    class Meta:
        verbose_name = "Borrowed Book"
        verbose_name_plural = "Borrowed Books"
        ordering = ['-borrowed_date']
