# ATS CRUD Assessment

Full-stack User Management application with Java Spring Boot backend and React.js frontend.

## Prerequisites

- Java 17+
- Node.js 16+
- MySQL 8.0+

## Setup Instructions

### 1. Database Setup

**Option A**: Update the database name, username, and password in `api/src/main/resources/application.properties` to match your MySQL setup.

**Option B**: Use the provided SQL commands to create the database and user:
```sql
mysql -u root -p
CREATE DATABASE IF NOT EXISTS db;
CREATE USER 'simodk'@'localhost' IDENTIFIED BY 'simo2020';
GRANT ALL PRIVILEGES ON db.* TO 'simodk'@'localhost';
```

### 2. Run Backend
```bash
cd api
./mvnw spring-boot:run
```
Backend: http://localhost:8080

### 3. Run Frontend
```bash
cd ats-crud-app
npm install
npm start
```
Frontend: http://localhost:3000

## Features

- Create, Read, Update, Delete users
- Input validation and error handling
- Responsive UI design
- RESTful API endpoints

## Tech Stack

**Backend**: Spring Boot, JPA/Hibernate, MySQL  
**Frontend**: React.js, React Router, Axios