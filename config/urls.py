from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from model.apps.bin import views as binModel
from model.apps.image import views as imageModel
from model.apps.tag import views as tagModel
from django.views.generic import TemplateView

router = routers.DefaultRouter()

router.register(r'bin', binModel.BinView)
router.register(r'image', imageModel.ImageView)
router.register(r'tag', tagModel.TagView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', include('model.common.base.api.urls')),
    re_path('.*',TemplateView.as_view(template_name='index.html'))
]
