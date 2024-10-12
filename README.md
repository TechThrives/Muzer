
# Muzer - Collaborative Music Playback App

## Overview

The Collaborative Music Playback App is a real-time music synchronization application built using Express, React, Prisma, and Socket.IO. It allows users to create and join rooms, add and vote on songs in a shared playlist, and enjoy synchronized playback on multiple devices.

## Features

- Real-Time Music Synchronization: Users can listen to music together, with synchronized playback across devices using Socket.IO.
- Vote-Based Playlist Management: Songs are added to a shared playlist and played based on votes.
- Room Management: Users can create or join rooms using a unique code.
- Favorites Feature: Users can mark room as favorites.
- Responsive Design: Built with React and Tailwind CSS for a smooth user experience across devices.

## Technologies Used
- Frontend: React.js, Tailwind CSS
- Backend: Express.js, Prisma
- Database: PostgreSQL
- Real-Time Communication: Socket.IO
- State Management: React Hooks and Context API

## Installation

### Prerequisites
- Node.js
- PostgreSQL
- Prisma

#### 1. Clone the Repository

``` bash
git clone https://github.com/TechThrives/Muzer.git
```

#### 2. Backend Setup
- #### Navigate to the backend directory:

``` bash
cd backend
```

- #### Install dependencies:

``` bash
npm install
```

- #### Configure Environment Variables

    In the root directory of your server, create a file named `.env`.
    
    Open the `.env` file and add the following environment variables:
 
     - **`DATABASE_URL`**: PostgreSQL Database Connection String.
     - **`FRONTEND_URL`**: Defines the base URL of the frontend application
     - **`PORT`**: Specifies the port on which the backend server will listen.
     - **`JWT_SECRET`**: Secret key used for signing JSON Web Tokens.

- #### Run Prisma migrations:

``` bash
npx prisma migrate dev
```

Start the backend server:

``` bash
npm run dev
```

#### 3. Frontend Setup
- #### Navigate to the frontend directory:

``` bash
cd frontend
```

- #### Install dependencies:

``` bash
npm install
```

- #### Configure Environment Variables

    In the root directory of your React App, create a file named `.env`.
    
    Open the `.env` file and add the following environment variables:
 
     - **`REACT_APP_SERVER`**: Defines the base URL of the backend server.

- #### Start the frontend server:

``` bash
npm start
```

#### 4. Access the Application
Open your browser and go to http://localhost:3000 to start using the app.


## Usage
- Create or Join a Room: Users can create a new room or join an existing one using a unique room code.
- Add Songs: Users can search for and add songs to the shared playlist.
- Vote on Songs: Users can upvote or downvote songs, and the song with the highest votes will play next.
- Synchronized Playback: Hosts control playback, and the timestamp is synchronized across all devices in the room.

## Contributing
We welcome contributions from the community. To contribute to this project, please follow these guidelines:

- Fork the repository
- Create a new branch for your feature or bug fix
- Make your changes and ensure they are well-tested
- Create a pull request to the main branch of the original repository

## Developers
- Swarup Kanade [@swarupkanade](https://www.github.com/swarupkanade)
- Omkar Kanade [@omkarkanade](https://www.github.com/omkarkanade)
