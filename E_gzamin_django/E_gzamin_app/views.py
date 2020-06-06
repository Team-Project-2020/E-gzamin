from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from E_gzamin_app.models import *
from E_gzamin_app.serializers import *
from rest_framework import viewsets

class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Answer.objects.all()
        return Answer.objects.filter(owner=self.request)