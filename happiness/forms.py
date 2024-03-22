"""Forms"""
from django import forms
from django.contrib.auth.models import User
from .models import Post

class PostForm(forms.ModelForm):
    """
    A form for creating happiness posts.

    """

    class Meta:
        """Get post model, choose fields to display"""

        model = Post
        fields = ["title", "author", "slug", "content", "emoji"]
