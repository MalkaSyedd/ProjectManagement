# Project Management Platform

A simple MERN-based platform designed to organize collaboration by managing teams, projects, and user stories in one place. Users can view their assigned work and easily add team members or create prioritized tasks for better productivity and visibility.

## Tech Stack
- Frontend: React.js
- Backend: Node.js + Express.js
- Database: MongoDB

## Features
- User authentication
- Home dashboard showing user teams, projects, and user stories
- Select and add multiple members to a team
- Create user stories with priority values

## Installation and Setup

1. Download or clone the repository
2. Open the project folder in VS Code
3. Open a terminal and navigate to the `source_code` folder

Split the terminal into two terminals (both in `source_code` level)

### Backend Setup
```sh
cd server
npm install
npm i react-select
node server.js
```

Expected output:
```
Server Started at 9000 Database Connected
```

### Frontend Setup
```sh
cd webpage
npm install
npm i react-select
npm start
```

4. If the browser does not open automatically, go to:
```
http://localhost:3000/
```
