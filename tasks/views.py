from django.shortcuts import redirect, render
from .forms import TaskForm
from .models import Task
from django.views.generic import View

from django.http import JsonResponse
from django.forms.models import model_to_dict

# Create your views here.

def IndexView(request, *args, **kwargs):
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            new_task = form.save()
            return JsonResponse({'task':model_to_dict(new_task)}, status=200)
        return redirect('tasks:index')
        
    form = TaskForm()
    tasks = Task.objects.all()
    context = {
        'form':form,
        'tasks':tasks
    }
    return render(request, 'index.html', context)

def CreateTask(request, *args, **kwargs):
    form = TaskForm()

"""
class IndexView(View):
    def get(self, request):
        form = TaskForm()
        tasks = Task.objects.all()
        context = {
            'form':form,
            'tasks':tasks
        }
        return render(request, 'index.html', context)

    def post(self, request):
        form = TaskForm(request.POST)
        if form.is_valid():
            new_task = form.save()
            return redirect('tasks:index')
        return redirect('tasks:index')

"""


