from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from datetime import date, timedelta
from admindashboard.models import Book
from borrowed_books.models import borrwedBooks  # ← FIXED: Import from borrowed_books

def api_books_list(request):
    books = Book.objects.all()
    borrowed_ids = borrwedBooks.objects.filter(returned=False).values_list('book_id', flat=True)
    
    data = []
    for b in books:
        data.append({
            'id': b.id,
            'name': b.name,
            'author': b.author,
            'cover': b.cover.url if b.cover else '',
            'aboutAuthor': getattr(b, 'about_author', ''),
            'desc': getattr(b, 'description', 'No description'),
            'available': b.id not in borrowed_ids,
            'category': b.category,
            'amazonLink': getattr(b, 'amazon_link', ''),
            'language': b.language,
            'date': str(b.release_date) if b.release_date else ''
        })
    return JsonResponse(data, safe=False)

def api_book_detail(request, book_id):
    try:
        b = Book.objects.get(id=book_id)
        is_borrowed = borrwedBooks.objects.filter(book=b, returned=False).exists()
        
        return JsonResponse({
            'id': b.id,
            'name': b.name,
            'author': b.author,
            'cover': b.cover.url if b.cover else '',
            'aboutAuthor': getattr(b, 'about_author', ''),
            'desc': getattr(b, 'description', 'No description'),
            'available': not is_borrowed,
            'category': b.category,
            'amazonLink': getattr(b, 'amazon_link', ''),
            'language': b.language,
            'date': str(b.release_date) if b.release_date else ''
        })
    except Book.DoesNotExist:
        return JsonResponse({'error': 'Book not found'}, status=404)

def MainPage(request):
    return render(request, 'MainPage.html')

def available_books_user(request):
    return render(request, 'available_books_user.html')

def borrowed_books(request):
    return render(request, 'borrowed_books.html')

@csrf_exempt
def api_borrow_book(request, book_id):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Invalid method'}, status=400)
    
    book = get_object_or_404(Book, id=book_id)
    
    # Check if available
    is_borrowed = borrwedBooks.objects.filter(book=book, returned=False).exists()
    if is_borrowed:
        return JsonResponse({'success': False, 'message': 'This book is already borrowed'})
    
    # Create borrow record
    borrwedBooks.objects.create(
        user=request.user,
        book=book,
        due_date=date.today() + timedelta(days=14)
    )
    
    # Mark book as unavailable
    book.available = False
    book.save()
    
    return JsonResponse({'success': True, 'message': f'Successfully borrowed "{book.name}"!'})