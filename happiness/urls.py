from django.urls import path
from .views import HomeView, AddPostPage

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("form", AddPostPage.as_view(), name="add_post"),
]
