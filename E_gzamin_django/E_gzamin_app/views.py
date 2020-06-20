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
        owned  = self.request.query_params.get('owned', None)
        if self.request.user.is_superuser:
            return qs
        if owned == 'True' or owned == 'true':
            print("elo")
            return qs.filter(owner=self.request.user.id)
        return qs.filter(members__in=User.objects.filter(id=self.request.user.id))

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

class TestTemplateViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = TestTemplate.objects.all()
    serializer_class = TestTemplateSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_superuser:
            return qs
        return qs.filter(owned_by=self.request.user.id)

    def retrieve(self, request, pk=None):
        qs = self.get_queryset()
        template = get_object_or_404(qs, pk=pk)
        serializer = TestTemplateSerializer(template, context={'request': request})
        return Response(serializer.data)

    def update(self, request, pk=None):
        qs = self.get_queryset()
        template = get_object_or_404(qs, pk=pk)
        if request.data.get("questions", None):
            template.questions.clear()
            for question_id in list(request.data['questions'].split(',')):
                if question_id in Questions.objects.filter(owner=self.request.user.id):
                    template.questions.add(question_id)
        template.name = request.data.get("name", template.name) #it basicly does a tenary on existance of this "field" - if request.data has a filed "filed" then variable is equal to first parameter else secound
        template.save()
        serializer = TestTemplateSerializer(template, context={'request': request})
        return Response(serializer.data)

class TestResultViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = TestResult.objects.all()
    serializer_class = TestResultSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if self.basename == 'testtemplate-testresults':
            if self.request.user.is_superuser:
                return qs
            return qs.filter(testTemplate__in=TestTemplate.objects.filter(owned_by_id=self.request.user.id))
        if self.request.user.is_superuser:
            return qs
        return qs.filter(user=self.request.user.id)

    def retrieve(self, request, pk=None):
        qs = self.get_queryset()
        result = get_object_or_404(qs, pk=pk)
        serializer = TestTemplateSerializer(result, context={'request': request})
        return Response(serializer.data)


class DesignateViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Designate.objects.all()
    serializer_class = DesignateSerializer

    def get_queryset(self):
        owned  = self.request.query_params.get('owned', None)
        qs = super().get_queryset()
        if owned == 'True' or owned == 'true' or (id is not None):
            if self.request.user.is_superuser:
                return qs
            return qs.filter(group__in=Group.objects.filter(owner=self.request.user.id))
        return qs.filter(group__in=Group.objects.filter(members__in=[self.request.user.id]))

    def retrieve(self, request, pk=None):
        qs = self.get_queryset()
        designate = get_object_or_404(qs, pk=pk)
        serializer = DesignateSerializer(designate, context={'request': request})
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        group_id = request.data.get("group_id", None)
        group = Group.objects.get(id=group_id)
        testTemplate_id = request.data.get("testTemplate_id", None)
        testTemplate = TestTemplate.objects.get(id=testTemplate_id)
        if group in Group.objects.filter(owner=self.request.user.id) and testTemplate in TestTemplate.objects.filter(owned_by=self.request.user.id):
            serializer.validated_data['group'] = group
            serializer.validated_data['testTemplate'] = testTemplate
            serializer.validated_data['group_id'] = group_id
            serializer.validated_data['testTemplate_id'] = testTemplate_id
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, pk=None):
        qs = self.get_queryset()
        designate = get_object_or_404(qs, pk=pk)
        if designate.group in Group.objects.filter(owner=self.request.user.id):
            group = request.data.get("group", designate.group)
            test = request.data.get("testTemplate", designate.testTemplate)
            if group in Group.objects.filter(owner=self.request.user.id) and test in TestTemplate.objects.filter(owned_by=self.request.user.id):
                designate.time = request.data.get("time", designate.time)
                designate.startDate = request.data.get("startDate", designate.startDate)
                designate.endDate = request.data.get("endDate", designate.endDate)
                designate.passReq = request.data.get("passReq", designate.passReq)
                group_id = request.data.get("group_id", designate.group.id)
                designate.group = Group.objects.get(id=group_id)
                testTemplate_id = request.data.get("testTemplate_id", designate.testTemplate.id)
                designate.testTemplate = TestTemplate.objects.get(id=testTemplate_id)
                designate.save()
                serializer = DesignateSerializer(designate, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
        serializer = DesignateSerializer(designate, context={'request': request})
        return Response(serializer.data, status=status.HTTP_403_FORBIDDEN)