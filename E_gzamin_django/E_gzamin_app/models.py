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
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


class Designate(models.Model):
    time = models.IntegerField(default=60)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    passReq = models.DecimalField(max_digits=3, decimal_places=2)
    group = models.ForeignKey("Group", on_delete=models.CASCADE)
    testTemplate = models.ForeignKey("TestTemplate", on_delete=models.CASCADE)


class Group(BaseEntity):
    name = models.CharField(max_length=64)
    groupCode = models.CharField(max_length=16, unique=True)
    openedAt = models.DateTimeField(null=True)
    closedAt = models.DateTimeField(null=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE,
                              related_name="owner")
    members = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                     related_name="is_member_of",
                                     blank=True)


class Question(BaseEntity):
    content = models.TextField()
    courses = models.ManyToManyField("Course")
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


class TestResult(BaseEntity):
    result = models.DecimalField(max_digits=5, decimal_places=2)
    maxPoints = models.DecimalField(max_digits=5, decimal_places=2)
    isPassed = models.BooleanField()
    startedAt = models.DateTimeField()
    finishedAt = models.DateTimeField(null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    testTemplate = models.ForeignKey("TestTemplate", on_delete=models.DO_NOTHING)


class TestTemplate(BaseEntity):
    name = models.CharField(max_length=64)
    owned_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    questions = models.ManyToManyField(Question)
