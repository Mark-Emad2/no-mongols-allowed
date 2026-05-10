from django.shortcuts import render

def MainPage(request):
    return render(request, 'MainPage.html')

def available_books_user(request):
    return render(request, 'available_books_user.html')

def borrowed_books(request):
    return render(request, 'borrowed_books.html')