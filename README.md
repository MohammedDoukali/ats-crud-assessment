# ATS CRUD Assessment

Full-stack User Management application with Java Spring Boot backend and React.js frontend.

## Prerequisites

- Docker
- Docker Compose

## Setup Instructions

### Using Makefile (Recommended)
```bash
# Start all services
make up

# Down all services
make down

# Stop services
make stop

# Complete cleanup
make clean-all

# Check status
make status
```

**Access the Application:**
Open http://localhost:3000 in your browser to use the app.

## Features

- Create, Read, Update, Delete users
- Input validation and error handling
- Responsive UI design
- RESTful API endpoints

## Tech Stack

**Backend**: Spring Boot, JPA/Hibernate, MySQL  
**Frontend**: React.js, React Router, Axios

## Makefile Commands

The project includes a Makefile for easy Docker management:

| Command | Description |
|---------|-------------|
| `make up` | Start all services|
| `make build` | Build all services from scratch |
| `make stop` | Stop all services |
| `make down` | Stop and remove containers |
| `make clean` | Remove containers and custom images |
| `make clean-all` | Complete cleanup (containers, images, volumes) |
| `make db-reset` | Reset database with fresh schema.sql |
| `make status` | Show container status |
| `make logs` | Show logs from all services |

**Note**: Use `make db-reset` when you modify the `schema.sql` file to apply database changes.