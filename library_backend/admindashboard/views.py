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


def add_book(request):
    if request.method == 'POST':

        name = request.POST.get('name_b')
        author = request.POST.get('author')
        about_author = request.POST.get('aboutAuthor')
        release_date = request.POST.get('release_date')
        language = request.POST.get('written_lan')
        amazon_link = request.POST.get('amazonLink')
        description = request.POST.get('description')
        cover = request.FILES.get('file')

        categories = request.POST.getlist('category')
        final_category = ", ".join(categories) if categories else "General"

        # حفظ الكتاب في الداتابيز
        new_book = Book.objects.create(
            name=name,
            author=author,
            about_author=about_author,
            category=final_category,
            release_date=release_date,
            language=language,
            amazon_link=amazon_link,
            description=description,
        )
        
        if cover:
            new_book.cover = cover
            new_book.save()

        return render(request, 'add.html', {'success': True}) # 3shan the message

    # لو اليوزر لسه فاتح الصفحة 
    return render(request, 'add.html')