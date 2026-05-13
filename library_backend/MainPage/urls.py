from django.urls import path
from . import views

urlpatterns = [
    path('available_books_user/', views.available_books_user, name='available_books_user'),
    path('borrowed_books/', views.borrowed_books, name='borrowed_books'),
    path('MainPage/', views.MainPage, name='MainPage'),
    
    # MAKE SURE THIS LINE EXISTS:
    path('api/borrow-book/<int:book_id>/', views.api_borrow_book, name='api_borrow_book'),
]