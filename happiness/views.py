from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import get_user_model
from django.contrib import messages
from django.views import generic
from .forms import PostForm

class HomeView(TemplateView):
    template_name = 'index.html'


class AddPostPage(generic.CreateView):
    """
    Allows a logged-in user to create a new blog post.
    """

    form_class = PostForm
    template_name = "form.html"
    success_url = "/"

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
