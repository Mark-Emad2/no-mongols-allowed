from django.urls import path
from . import views

urlpatterns = [
    path('borrowed_books/', views.borrowed_books_page, name='borrowed_books'),  # FIXED: function name
    
    path('api/borrowed-books/', views.api_borrowed_books, name='api_borrowed_books'),
    path('api/return-book/<int:borrow_id>/', views.api_return_book, name='api_return_book'),
    path('api/return-all/', views.api_return_all, name='api_return_all_books'),  # FIXED
]