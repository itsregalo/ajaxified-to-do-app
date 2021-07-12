from django.urls import path
from .views import IndexView, TaskCompleteView, TaskDeleteView

app_name = 'tasks'

urlpatterns = [
    path('home/', IndexView, name='index'),
    path('home/<int:id>/completed/', TaskCompleteView, name='task-complete'),
    path('home/<int:id>/delete/', TaskDeleteView, name='task-delete'),
]