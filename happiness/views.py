from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views import generic
from .forms import PostForm
from .models import Post

class HomeView(TemplateView):
    template_name = 'index.html'


class AddPostPage(LoginRequiredMixin, generic.CreateView):
    """
    Allows a logged-in user to create a new blog post.

    Methods:
    - form_valid: Overrides the base method to set the post author to the
      currently logged-in user before saving the form.

    Mixins:
    - LoginRequiredMixin: Ensures that only authenticated users can access
      this view.
    """

    form_class = PostForm
    template_name = "form.html"
    success_url = "/"

    def form_valid(self, form):
        form.instance.author = self.request.user
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