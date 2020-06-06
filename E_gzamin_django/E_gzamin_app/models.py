from django.db import models
from django.conf import settings


class BaseEntity(models.Model):
    class Meta:
        abstract = True
    createdAt = models.DateTimeField(auto_now_add=True)
    removedAt = models.DateTimeField(null=True)


class Answer(BaseEntity):
    content = models.TextField()
    isCorrect = models.BooleanField()
    question = models.ForeignKey("Question", on_delete=models.CASCADE)


class Course(BaseEntity):
    name = models.CharField(max_length=64)


class Designate(models.Model):
    time = models.TimeField()
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    passReq = models.DecimalField(max_digits=3, decimal_places=2)
    group = models.ForeignKey("Group", on_delete=models.CASCADE)
    testTemplate = models.ForeignKey("TestTemplate", on_delete=models.CASCADE)


class Group(BaseEntity):
    name = models.CharField(max_length=64)
    groupCode = models.CharField(max_length=16)
    openedAt = models.DateTimeField(null=True)
    closedAt = models.DateTimeField(null=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE,
                              related_name="owner")
    users = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                   related_name="users")


class Question(BaseEntity):
    content = models.TextField()
    questionTemplates = models.ManyToManyField("QuestionTemplate")
    subjects = models.ManyToManyField("Subject")
    courses = models.ManyToManyField("Course")


class QuestionTemplate(BaseEntity):
    questionsCount = models.IntegerField()
    testTemplate = models.ForeignKey("TestTemplate", on_delete=models.DO_NOTHING)


class Subject(BaseEntity):
    name = models.CharField(max_length=64)


class TestResult(BaseEntity):
    result = models.DecimalField(max_digits=5, decimal_places=2)
    maxPoints = models.DecimalField(max_digits=5, decimal_places=2)
    isPassed = models.BooleanField()
    completedAt = models.DateTimeField()
    startedAt = models.DateTimeField()
    finishedAt = models.DateTimeField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    testTemplate = models.ForeignKey("TestTemplate", on_delete=models.DO_NOTHING)
    answers = models.ManyToManyField(Answer)
    questions = models.ManyToManyField(Question)


class TestTemplate(BaseEntity):
    name = models.CharField(max_length=64)
    owned_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    questions = models.ManyToManyField(Question)

