from django.urls import path
from .views import HomeView, AddPostPage, PostSuccessPage, AboutView, AllPostsView

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("form", AddPostPage.as_view(), name="add_post"),
    path("post-success", PostSuccessPage.as_view(), name="post_success"),
    path("about/", AboutView.as_view(), name="about"),
    path("allposts", AllPostsView.as_view(), name="allposts"),
]
