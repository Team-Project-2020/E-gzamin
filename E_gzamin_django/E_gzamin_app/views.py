from datetime import datetime
from pprint import pprint

from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from E_gzamin_app.models import *
from E_gzamin_app.serializers import *
from django.shortcuts import get_object_or_404
from django.db.models import Q
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
        qs2 = qs.distinct().filter(question__in=Question.objects.filter(owner=self.request.user.id))
        return qs2

    def retrieve(self, request, pk=None):
        qs = self.get_queryset()
        answer = get_object_or_404(qs, pk=pk)
        serializer = AnswerSerializer(answer, context={'request': request})
        return Response(serializer.data)

    def create(self, request):
        answer = Answer(
            content=self.request.data.get('content'),
            isCorrect=self.request.data.get('isCorrect'),
            question=Question.objects.get(pk=self.request.data.get('question'))
        )
        answer.save()
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

class AnswerUserViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)

    queryset = Answer.objects.all()
    serializer_class = AnswerUserSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs

    def retrieve(self, request, pk=None):
        qs = self.get_queryset()
        answer = get_object_or_404(qs, pk=pk)
        serializer = AnswerSerializer(answer, context={'request': request})
        return Response(serializer.data)

    def create(self, request):
        if Question.objects.get(self.request.data.get('question')).owner == self.request.user:
            answer = Answer(
                content=self.request.data.get('content'),
                isCorrect=self.request.data.get('isCorrect'),
                question=Question.objects.get(pk=self.request.data.get('question'))
            )
            answer.save()
        serializer = AnswerSerializer(answer, context={'request': request})
        return Response(serializer.data)


    def update(self, request, pk=None):
        qs = self.get_queryset()
        answer = get_object_or_404(qs, pk=pk)
        if answer.question.owner == self.request.user:
            answer.content = request.data.get("content", answer.content)
            answer.isCorrect = request.data.get("isCorrect", answer.isCorrect)
            answer.save()
        serializer = AnswerUserSerializer(answer, context={'request': request})
        return Response(serializer.data)



class CoursesViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_superuser:
            return qs
        return qs#.distinct().filter(owner=self.request.user.id)

    def retrieve(self, request, pk=None):
        course = self.get_queryset().get(pk=pk)
        serializer = CourseSerializer(course, context={'request': request})
        return Response(serializer.data)

    def create(self, request):
        course = Course(
            name=self.request.data.get('name'),
            owner=self.request.user
        )
        course.save()
        serializer = CourseSerializer(course, context={'request': request})
        return Response(serializer.data)

    def update(self, request, pk=None):
        qs = self.get_queryset()
        course = get_object_or_404(qs, pk=pk)
        course.content = request.data.get("name", course.name)
        course.save()
        serializer = CourseSerializer(course, context={'request': request})
        return Response(serializer.data)


class GroupViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        owned = self.request.query_params.get('owned', None)
        if self.request.user.is_superuser:
            return qs
        if owned == 'True' or owned == 'true':
            return qs.distinct().filter(owner=self.request.user.id)
        if owned == 'False' or owned == 'false':
            return qs.distinct().filter(Q(members__in=User.objects.filter(id=self.request.user.id)))
        return qs.distinct().filter(Q(members__in=User.objects.filter(id=self.request.user.id)) | Q(owner=self.request.user.id))

    def update(self, request, pk=None):
        qs = self.get_queryset()
        group = get_object_or_404(qs, pk=pk)
        if self.request.user.is_superuser or group.owner == self.request.user:
            super(GroupViewSet, self).update()
        else:
            serializer = GroupSerializer(group, context={'request': request})
            return Response(serializer.data, status=status.HTTP_403_FORBIDDEN)
        group.save()
        serializer = GroupSerializer(group, context={'request': request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        group = self.get_queryset().get(pk=pk)
        serializer = GroupSerializer(group, context={'request': request})
        return Response(serializer.data)

    def create(self, request):
        group = Group(
            name=request.data.get('name'),
            groupCode=request.data.get('groupCode'),
            owner=self.request.user
        )
        group.save()
        serializer = GroupSerializer(group, context={'request': request})
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        group = Group.objects.get(pk=pk)
        if not self.request.user.is_superuser and self.request.user != group.owner:
            return Response({'status': 'unauthorized deletion, prosze wypierdalac'})
        Designate.objects.filter(group=group).delete()
        group.delete()
        return Response({'status': 'group deleted'})

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

    @action(detail=True, methods=['get', 'delete'])
    def remove_user(self, request, pk=None):
        group = self.get_object()
        if self.request.user != group.owner:
            return Response({'status': 'unauthorized access'})
        user = get_object_or_404(User.objects.all(), id=request.query_params.get('id', None))
        if user not in group.members.all():
            return Response({'status': 'user not in group'})
        group.members.remove(user)
        group.save()
        return Response({'status': 'user deleted'})

    @action(detail=True, methods=['delete'])
    def leave_group(self, request, pk=None):
        group = self.get_object()
        if self.request.user not in group.members.all():
            return Response({'status': 'user not in group'})
        group.members.remove(self.request.user)
        group.save()
        return Response({'status': 'group left'})


class QuestionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_superuser:
            return qs
        if self.basename == 'testresults-testtemplate-question':
            return qs
        return qs.distinct().filter(owner=self.request.user.id)

    def retrieve(self, request, pk=None):
        qs = self.get_queryset()
        question = get_object_or_404(qs, pk=pk)
        serializer = QuestionSerializer(question, context={'request': request})
        return Response(serializer.data)

    def create(self, request):
        question = Question(
            content=self.request.data.get('content'),
            owner=self.request.user
        )
        question.save()
        if self.request.data.get('courses') is not None:
            for course in self.request.data.get('courses'):
                question.courses.add(course)
        serializer = QuestionSerializer(question, context={'request': request})
        return Response(serializer.data)

    def update(self, request, pk=None):
        qs = self.get_queryset()
        question = get_object_or_404(qs, pk=pk)
        question.content = request.data.get("content", question.content)
        if self.request.data.get('courses') is not None:
            question.courses.clear()
            for course in self.request.data.get('courses'):
                question.courses.add(course)
        question.save()
        serializer = QuestionSerializer(question, context={'request': request})
        return Response(serializer.data)

class MemberViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        if self.basename == 'group-members':
            return super().get_queryset()
        group = self.request.query_params.get('group', None)
        if group is not None:
            return User.objects.filter(is_member_of__in=[group])
        qs = User.objects.filter(is_member_of__in=Group.objects.filter(members__in=[self.request.user.id]))
        return qs

class UserViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        group = self.request.query_params.get('group', None)
        if group is not None:
            return User.objects.distinct().filter(is_member_of__in=[group])
        qs = User.objects.distinct().filter(Q(is_member_of__in=Group.objects.filter(members__in=[self.request.user.id])) |
                                            Q(pk=self.request.user.id))
        return qs

    def retrieve(self, request, pk=None):
        qs = self.get_queryset().all()
        pprint(qs)
        user = qs.get(id=pk)
        serializer = UserSerializer(
            user, context={'request': request})
        return Response(serializer.data)

    def create(self, request):
        user = User.objects.create_user(
            username=self.request.data.get('username'),
            password=self.request.data.get('password'),
            email=self.request.data.get('username'))
        return Response({'status': 'user registered'})

    @action(detail=False, methods=['get'])
    def me(self, request):
        user = self.get_queryset().get(pk=self.request.user.id)
        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data)

class TestTemplateViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = TestTemplate.objects.all()
    serializer_class = TestTemplateSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_superuser:
            return qs
        if self.basename == 'testresults-testtemplate':
            testtemp = qs.get()
            if(len(TestResult.objects.distinct().filter(Q(testTemplate=testtemp.id)).filter(Q(finishedAt=None)).filter(user=self.request.user)) > 0):
                return qs
        return qs.filter(owned_by=self.request.user.id)

    def retrieve(self, request, pk=None):
        qs = self.get_queryset()
        template = get_object_or_404(qs, pk=pk)
        serializer = TestTemplateSerializer(template, context={'request': request})
        return Response(serializer.data)

    def create(self, request):
        temp = TestTemplate(
            name=request.data.get('name'),
            owned_by=self.request.user
        )
        temp.save()
        for question in request.data.get('questions'):
            if Question.objects.filter(owner=self.request.user.id).filter(id=question):
                temp.questions.add(question)
        serializer = TestTemplateSerializer(temp, context={'request': request})
        return Response(serializer.data)


    def update(self, request, pk=None):
        qs = self.get_queryset()
        template = get_object_or_404(qs, pk=pk)
        if self.request.user == template.owned_by:
            if request.data.get("questions", None):
                template.questions.clear()
                for question_id in (request.data['questions']):
                    if Question.objects.filter(owner=self.request.user.id).filter(id=question_id):
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
            return qs.distinct().filter(testTemplate__in=TestTemplate.objects.filter(owned_by_id=self.request.user.id))
        if self.request.user.is_superuser:
            return qs
        return qs.distinct().filter(user=self.request.user.id)

    def create(self, request):
        des = Designate.objects.get(pk=self.request.data.get('designateId'))
        temp = TestTemplate.objects.get(pk=des.testTemplate.id)
        res = TestResult(
            testTemplate=temp,
            user=self.request.user,
            maxPoints=temp.questions.count(),
            result=0,
            isPassed=False,
            startedAt=datetime.now()
        )
        res.save()
        serializer = TestResultSerializer(res, context={'request': request})
        return Response(serializer.data)

    def update(self, request, pk=None):
        res = self.get_queryset().get(pk=pk)
        points = 0
        if res.finishedAt is not None:
            return Response(status=status.HTTP_403_FORBIDDEN)
        questions = self.request.data.get('questions')
        for qid in questions:
            is_correct = True
            question = Question.objects.get(pk=qid['questionId'])
            for answer in Answer.objects.filter(question=question):
                if answer.isCorrect and answer.id not in qid['answers']:
                    is_correct = False
                if not answer.isCorrect and answer.id in qid['answers']:
                    is_correct = False
            if is_correct:
                points += 1
        res.result = points
        if res.maxPoints > 0:
            res.isPassed = True if \
                points/res.maxPoints > Designate.objects.get(pk=self.request.data.get('designateId')).passReq else False
        else:
            res.isPassed = True
        res.finishedAt = datetime.now()
        res.save()
        serializer = TestResultSerializer(res, context={'request': request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        qs = self.get_queryset()
        result = get_object_or_404(qs, pk=pk)
        serializer = TestResultSerializer(result, context={'request': request})
        return Response(serializer.data)

class DesignateViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Designate.objects.all()
    serializer_class = DesignateSerializer

    def get_queryset(self):
        owned = self.request.query_params.get('owned', None)
        results = [x.testTemplate.id for x in TestResult.objects.distinct().filter(user=self.request.user.id)]
        qs = super().get_queryset()
        if owned == 'True' or owned == 'true' or (str(self.request.path_info) != '/rest/designates/') :
            if self.request.user.is_superuser:
                return qs
            return qs.distinct().filter(group__in=Group.objects.filter(owner=self.request.user.id))
        qs = qs.exclude(testTemplate_id__in=results)
        return qs.distinct()\
            .filter(group__in=Group.objects.filter(members__in=[self.request.user.id]))

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
