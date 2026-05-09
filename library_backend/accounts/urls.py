from django.urls import path
from . import views

urlpatterns = [
    # API endpoints
    path('register/',        views.register),
    path('login/',           views.CustomLoginView.as_view()),
    path('forgot-password/', views.forgot_password),
]