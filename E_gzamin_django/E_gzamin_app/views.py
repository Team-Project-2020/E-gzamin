from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from E_gzamin_app.models import *
from E_gzamin_app.serializers import *
from rest_framework import viewsets
from rest_framework_extensions.mixins import NestedViewSetMixin

class AnswerViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

class QuestionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class CoursesViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Course.objects.all()
        return Course.objects.filter(owner=self.request)