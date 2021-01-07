from django.urls import path
from .views import AuthURL, spotify_callback, IsAuthenicated

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenicated.as_view())
]