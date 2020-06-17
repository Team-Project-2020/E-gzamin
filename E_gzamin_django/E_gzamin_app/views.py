from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from E_gzamin_app.models import *
from E_gzamin_app.serializers import *
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework_extensions.mixins import NestedViewSetMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action


class AnswerViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)

    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_superuser:
            return qs
        qs2 = Answer.objects.filter(question__in=Question.objects.filter(owner=self.request.user.id))
        lst = [x for x in qs for y in qs2 if x == y]
        return lst

    def retrieve(self, request, pk=None):
        qs = self.get_queryset()
        answer = get_object_or_404(qs, pk=pk)
        serializer = AnswerSerializer(answer, context={'request': request})
        return Response(serializer.data)

    def update(self, request, pk=None):
        qs = self.get_queryset()
        answer = get_object_or_404(qs, pk=pk)
        answer.content = request.data.get("content", answer.content)
        answer.isCorrect = request.data.get("isCorrect", answer.isCorrect)
        answer.save()
        serializer = AnswerSerializer(answer, context={'request': request})
        return Response(serializer.data)


class CoursesViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)

    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_superuser:
            return qs
        return qs.filter(owner=self.request.user.id)


class GroupViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_superuser:
            return qs
        qs = Group.objects.filter(members__in=User.objects.filter(id=self.request.user.id))
        return qs

    @action(detail=False, methods=['patch'])
    def add_user(self, request, pk=None):
        group = get_object_or_404(Group.objects.all(), groupCode=request.data.get('groupCode'))
        if self.request.user.is_superuser:
            group.members.add(User.objects.get(username=request.data.get('username')))
            group.save()
            return Response({'status': 'user added'})
        group.members.add(User.objects.get(id=self.request.user.id))
        group.save()
        return Response({'status': 'user added'})


class QuestionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_superuser:
            return qs
        return qs.filter(owner=self.request.user.id)

    def retrieve(self, request, pk=None):
        qs = self.get_queryset()
        question = get_object_or_404(qs, pk=pk)
        serializer = QuestionSerializer(question, context={'request': request})
        return Response(serializer.data)

    def update(self, request, pk=None):
        qs = self.get_queryset()
        question = get_object_or_404(qs, pk=pk)
        question.content = request.data.get("content", question.content)
        question.save()
        serializer = QuestionSerializer(question, context={'request': request})
        return Response(serializer.data)

class MemberViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        group = self.request.query_params.get('group', None)
        if group is not None:
            return User.objects.filter(is_member_of__in=[group])
        qs = User.objects.filter(is_member_of__in=Group.objects.filter(members__in=[self.request.user.id]))
        return qs