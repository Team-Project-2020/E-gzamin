from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from E_gzamin_app.models import *
from E_gzamin_app.serializers import *
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework_extensions.mixins import NestedViewSetMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class AnswerViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)

    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_superuser:
            return qs
        qs2 = Answer.objects.filter(question__in=Question.objects.filter(owner=self.request.user.id))
        lst = [x  for x in qs for y in qs2 if x==y]
        return lst

    def retrieve(self, request, pk=None):
        qs = super().get_queryset()
        answer = get_object_or_404(qs, pk=pk)
        serializer = AnswerSerializer(answer, context={'request': request})
        return Response(serializer.data)

    def update(self, request, pk=None):
        qs = super().get_queryset()
        answer = get_object_or_404(qs, pk=pk)
        answer.content = request.data.get("content", answer.content)
        answer.isCorrect = request.data.get("isCorrect", answer.isCorrect)
        answer.save()
        serializer = AnswerSerializer(answer, context={'request': request})
        return Response(serializer.data)

class QuestionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_superuser:
            return qs
        return qs.filter(owner=self.request.user.id)

class CoursesViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)

    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_superuser:
            return qs
        return qs.filter(owner=self.request.user.id)
