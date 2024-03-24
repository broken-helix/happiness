"""Admin"""

from django.contrib import admin
from django.contrib.auth.models import User
from .models import Post, Tag

# Register your models here.

class PostInline(admin.TabularInline):
    """
    Inline representation of blog posts for the admin panel.

    """

    model = Post
    readonly_fields = ("created_on",)
    fields = ("title", "author", "emoji", 'created_on',)
    extra = 0


class UserAdmin(admin.ModelAdmin):
    """
    Admin model configuration for user accounts.

    This class defines the admin panel configuration for user accounts,
    allowing administrators to manage user information such as username,
    first name, last name, and email. It also includes an inline
    representation of user profiles using the `ProfileInline` class

    Example:
        To use this admin configuration for user accounts:

        admin.site.register(User, UserAdmin)

    """

    model = User
    fields = ("username", "first_name", "last_name", "email")
    inlines = [PostInline]

#  Register the UserAdmin class with the User model
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

class PostAdmin(admin.ModelAdmin):
    """
    Admin model configuration for user accounts.

    This class defines the admin panel configuration for user accounts,
    allowing administrators to manage user information such as username,
    first name, last name, and email. It also includes an inline
    representation of user profiles using the `ProfileInline` class

    Example:
        To use this admin configuration for user accounts:

        admin.site.register(User, UserAdmin)

    """

    model = Post
    readonly_fields = ("created_on",)
    fields = ("title", "author", "emoji", 'created_on', 'tags')


class TagAdmin(admin.ModelAdmin):
    """
    Admin model configuration for user accounts.

    This class defines the  admin panel configuration for user accounts,

    """


    model = Tag 
    fields = ("name",)

admin.site.register(Post, PostAdmin)
admin.site.register(Tag, TagAdmin)

