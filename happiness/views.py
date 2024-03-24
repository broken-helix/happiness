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


class AboutView(TemplateView):
    template_name = 'about.html'

    def get_context_data(self, **kwargs):
        team_members = [
            {
                'name': 'Darrach',
                'photo': 'images/darrach.jpeg',
                'role': 'Emojis & Filters',
                'happiness': 'Darrach likes to...',
                'linkedin': 'https://www.linkedin.com/in/darrach-barneveld-2b493511b/',
                'github': 'https://github.com/DarrachBarneveld'
            },
            {
                'name': 'James',
                'photo': 'images/james.jpeg',
                'role': 'Scrum Manager',
                'happiness': 'I like to get out clearing up litter to make me feel happier',
                'linkedin': '/',
                'github': '/'
            },
            {
                'name': 'Thomas',
                'photo': 'images/thomas.jpeg',
                'role': 'Troubleshooter & Navigation',
                'happiness': 'I like to.....',
                'linkedin': '/',
                'github': '/'
            },
            {
                'name': 'Alina',
                'photo': 'images/teo-alina.png',
                'role': 'Hack Generator',
                'happiness': 'I find happiness in the simple pleasures of life, like soaking up the warmth of the sun, enjoying the beauty of nature, good beer, surrounding myself with positive people, and sharing laughter through jokes and good company.',
                'linkedin': '/',
                'github': '/'
            },
            {
                'name': 'Monica',
                'photo': 'images/monica.png',
                'role': 'Team Page',
                'happiness': 'It brings me joy to assist others and see the happiness I can bring into their lives.',
                'linkedin': 'https://www.linkedin.com/in/monica-iancu-362825137/',
                'github': 'https://github.com/Monicaular'
            },
            {
                'name': 'Fergal',
                'photo': 'images/fergal.jpeg',
                'role': 'Styles',
                'happiness': 'I like to.....',
                'linkedin': '/',
                'github': '/'
            },
            {
                'name': 'Stefan',
                'photo': 'images/stefan-ruppe.png',
                'role': 'Styles',
                'happiness': 'I like to.....',
                'linkedin': '/',
                'github': '/'
            },
            {
                'name': 'Elvis',
                'photo': 'images/elvis.jpeg',
                'role': 'README.md',
                'happiness': 'I like to.....',
                'linkedin': '/',
                'github': '/'
            },
        ]

        context = super().get_context_data(**kwargs)
        context['team_members'] = team_members
        return context
 
class AllPostsView(TemplateView):
    template_name = 'allposts.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        posts = Post.objects.all()
        context['posts'] = posts

        emojis = set()
        for post in posts:
            for emoji in post.emoji:
                emojis.add(emoji)
        context['emojis'] = emojis

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