from rest_framework import routers
from E_gzamin_app.views import *
from rest_framework_extensions.routers import NestedRouterMixin

class NestedDefaultRouter(NestedRouterMixin, routers.DefaultRouter):
    pass

router = NestedDefaultRouter()
router.register(r'answers', AnswerViewSet)
router.register(r'users', UserViewSet)
router.register(r'designates', DesignateViewSet)

questions_router = router.register(r'questions', QuestionViewSet)
questions_router.register('answers', AnswerViewSet, basename='question-answers', parents_query_lookups=['question'])
questions_router.register('courses', CoursesViewSet ,basename='question-courses', parents_query_lookups=['question'])

courses_router = router.register(r'courses', CoursesViewSet)
courses_router.register('questions', QuestionViewSet,basename='course-questions',parents_query_lookups=['courses'])

groups_router = router.register(r'groups', GroupViewSet)
groups_router.register('members', MemberViewSet, basename='group-members',parents_query_lookups=['is_member_of'])
groups_router.register('designates', DesignateViewSet, basename='group-designates', parents_query_lookups=['group'])

testresult_router = router.register(r'testresults', TestResultViewSet)
testresult_testtemplate_router = testresult_router.register(r'testtemplate', TestTemplateViewSet,basename='testresults-testtemplate',parents_query_lookups=['testresult'])
testresult_testtemplate_questions_router = testresult_testtemplate_router.register(r'questions',QuestionViewSet,basename='testresults-testtemplate-question',parents_query_lookups=['testtemplate__testresult','testtemplate'])
testresult_testtemplate_questions_router.register(r'answers',AnswerUserViewSet,basename='testresults-testtemplate-question-answers',parents_query_lookups=['question__testtemplate__testresult','question__testtemplate','question'])

testtemplates_router = router.register(r'testtemplates', TestTemplateViewSet)
testtemplates_router.register('questions',QuestionViewSet,basename='testtemplate-questions',parents_query_lookups=['testtemplate'])
testtemplates_router.register(r'testresults', TestResultViewSet,basename='testtemplate-testresults',parents_query_lookups=['testTemplate'])
testtemplates_router.register('designates',DesignateViewSet,basename='testtemplate-designates',parents_query_lookups=['testTemplate'])