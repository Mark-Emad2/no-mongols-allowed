from django.urls import path
from . import views

urlpatterns = [
    path('', views.admin_dashboard, name='admindashboard'),
    path('delete/<int:book_id>/', views.delete_book, name='delete_book'),
    path('add/', views.add_book, name='add_book'),
]