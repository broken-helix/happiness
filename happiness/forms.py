"""Forms"""
from django import forms
from .models import Post, Tag

class PostForm(forms.ModelForm):
    """
    A form for creating happiness posts.

    """

    tags = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Enter tags separated by commas'}),
        required=False,
    )

    class Meta:
        """Get post model, choose fields to display"""

        model = Post
        fields = ["title", "emoji", 'tags']

    def save(self, commit=True):
        instance = super().save(commit=False)

        if commit:
            instance.save()
            tags = self.cleaned_data['tags'].split(',')
            for tag_name in tags:
                tag, created = Tag.objects.get_or_create(name=tag_name.strip())
                instance.tags.add(tag)

        return instance
