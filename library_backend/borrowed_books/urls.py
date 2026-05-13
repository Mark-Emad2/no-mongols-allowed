from django.urls import path
from . import views

urlpatterns = [
    # Page
    path('borrowed_books/', views.borrowed_books_page, name='borrowed_books'),
    
    # APIs
    path('api/borrowed-books/', views.api_borrowed_books, name='api_borrowed_books'),
    path('api/borrow-book/<int:book_id>/', views.api_borrow_book, name='api_borrow_book'),
    path('api/return-book/<int:borrow_id>/', views.api_return_book, name='api_return_book'),
    path('api/return-all-books/', views.api_return_all_books, name='api_return_all_books'),
]