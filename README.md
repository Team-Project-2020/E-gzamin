# E-gzamin
E-learning app for creating exams and tests

## Backend
Backend is managed by python framework Django, to run install all packages mentioned in requirements.txt and type

`python manage.py runserver`

## Frontend
Frontend is done in a javascript framework React, to run type

`npm install`

`npm start`

## Endpoints
* `admin/` - to enter administrator panel
* `rest/questions` - provides informations about questions
* `rest/questions/<int>` - provides informations about a specific question 
* `rest/questions/<int>/answers` - provides informations about answers for a given question
* `rest/answers` - provides informations about answers
* `rest/answers/<int>` - provides informations about a specific answer
* `rest/testresults` - provides informations about test results
* `rest/testresults/<int>` - provides informations about a specific test result
* `rest/testtemplate` - provides informations about test templates
* `rest/testtemplate/<int>` - provides informations about a given test template
* `rest/testtemplate/<int>/questions` - provides informations about questions available within a test template
* `rest/testtemplate/<int>/designates` - provides informations about designates assigned to a test template
* `rest/testtemplate/<int>/testresults` - provides informations about results for all the people that solved the test
* `rest/courses` - provides informations about courses
* `rest/courses/<int>` - provides informations about a specific course
* `rest/courses/<int>/questions` - provides informations about questions available within a course
* `rest/groups` - used to get groups user is assigned to
* `rest/groups/<int>` - provides informations about a specific group 
* `rest/groups/<int>/members` - provides informations about members assigned to a given group
* `rest/groups/<int>/designates` - provides informations about designates assigned to a given group
* `rest/groups/add_user` - used to add a user to a group  mentioned in the request
* `rest/groups/<int>/remove_user?id=<int>` - removes a user from a given group
* `api/token` - used to obtaining a bearer authentication token
* `rest/users` - used to manage users
* `rest/users/<int>` - used to manage a specific user 
* `rest/users/me` - used to manage a user
* `rest/designates` - provides information about the designates a user is assigned to
* `rest/designates/<int>` - provides information about a designates created by a user

