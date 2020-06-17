from django.test import TestCase
from E_gzamin_app.models import *
from django.contrib.auth.models import User


GROUP_MEMBERS = 10

# Create your tests here.
class QuestionTestCase(TestCase):
    def setUp(self):
        self.users = []
        self.users.append(User.objects.create_user(username='tests@egzamin.com', password='testpassword'))
        self.users.append(User.objects.create_user(username='tests2@egzamin.com', password='test2password'))
        self.contents = ["test1", "test2", "test3", "test4"]
        for content in self.contents:
            Question.objects.create(content=content, owner=self.users[0])
        for content in self.contents:
            Question.objects.create(content=content, owner=self.users[1])

    def test_get_questions(self):
        questions = Question.objects.filter(owner=User.objects.get(username='tests@egzamin.com'))
        for i in range(len(questions)):
            self.assertEqual(questions[i].content, self.contents[i])

    def test_user_questions(self):
        questions = Question.objects.filter(owner=User.objects.get(username='tests@egzamin.com'))
        self.assertEqual(len(questions), 4)


class AnswersTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(username='tests@egzamin.com', password='testpassword')
        self.question = Question.objects.create(content="test1",
                                                owner=user)
        Answer.objects.create(content="Yup", isCorrect=True, question=self.question)

    def test_answer_for_question(self):
        answers = Answer.objects.filter(question=self.question)[0]
        self.assertEqual(answers.content, "Yup")


class GroupsMembersTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='tests@egzamin.com', password='testpassword')
        self.group = Group.objects.create(name="Test Group1",
                                          groupCode="test1",
                                          owner=self.user)
        self.create_group(GROUP_MEMBERS)
        # print("number of members in a group: {}".format(len(Group.objects.filter(name="Test Group1")[0].members)))

    def create_group(self, how_many):
        self.users = []
        for i in range(how_many):
            self.users.append(User.objects.create_user(username='tests'+str(i)+'@egzamin.com',
                                                       password='test'+str(i)+'password'))

    def test_members(self):
        group = Group.objects.filter(name="Test Group1")[0]
        self.assertEqual(group.owner, self.user)
