from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import borrwedBooks

def borrowed_books_page(request):
    return render(request, 'borrowed_books.html')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_borrowed_books(request):
    borrowed = borrwedBooks.objects.filter(user=request.user, returned=False).select_related('book')
    data = []
    for b in borrowed:
        data.append({
            'id': b.id,
            'book_id': b.book.id,
            'title': b.book.name,
            'author': b.book.author,
            'cover': b.book.cover.url if b.book.cover else '',
            'borrowedDate': b.borrowed_date.strftime('%Y-%m-%d'),
            'dueDate': b.due_date.strftime('%Y-%m-%d'),
        })
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_return_book(request, borrow_id):
    borrow = get_object_or_404(borrwedBooks, id=borrow_id, user=request.user)
    
    borrow.returned = True
    borrow.save()
    
    return Response({'success': True, 'message': f'Returned "{borrow.book.name}" successfully!'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_return_all_books(request):
    active = borrwedBooks.objects.filter(user=request.user, returned=False)
    if not active.exists():
        return Response({'success': False, 'message': 'No books to return'}, status=400)
    
    active.update(returned=True)
    return Response({'success': True, 'message': 'All books returned successfully!'})