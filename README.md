# Euromelanoma Portal -- Master's Thesis Project

This project is a web-based portal for melanoma risk assessment and
dermatological appointment scheduling, developed as part of a master's
thesis.

------------------------------------------------------------------------

## Overview

The system enables:

-   Melanoma risk assessment through a structured questionnaire\
-   Patient registration and management\
-   Dermatology appointment scheduling\
-   Administrative system management

The application is fully containerized using Docker.

------------------------------------------------------------------------

## System Requirements

-   Docker Desktop\
-   Docker Compose

------------------------------------------------------------------------

## Getting Started

### 1. Project Setup

Clone or extract the project into your desired directory.

### 2. Environment Configuration

An `.env` file is provided in the email attachment.

Save the `.env` file in the project root directory (same level as
`docker-compose.yml`).

The folder structure should look like:

    euromelanoma/
    ├── euromelanoma_api/
    ├── euromelanoma_front/
    ├── database/
    ├── docker-compose.yml
    └── .env

### 3. Start the System

``` bash
docker-compose up -d
```

### 4. Initial Startup

The first startup may take 2--3 minutes while images are built and
services initialize.

------------------------------------------------------------------------

## Accessing the Application

-   **Frontend:** http://localhost:4200\
-   **Backend API / Swagger:** http://localhost:5000/swagger\
-   **Database:** localhost,1433

Database credentials:

-   Username: `sa`\
-   Password: defined in the `.env` file

------------------------------------------------------------------------

## Test Accounts

The system automatically creates the following test accounts:

### Administrator

-   Username: `admin`
-   Password: `Lozinka_123`

### Doctor

-   Username: `jelena01`
-   Password: `Lozinka_123!`

### Patient

-   Username: `anci`
-   Password: `Lozinka_123!`

------------------------------------------------------------------------

## System Management

### Basic Commands

Start services:

``` bash
docker-compose up -d
```

Stop services:

``` bash
docker-compose down
```

Check service status:

``` bash
docker-compose ps
```

View logs:

``` bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

------------------------------------------------------------------------

### Restart Specific Services

Restart backend:

``` bash
docker-compose restart backend
```

Rebuild and restart frontend:

``` bash
docker-compose build frontend
docker-compose up -d frontend
```

------------------------------------------------------------------------

## Database

-   Server: localhost,1433\
-   Database: EUROMELANOMA\
-   Username: sa\
-   Password: defined in `.env`

The database is automatically created and seeded with required tables
and test data during the first startup.

------------------------------------------------------------------------

## Email Functionality

The system uses SendGrid for email delivery.

If a SendGrid API key is not configured, the system will function
normally; however, emails will not be sent and will instead be logged
internally.

------------------------------------------------------------------------

## System Architecture

The application consists of:

-   **Frontend:** Angular (Port 4200)\
-   **Backend:** .NET 8 Web API (Port 5000)\
-   **Database:** Microsoft SQL Server (Port 1433)

All services are containerized and communicate via an internal Docker
network.

------------------------------------------------------------------------

## Troubleshooting

### If the application is not working:

1.  Check container status:

    ``` bash
    docker-compose ps
    ```

2.  Inspect logs:

    ``` bash
    docker-compose logs
    ```

3.  Restart the system:

    ``` bash
    docker-compose down
    docker-compose up -d
    ```

4.  Clear Docker cache (if necessary):

    ``` bash
    docker system prune -f
    docker-compose build --no-cache
    docker-compose up -d
    ```

------------------------------------------------------------------------

### Common Issues

-   **Port conflicts:** Ensure ports 4200, 5000, and 1433 are not in
    use.
-   **Missing `.env` file:** Confirm the file is placed in the root
    directory.
-   **Windows Docker configuration:** File sharing may need to be
    enabled in Docker Desktop settings.

------------------------------------------------------------------------

## Security Notice

The `.env` file is intentionally excluded from the public repository for
security reasons and is provided separately via email.
