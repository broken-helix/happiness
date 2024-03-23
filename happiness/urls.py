from django.urls import path
from . import views

urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    path("form", views.AddPostPage.as_view(), name="add_post"),
]
