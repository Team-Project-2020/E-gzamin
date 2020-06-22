# E-gzamin
E-learning app for creating exams/tests

# Backend
Backend is managed by python framework Django, to run type

`python manage.py runserver`

# Frontend
Frontend is done in javascript framework React, to run type

`npm install`

`npm start`

# Endpoints
* `admin/` - to enter administrator panel
* `rest/questions` - provides informations about questions
* `rest/questions/<int>` - provides informations about a specific question 
* `rest/answers` - provides informations about answers
* `rest/answers/<int>` - provides informations about a specific answer
* `rest/testresults` - provides informations about test results
* `rest/testresults/<int>` - provides informations about a specific test result
* `rest/courses` - provides informations about test courses
* `rest/courses/<int>` - provides informations about a specific course
* `rest/groups` - used to get groups user is assigned to
* `rest/groups/<int>` - provides informations about a specific group 
* `rest/groups/add_user` - used to add a user to a group  mentioned in the request
* `rest/groups/<int>/remove_user?id=<int>` - removes a user from a given group
* `api/token` - used to obtaining a bearer authentication token
* `rest/users` - used to manage users
* `rest/users/<int>` - used to manage a speficic user 
* `rest/users/me` - used to manage a user
* `rest/designates` - provides information about test to be completed
* `rest/designates/<int>` - provides information about a given test to be completed
* `rest/designates/?owned=true` - tbd
