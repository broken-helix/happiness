from django.urls import path
from .views import HomeView, AddPostPage, PostSuccessPage, AboutView, RandomPostView, AllPostsView

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("form", AddPostPage.as_view(), name="add_post"),
    path("post-success", PostSuccessPage.as_view(), name="post_success"),
    path("about/", AboutView.as_view(), name="about"),
    path('random-posts/', RandomPostView.as_view(), name='random_posts'),
    path("allposts", AllPostsView.as_view(), name="allposts"),
]

