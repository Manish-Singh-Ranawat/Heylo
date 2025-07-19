# Heylo 

**`` Heylo ``** - A Real-Time Messaging & Video Communication Platform designed for social connection, collaboration, and language exchange. Make friends, chat instantly, hop into video calls, and explore a global network of learners — all wrapped in a sleek, theme-rich interface.

Built for scalability and performance, Heylo leverages the **`` MERN stack (MongoDB, Express, React, Node.js) ``**, integrated with **``Stream``** for real-time infrastructure, and enhanced with tools like **`` Zustand, TanStack Query, and TailwindCSS ``**.

Deployed on **`` Render ``** as a production-ready service that serves both the backend API and the frontend from a single Node.js server.

### 🌐 [*View Live*](https://heylo.onrender.com)

---
## 🚀 `` Features ``
- 💬 **Real-Time Chat** : 1-on-1 messaging with typing indicators, emoji reactions, and media sharing.

- 📹 **Video Calls & Screen Sharing** : High-quality video calling powered by Stream Video SDK. Group calls, screen sharing, and session recording.

- 🧑‍🤝‍🧑 **Friends System** : Send, accept, decline, and manage friend requests. Easily view, search, and connect with friends.

- 🔔 **Real-Time Notifications** : In-app alerts for friend requests, messages, and activity.

- 🧠 **Smart Suggestions** : Personalized recommendations to help you meet new people and grow your language-learning network.

- 🌐 **User Profiles & Search** : Public profiles with editable info and a fast search experience to discover new friends.

- 🎨 **Custom UI Themes** : Choose from 32 unique themes with DaisyUI integration. Fully responsive and modern user interface.

---
## 🧱 `` Tech Stack ``
### Frontend
- React
- TailwindCSS + DaisyUI
- TanStack Query for server state
- Zustand for global state management
- Lucide React, Day.js, React Hot Toast
- React Router

### Backend
- Node.js with Express.js
- MongoDB + Mongoose
- JWT Authentication
- Stream SDK (Chat + Video)
- bcryptjs, cookie-parser, cors, dotenv

---

## 🌍 `` Deployment ``

The entire application is deployed on **Render** using a single **Web Service**.

- **Backend (Express + API)** and **Frontend (React)** are bundled together.
- React is built into static files and served by Express from the `/frontend/dist` folder in production.



