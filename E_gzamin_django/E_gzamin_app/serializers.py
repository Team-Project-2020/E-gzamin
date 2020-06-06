from rest_framework import serializers

from E_gzamin_app.models import *

class BaseEntitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BaseEntity
        fields = ('createdAt','removedAt')

class AnswerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Answer
        fields = ('content','isCorrect')

class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course