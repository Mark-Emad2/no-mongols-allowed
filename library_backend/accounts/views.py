from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenSerializer


# ── Login (returns is_admin so JS knows where to redirect) ───────────────────
class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer


# ── Sign Up ───────────────────────────────────────────────────────────────────
@api_view(['POST'])
def register(request):
    email    = request.data.get('email')
    password = request.data.get('password')
    name     = request.data.get('firstName')

    if not email or not password or not name:
        return Response({'error': 'All fields are required'}, status=400)

    if User.objects.filter(username=email).exists():
        return Response({'error': 'User already exists'}, status=400)

    User.objects.create_user(
        username=email,
        email=email,
        password=password,
        first_name=name
    )
    return Response({'message': 'Account created!'}, status=201)


# ── Forgot Password ───────────────────────────────────────────────────────────
@api_view(['POST'])
def forgot_password(request):
    email = request.data.get('email')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'Email not registered'}, status=404)

    token      = default_token_generator.make_token(user)
    reset_link = f"http://127.0.0.1:8000/reset/?uid={user.id}&token={token}"

    send_mail(
        subject='Reset your password',
        message=f'Click this link to reset your password:\n{reset_link}',
        from_email='noreply@library.com',
        recipient_list=[email],
    )
    return Response({'message': 'Reset email sent!'})


# ══════════════════════════════════════════════════════════════════════════════
# PAGE VIEWS — serve HTML templates
# ══════════════════════════════════════════════════════════════════════════════

# ── Public pages ──────────────────────────────────────────────────────────────
def main_page_public(request):
    return render(request, 'MainPage.html')

def login_page(request):
    return render(request, 'Login.html')

def signup_page(request):
    return render(request, 'CAACC.html')

def reset_page(request):
    return render(request, 'ResetThePass.html')


# ── User pages ────────────────────────────────────────────────────────────────
def main_page(request):
    return render(request, 'main.html')

def available_books_user(request):
    return render(request, 'available_books_user.html')

def borrowed_books(request):
    return render(request, 'borrowed_books.html')

def book_details(request):
    return render(request, 'book_details.html')


# ── Admin pages ───────────────────────────────────────────────────────────────
def admin_home(request):
    return render(request, 'AdminMain.html')

def admin_dashboard(request):
    return render(request, 'admindashboard.html')

def available_book_admin(request):
    return render(request, 'available_book_admin.html')

def add_book(request):
    return render(request, 'add.html')

def book_details_admin(request):
    return render(request, 'book_details_Admin.html')