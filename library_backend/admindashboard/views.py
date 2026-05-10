from django.views.decorators.csrf import csrf_exempt 
from django.shortcuts import render
from django.http import JsonResponse

from .models import Book
# Create your views here.


def admin_dashboard(request):
    
    books_list = Book.objects.all()
    
    return render(request, 'admindashboard.html', {'books': books_list})

def delete_book(request, book_id):
    # الـ JS بيبعت طلب من نوع POST
    if request.method == 'POST':
        try:
            book = Book.objects.get(id=book_id)
            book.delete()
            return JsonResponse({'status': 'success'}, status=200)
        except Book.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Book not found'}, status=404)
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)
