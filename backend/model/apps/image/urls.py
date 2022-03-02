from django.urls import path

from .views import ImageView

app_name = "images"

urlpatterns = [
    path('image/', ImageView.as_view()),
    path('image/get_d', ImageView.get_detail())
]
