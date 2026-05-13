from django.shortcuts import render


from django.shortcuts import render
from django.http import JsonResponse
from admindashboard.models import Book
from borrowed_books.models import borrwedBooks # خد بالك من اسم الموديل بتاع زميلك

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
            'aboutAuthor': b.about_author,
            'desc': b.description,
            'available': b.id not in borrowed_ids, # المنطق اللي أنت عاوزه
            'category': b.category,
            'amazonLink': b.amazon_link,
            'language': b.language,
            'date': str(b.release_date) if b.release_date else ''
        })
    return JsonResponse(data, safe=False)

# 2. API بيجيب تفاصيل كتاب واحد بالـ ID
def api_book_detail(request, book_id):
    try:
        b = Book.objects.get(id=book_id)
        is_borrowed = borrwedBooks.objects.filter(book=b, returned=False).exists()
        
        return JsonResponse({
            'id': b.id,
            'name': b.name,
            'author': b.author,
            'cover': b.cover.url if b.cover else '',
            'aboutAuthor': b.about_author,
            'desc': b.description,
            'available': not is_borrowed,
            'category': b.category,
            'amazonLink': b.amazon_link,
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