"""Models"""

from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify


# Create your models here.

class Tag(models.Model):
    """
    Model to represent a tag.

    """

    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        """Return a string representation of the object (the tag's name)."""

        return str(self.name)

class Post(models.Model):
    """
    Model to represent a blog article.

    This model represents a blog article with various
    attributes such as title, author, content, and likes.
    """

    title = models.CharField(max_length=200, unique=True,)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    slug = models.SlugField(max_length=200, unique=True)
    emoji = models.CharField(default="😀", max_length=200,)
    created_on = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField(Tag)
    likes = models.ManyToManyField(User, related_name="post_likes", blank=True)

    class Meta:
        """To display the posts by created_on in ascending order"""

        ordering = ["-created_on"]

    def __str__(self):
        """Return a string representation of the object (the post's title)."""

        return f"{self.title}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    
    def user_has_liked(self, user):
        return self.likes.filter(id=user.id).exists()

    def number_of_likes(self):
        return self.likes.count()
