# University App

A modern web application to manage university-related tasks like student registration, course management, faculty profiles, etc. Built using **React** for the frontend, **Node.js** with **Express** for the backend, and **PostgreSQL** as the database.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
5. [Folder Structure](#folder-structure)
6. [API Endpoints](#api-endpoints)
7. [Contributing](#contributing)
8. [License](#license)

---

## Project Overview

This is a full-stack web application built to manage university operations. It enables students, faculty, and administrators to interact with the university system in a streamlined manner.

The app is built with a **React** frontend, which communicates with a **Node.js** backend. The backend is built with **Express** and connects to a **PostgreSQL** database for data storage and retrieval.

---

## Technologies Used

- **Frontend**:
  - React
  - React Router (for navigation)
  - Axios (for API requests)

- **Backend**:
  - Node.js
  - Express.js
  - PostgreSQL
  - Sequelize (ORM for PostgreSQL)

- **Other**:
  - JWT (JSON Web Tokens) for Authentication
  - bcryptjs for password hashing
  - Docker (optional, for containerization)

---

## Features

- **Student Module**:
  - View courses
  - Register for courses
  - View course grades
  - Update student profile
  
- **Faculty Module**:
  - Manage course assignments
  - View student grades
  - Create/update course content
  
- **Admin Module**:
  - Add/update courses
  - Add/remove faculty members
  - View student registrations and performance

---

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Before you begin, ensure you have the following software installed:

- **Node.js** (v14.x or higher)
- **npm** or **yarn** (for package management)
- **PostgreSQL** (v12 or higher)
- **Docker** (optional, if you prefer using containers)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/manizha744/ABHI-PROJECT
    cd ABHI-PROJECT
    ```

2. Set up the backend (Node.js + Express + PostgreSQL):

    - Go to the backend directory:
      ```bash
      cd backend
      ```

    - Install dependencies:
      ```bash
      npm install
      ```

    - Set up your PostgreSQL database. You can either:
      - Create a PostgreSQL database locally or use Docker to set up PostgreSQL.

3. Set up the frontend (React):

    - Go to the frontend directory:
      ```bash
      cd frontend
      ```

    - Install dependencies:
      ```bash
      npm install
      ```

4. Run the backend server:
    ```bash
    cd backend
    npm start
    ```

    The backend server will start on `http://localhost:5000`.

5. Run the frontend development server:
    ```bash
    cd frontend
    npm start
    ```

    The frontend server will start on `http://localhost:3000`.

---


