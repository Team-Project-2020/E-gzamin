from rest_framework import routers
from E_gzamin_app.views import *
from rest_framework_extensions.routers import NestedRouterMixin

class NestedDefaultRouter(NestedRouterMixin, routers.DefaultRouter):
    pass

router = NestedDefaultRouter()
router.register(r'answers', AnswerViewSet)
router.register(r'users', UserViewSet)
router.register(r'testresults', TestResultViewSet)
router.register(r'designates', DesignateViewSet)

questions_router = router.register(r'questions', QuestionViewSet)
questions_router.register('answers',AnswerViewSet,basename='question-answers',parents_query_lookups=['question'])

courses_router = router.register(r'courses', CoursesViewSet)
courses_router.register('questions', QuestionViewSet,basename='course-questions',parents_query_lookups=['courses'])

groups_router = router.register(r'groups', GroupViewSet)
groups_router.register('members', MemberViewSet, basename='group-members',parents_query_lookups=['groups'])
groups_router.register('designates', DesignateViewSet, basename='group-designates', parents_query_lookups=['group'])

testtemplates_router = router.register(r'testtemplates', TestTemplateViewSet)
testtemplates_router.register('questions',QuestionViewSet,basename='testtemplate-questions',parents_query_lookups=['testtemplate'])
testtemplates_router.register(r'testresults', TestResultViewSet,basename='testtemplate-testresults',parents_query_lookups=['testTemplate'])
testtemplates_router.register('designates',DesignateViewSet,basename='testtemplate-designates',parents_query_lookups=['testTemplate'])