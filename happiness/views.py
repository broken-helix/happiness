from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import get_user_model
from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect
from django.urls import reverse_lazy
from django.http import JsonResponse
from django.views import generic
import random
from .forms import PostForm
from .models import Post
from django.shortcuts import render


class HomeView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.all()
        context['user'] = self.request.user
        return context
    
    def post(self, request):
        post_id = request.POST.get('post_id')
        post = get_object_or_404(Post, pk=post_id)
        if request.user.is_authenticated:
            if post.likes.filter(id=request.user.id).exists():
                post.likes.remove(request.user)
                messages.info(request, "Post unliked!")
            else:
                post.likes.add(request.user)
                messages.success(request, "Post liked!")
        else:
            messages.error(request, "You need to be logged in to like a post.")
        return redirect('allposts')


class AddPostPage(generic.CreateView):
    """
    Allows a logged-in user to create a new blog post.
    """

    form_class = PostForm
    template_name = "form.html"
    success_url = reverse_lazy('post_success')

    def form_valid(self, form):
        User = get_user_model()
        if self.request.user.is_authenticated:
            form.instance.author = self.request.user
        else:
            form.instance.author = User.objects.get_or_create(username='anonymous')[0]
        response = super().form_valid(form)
        messages.success(
            self.request,
            "Post created successfully! Review in progress!")
        return response

    def form_invalid(self, form):
        response = super().form_invalid(form)
        messages.error(
            self.request,
            "Post creation failed. Please check your input.")
        return response

class PostSuccessPage(generic.TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.all()
        return context

class AboutView(TemplateView):
    template_name = 'about.html'

    def get_context_data(self, **kwargs):
        team_members = [
            {'name': 'Darrach', 'photo': 'images/darrach.jpeg', 'happiness': 'Darrach likes to...'},
            {'name': 'James', 'photo': 'images/james.jpeg', 'happiness': 'I like to....'},
            {'name': 'Thomas', 'photo': 'images/thomas.jpeg', 'happiness': 'I like to.....'},
            {'name': 'Alina', 'photo': 'images/teo-alina.png', 'happiness': 'I like to.....'},
            {'name': 'Fergal', 'photo': 'images/fergal.jpeg', 'happiness': 'I like to.....'},
            {'name': 'Stefan', 'photo': 'images/stefan.png', 'happiness': 'I like to.....'},
            {'name': 'Elvis', 'photo': 'images/elvis.jpeg', 'happiness': 'I like to.....'},
            {'name': 'Monica', 'photo': 'images/monica.png', 'happiness': 'I like to.....'},
        ]

        context = super().get_context_data(**kwargs)
        context['team_members'] = team_members
        return context
    
class AllPostsView(TemplateView):
    template_name = 'allposts.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.all()  # Fetch all posts
        return context


class RandomPostView(TemplateView):
    template_name = 'random_posts.html'

    def generate_random_post(self):
        all_posts = Post.objects.all()
        random_post = random.choice(all_posts)
        return random_post

    def post(self, request, *args, **kwargs):
        random_post = self.generate_random_post()
        return JsonResponse({
            'title': random_post.title,
            'emoji': random_post.emoji,
            'author': random_post.author.username,
        })