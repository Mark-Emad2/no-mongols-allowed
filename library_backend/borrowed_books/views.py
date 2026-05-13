from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from admindashboard.models import Book
from .models import borrwedBooks
from datetime import date, timedelta

@login_required
def borrowed_books_page(request):
    return render(request, 'borrowed_books.html')

@login_required
def api_borrowed_books(request):
    borrowed_books = borrwedBooks.objects.filter(
        user=request.user, returned=False
    ).select_related('book')
    
    data = []
    for borrow in borrowed_books:
        data.append({
            'id': borrow.id,
            'book_id': borrow.book.id,
            'title': borrow.book.name,
            'author': borrow.book.author,
            'cover': borrow.book.cover.url if borrow.book.cover else '',
            'borrowedDate': borrow.borrowed_date.strftime('%Y-%m-%d'),
            'dueDate': borrow.due_date.strftime('%Y-%m-%d'),
        })
    return JsonResponse(data, safe=False)

@login_required
@csrf_exempt
def api_return_book(request, borrow_id):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Invalid method'}, status=400)
    
    borrow = get_object_or_404(borrwedBooks, id=borrow_id, user=request.user)
    book = borrow.book

    borrow.returned = True
    borrow.save()

    book.available = True
    book.save()

    return JsonResponse({'success': True, 'message': f'Returned "{book.name}"'})

@login_required
@csrf_exempt
def api_return_all_books(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Invalid method'}, status=400)
    
    active = borrwedBooks.objects.filter(user=request.user, returned=False)
    count = active.count()

    if count == 0:
        return JsonResponse({'success': False, 'message': 'No books to return'})

    for borrow in active:
        book = borrow.book
        book.available = True
        book.save()
        borrow.returned = True
        borrow.save()
    
    return JsonResponse({'success': True, 'message': f'Returned {count} book(s)'})