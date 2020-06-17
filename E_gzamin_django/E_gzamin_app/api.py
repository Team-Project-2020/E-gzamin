from rest_framework import routers
from E_gzamin_app.views import *
from rest_framework_extensions.routers import NestedRouterMixin

class NestedDefaultRouter(NestedRouterMixin, routers.DefaultRouter):
    pass

router = NestedDefaultRouter()
router.register(r'answers', AnswerViewSet)
router.register(r'users', MemberViewSet)
router.register(r'testresults', TestResultViewSet)
router.register(r'designate', DesignateViewSet)

questions_router = router.register(r'questions', QuestionViewSet)
questions_router.register('answers',AnswerViewSet,basename='question-answers',parents_query_lookups=['question'])

courses_router = router.register(r'courses', CoursesViewSet)
courses_router.register('questions', QuestionViewSet,basename='course-questions',parents_query_lookups=['courses'])

groups_router = router.register(r'groups', GroupViewSet)
groups_router.register('members', MemberViewSet, basename='group-members',parents_query_lookups=['groups'])

testtemplates_router = router.register(r'testtemplates', TestTemplateViewSet)
testtemplates_router.register('question',QuestionViewSet,basename='testtemplate-questions',parents_query_lookups=['testtemplates'])