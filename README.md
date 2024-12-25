# My YouTube Clone

Welcome to **My YouTube Clone**, a full-stack web application built using the MERN stack to replicate core features of YouTube, such as video browsing, uploading, commenting, and user authentication.

---

## 📖 Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Features
- **User Authentication**: Secure signup and login using JWT stored in cookies.
- **Video Management**:
  - Upload, edit, and delete videos.
  - Like, dislike, and comment on videos.
- **Search Functionality**: Search for videos by title or description.
- **Responsive Design**: Fully responsive UI using Tailwind CSS with dark mode support.
- **Dynamic Sidebar**: Explore categories and navigate easily through different sections.
- **Cloudinary Integration**: Manage video and profile picture uploads seamlessly.

---

## 🛠️ Technologies Used

### Frontend:
- **React**: Component-based architecture for building the UI.
- **Vite**: High-performance build tool for a faster development experience.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: Routing and navigation for the app.
- **React Redux**: State management for user authentication and global states.

### Backend:
- **Node.js**: Server-side runtime.
- **Express.js**: Backend framework for routing and APIs.
- **MongoDB**: Database for storing users, videos, and comments.
- **JWT**: Secure user authentication.
- **Cloudinary**: Image and video hosting for profile pictures and videos.

---

## 🛠️ Setup and Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js**: v14 or later
- **MongoDB**: A running instance of MongoDB
- **Git**: Version control system

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Deepak-Varshney/myYoutube.git
   cd myYoutube
   ```

2. **Install Dependencies**:
   Navigate to both `client` and `server` folders and install dependencies:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the `server` directory with the following variables:
   ```env
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Run the Development Server**:
   Start both frontend and backend servers:
   ```bash
   # Frontend
   cd client
   npm run dev

   # Backend
   cd ../server
   npm run dev
   ```

5. **Access the Application**:
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

### Client
```plaintext
client/
├── src/
│   ├── components/         # Reusable React components
│   ├── pages/              # Application pages (Home, Video, Search Results, etc.)
│   ├── redux/              # Redux slices for state management
│   ├── utils/              # Utility functions
│   └── App.js              # Root component
├── public/                 # Static assets
└── vite.config.js          # Vite configuration
```

### Server
```plaintext
server/
├── models/                 # MongoDB models (User, Video, Comment)
├── routes/                 # API routes (auth, videos, comments, etc.)
├── controllers/            # Route handler logic
├── middleware/             # Middleware for authentication, etc.
├── utils/                  # Helper functions
└── server.js               # Entry point for the backend
```

---

## 📡 API Routes

### Authentication
- `POST https://myyoutube-0non.onrender.com/api/auth/signup`: Register a new user.
- `POST https://myyoutube-0non.onrender.com/api/auth/signin`: Login a user.

### Videos
- `GET https://myyoutube-0non.onrender.com/api/videos`: Fetch all videos.
- `GET https://myyoutube-0non.onrender.com/api/videos/:id`: Fetch a single video by ID.
- `POST https://myyoutube-0non.onrender.com/api/videos`: Upload a new video (authenticated).
- `PUT https://myyoutube-0non.onrender.com/api/videos/:id`: Edit a video (authenticated).
- `DELETE https://myyoutube-0non.onrender.com/api/videos/:id`: Delete a video (authenticated).

### Comments
- `GET https://myyoutube-0non.onrender.com/api/comments/:videoId`: Fetch comments for a video.
- `POST https://myyoutube-0non.onrender.com/api/comments`: Add a comment (authenticated).
- `DELETE https://myyoutube-0non.onrender.com/api/comments/:id`: Delete a comment (authenticated).

---

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork this repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 💡 Future Enhancements
- Add support for playlists.
- Enable real-time notifications.
- Implement video analytics (retention, etc.).
- Improve search with filters and sorting.

---

Thank you for checking out **My YouTube Clone**! Feel free to explore, suggest improvements, or contribute to the project. 😊
