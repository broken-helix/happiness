from django.urls import path
from .views import HomeView, AddPostPage, PostSuccessPage

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("form", AddPostPage.as_view(), name="add_post"),
    path("post-success", PostSuccessPage.as_view(), name="post_success"),

]
