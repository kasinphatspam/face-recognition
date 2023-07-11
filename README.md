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
Backend | Login | http://localhost:3001/auth/login | POST
Backend | Register | http://localhost:3001/auth/register | POST
Backend | Forgot password | http://localhost:3001/auth/forgot-password | PUT

User account\
http://localhost:3001/user/

Server | API | Endpoint | Method | Status
----- | ----- | ----- | ----- | ----- |
Backend | Get current user | http://localhost:3001/user/me | GET
Backend | Get list of all user | http://localhost:3001/user/all | GET
Backend | Get user by id | http://localhost:3001/user | GET
Backend | Edit user account | http://localhost:3001/user | PUT
Backend | Edit user profile | http://localhost:3001/user/profile | PUT

Organization\
http://localhost:3001/group/

Server | API | Endpoint | Method | Status
----- | ----- | ----- | ----- | ----- |
Backend | Get current organization | http://localhost:3001/group/me | GET
Backend | Get organization by id | http://localhost:3001/group/ | GET
Backend | Create organization | http://localhost:3001/group | POST
Backend | Edit organization | http://localhost:3001/group | PUT
Backend | Delete organization | http://localhost:3001/group | DELETE
Backend | Join organization | http://localhost:3001/group/join/:id | POST
Backend | Get passcode | http://localhost:3001/group/passcode | GET
Backend | Re-generate passcode | http://localhost:3001/group/passcode | PUT
Backend | Get organization member | http://localhost:3001/group/member | GET
Backend | Delete organization member | http://localhost:3001/group/member | DELETE
Backend | Link organization with vtiger | http://localhost:3001/group/vtiger | PUT
Backend | Sync data between vtiger and database | http://localhost:3001/group/vtiger | POST
Backend | Get contact by id | http://localhost:3001/group/contact | GET
Backend | Get all contact | http://localhost:3001/group/contact/all | GET
Backend | Change role of member in organization | http://localhost:3001/group/member/role | PUT
Backend | Get list of role in organization | http://localhost:3001/group/role | GET
Backend | Add role | http://localhost:3001/group/role | POST
Backend | Edit role | http://localhost:3001/group/role | PUT
Backend | Manager permission in each role | http://localhost:3001/group/role/permission | PUT
Backend | Delete role | http://localhost:3001/group/role | DELETE

Face recognition\
http://localhost:3002/ml/

Server | API | Endpoint | Method | Status
----- | ----- | ----- | ----- | ----- |
ML | Encode image | http://localhost:3002/ml/encode | POST
ML | Add dataset | http://localhost:3002/ml/dataset | POST
ML | Delete dataset | http://localhost:3002/ml/dataset | DELETE

Utils
Server | API | Endpoint | Method | Status
----- | ----- | ----- | ----- | ----- |
Backend | Check server status | http://localhost:3001/status | POST
ML | Check server status | http://localhost:3002/status | POST

## Creators
### Kasinphat Ketchom
* https://github.com/kasinphatspam/
### Panumeth Khongsawatkait
* https://github.com/Kobayashi-UwU/
