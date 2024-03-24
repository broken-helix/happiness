from django.urls import path
from .views import HomeView, AddPostPage, AboutView, RandomPostView, AllPostsView

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("form", AddPostPage.as_view(), name="add_post"),
    path("about/", AboutView.as_view(), name="about"),
    path('random-posts/', RandomPostView.as_view(), name='random_posts'),
    path("all-posts", AllPostsView.as_view(), name="allposts"),
]
