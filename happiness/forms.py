"""Forms"""
from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    """
    A form for creating happiness posts.

    """

    class Meta:
        """Get post model, choose fields to display"""

        model = Post
        fields = ["title", "emoji"]
