from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from accounts import views as page_views
from MainPage import views as main_views
from borrowed_books import views as borrowed_views

from accounts import views as v


urlpatterns = [

    # ── Django admin panel ────────────────────────────────────────────────────
    path('admin/', admin.site.urls),

    # ── API endpoints (used by JS fetch) ─────────────────────────────────────
    path('api/', include('accounts.urls')),
    

    # ── Public pages (no login required) ─────────────────────────────────────
    path('',          v.main_page_public,  name='MainPage'),  
    path('MainPage/', v.main_page_public,  name='MainPage2'),
    path('login/',    v.login_page,        name='login'),
    path('signup/',   v.signup_page,       name='signup'),
    path('reset/',    v.reset_page,        name='reset'),

    # ── User pages ────────────────────────────────────────────────────────────
    path('main/',                 v.main_page,           name='main'),
    path('available_books_user/', v.available_books_user, name='available_books_user'),
    path('borrowed_books/',       v.borrowed_books,      name='borrowed_books'),
    path('book_details/',         v.book_details,        name='book_details'),

    # ── Admin pages ───────────────────────────────────────────────────────────
    path('adminhome/',            v.admin_home,          name='adminhome'),
    path('admindashboard/', include('admindashboard.urls')),  
    path('available_book_admin/', v.available_book_admin, name='available_book_admin'),
    path('add/',                  v.add_book,            name='add'),
    path('book_details_admin/',   v.book_details_admin,  name='book_details_admin'),
    #--------------
    path('api/books/', main_views.api_books_list, name='api_books_list'),
    path('api/book/<int:book_id>/', main_views.api_book_detail, name='api_book_detail'),

     # ── Borrowed Books APIs ───────────────────────────────────────────────────
    path('api/borrowed-books/', borrowed_views.api_borrowed_books, name='api_borrowed_books'),
    path('api/return-book/<int:borrow_id>/', borrowed_views.api_return_book, name='api_return_book'),
    path('api/return-all-books/', borrowed_views.api_return_all_books, name='api_return_all_books'),

    path('api/borrow-book/<int:book_id>/', main_views.api_borrow_book, name='api_borrow_book'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



