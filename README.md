📝 Notes App
============

A simple notes application using **React** (frontend), **Node.js** (backend), **MongoDB**, and **Docker Compose**.



🚀 Features
-----------

*   Write and store personal notes
*   No login — just save your unique `userId` to access your notes later
*   Responsive and modern UI
*   Fully containerized with Docker


📦 Tech Stack
-------------

*   Frontend: React
*   Backend: Node.js + Express
*   Database: MongoDB
*   Containerization: Docker + Docker Compose



🛠️ Getting Started
-------------------

### 1\. Clone the repository

    git clone https://github.com/rshme/notes-app.git
    cd notes-app

### 2\. Start with Docker Compose

    docker-compose up --build -d

Access the app at: [http://localhost:3000](http://localhost:3000)


📂 Project Structure
--------------------

    notes-app/
    ├── backend/       # Node.js backend
    ├── frontend/      # React frontend
    ├── docker-compose.yml
    ├── README.md
    ├── .gitignore


📌 Usage
--------

*   When you visit the app, you can either create a new user or enter your existing `userId`
*   All notes are tied to your `userId`. Keep it safe!
*   Notes are stored in MongoDB using Docker volumes

🧹 Cleaning Up
--------------

To stop the app and remove containers:

    docker-compose down

To also remove volumes (stored notes):

    docker-compose down -v
