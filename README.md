# Face-Recognition System
Customer face recognition system for employees to view information through face scanning.

## Project details

## Setup .env file

## Quick start

## Server Port
* Frontend: http://localhost:3000/
* Backend:  http://localhost:3001/
* ML:       http://localhost:3002/

## Server Listing
Authencation\
http://localhost:3001/auth/

Server | API | Endpoint | Method | Status
----- | ----- | ----- | ----- | ----- |
Backend | Login | http://localhost:3001/auth/login | POST | success
Backend | Register | http://localhost:3001/auth/register | POST | success
Backend | Forgot password | http://localhost:3001/auth/forgot-password | PUT

User account\
http://localhost:3001/user/

Server | API | Endpoint | Method | Status
----- | ----- | ----- | ----- | ----- |
Backend | Get current user | http://localhost:3001/user/me | GET | success
Backend | Get list of all user | http://localhost:3001/user/list/all | GET | success
Backend | Get user by id | http://localhost:3001/user/:userId | GET | success
Backend | Edit user account | http://localhost:3001/user/:userId | PUT | success
Backend | Edit user profile | http://localhost:3001/user/:userId/image | PUT | success
Backend | Update user info | http://localhost:3001/user/:userId | PUT | success
Backend | Delete user account | http://localhost:3001/user/:userId | DELETE | success
Backend | Get current organization | http://localhost:3001/user/:userId/organization | success

Organization\
http://localhost:3001/organization/

Server | API | Endpoint | Method | Status
----- | ----- | ----- | ----- | ----- |
Backend | Get current organization | http://localhost:3001/user/:userId/organization | GET | success
Backend | Get organization by id | http://localhost:3001/organization/:organizationId | GET | success
Backend | Create organization | http://localhost:3001/organization/user/:userId | POST | success
Backend | Edit organization | http://localhost:3001/organization/:organizationId | PUT | success
Backend | Delete organization | http://localhost:3001/organization/:organizationId | DELETE | success
Backend | Join organization | http://localhost:3001/organization/user/:userId/join/:id | POST | success
Backend | Get passcode | http://localhost:3001/organization/:organizationId/passcode | GET | success
Backend | Re-generate passcode | http://localhost:3001/organization/:oragnizationId/passcode | PUT | success
Backend | Get organization employee | http://localhost:3001/organization/:organizationId/employee/list/all | GET
Backend | Delete organization employee | http://localhost:3001/organization/:organizationId/employee/:userId | DELETE
Backend | Link organization with vtiger | http://localhost:3001/organization/vtiger | PUT
Backend | Sync data between vtiger and database | http://localhost:3001/organization/vtiger | POST
Backend | Get contact by id | http://localhost:3001/organization/:oragnizationId/contact/:contactId | GET
Backend | Get all contact | http://localhost:3001/organization/:oragnizationId/contact/list/all | GET
Backend | Change role of member in organization | http://localhost:3001/organization/:oragnizationId/employee/:userId/role | PUT
Backend | Get list of role in organization | http://localhost:3001/organization/:oragnizationId/role/list/all | GET
Backend | Add role | http://localhost:3001/organization/:oragnizationId/role | POST
Backend | Edit role | http://localhost:3001/organization/:oragnizationId/role | PUT
Backend | Manager permission in each role | http://localhost:3001/organization/:oragnizationId/role/permission | PUT | cancel
Backend | Delete role | http://localhost:3001/organization/:oragnizationId/role | DELETE

Face recognition\
http://localhost:3002/ml/ (Please don't connect directly. You need to call this from the backend server.)

Server | API | Endpoint | Method | Status
----- | ----- | ----- | ----- | ----- |
ML | Encode image | http://localhost:3002/ml/encode | POST
ML | Add dataset | http://localhost:3002/ml/dataset | POST
ML | Delete dataset | http://localhost:3002/ml/dataset | DELETE

Utils
Server | API | Endpoint | Method | Status
----- | ----- | ----- | ----- | ----- |
Backend | Check server status | http://localhost:3001/status | GET
ML | Check server status | http://localhost:3002/status | GET

## Creators
### Kasinphat Ketchom
* https://github.com/kasinphatspam/
### Panumeth Khongsawatkait
* https://github.com/Kobayashi-UwU/
### Phutsakorn Thunwattanakul
* https://github.com/cinnamonjs
### Shinnapat Koparamestrisin
* https://github.com/PPHamster
