# The Editorial Architect 

[![Next.js](https://img.shields.io/badge/Frontend-React%20%2F%20Vite-blue)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://www.mongodb.com/)
[![AI](https://img.shields.io/badge/AI-Google%20GenAI-orange)](https://ai.google.dev/)

**The Editorial Architect** is a sophisticated, full-stack platform designed to bridge the gap between traditional resume building and intelligent career analysis. It leverages Google’s Generative AI to provide real-time diagnostic feedback, scoring, and automated resume optimization.

---

## 🚀 Key Features

*   **AI Resume Analysis:** Integrates the **Google GenAI SDK** to parse resumes, providing actionable insights, alignment scores, and keyword optimization.
*   **Dynamic Resume Builder:** A high-performance UI for creating resumes with real-time previews and custom design systems.
*   **PDF Intelligence:** Utilizes **Puppeteer** and specialized parsing services to handle high-fidelity document generation and data extraction.
*   **Secure Authentication:** A complete Auth flow using **JWT, bcrypt, and token blacklisting** for secure session management.
*   **Cloud Integration:** Seamless media and file management via **Cloudinary** and **Multer** for reliable storage.

---

## 🛠️ Tech Stack

### **Frontend**
*   **Framework:** React (Vite) utilizing **React Router v7** for advanced navigation logic.
*   **Styling:** **Tailwind** CSS for responsive design system.
*   **Animations:** Framer Motion for a polished user experience.
*   **State Management:** Axios for RESTful API integration and React Context API for global state.

### **Backend**
*   **Environment:** Node.js & **Express 5**.
*   **Database:** **MongoDB** via Mongoose (Schema-driven NoSQL architecture).
*   **Security:** Helmet, Morgan, Express Rate Limit, and **Zod** for strict schema validation.
*   **AI Services:** Google GenAI SDK and Puppeteer for automated PDF rendering.

---

## 📂 Project Structure

### **Backend (`/backend`)**
*   `server.js`: Application entry point and database connection initialization.
*   `src/app.js`: Centralized Express configuration including middleware and global error handling.
*   `src/routes/`: **Modular RESTful API routes** (Auth, Interview, etc.) ensuring a clean separation of concerns.
*   `src/services/`: Dedicated logic for AI integration and complex PDF processing.
*   `src/models/`: Mongoose schemas for structured data management.

### **Frontend (`/frontend`)**
*   `src/main.jsx`: Main entry point with Context Providers and Router setup.
*   `src/features/`: **Feature-based architecture** separating Auth and Interview modules to ensure scalability.
*   `src/app.route.jsx`: Centralized routing management.

---

## ⚙️ Installation & Setup

### **1. Clone the Repository**
```bash
git clone [https://github.com/Code-rk-101/The-Editorial-Architect-full-stack-project-.git](https://github.com/Code-rk-101/The-Editorial-Architect-full-stack-project-.git)
```

### **2. Backend Setup**
 ```bash
    cd backend
    npm install
    # Create a .env file with: PORT, MONGO_URI, JWT_SECRET, GEMINI_API_KEY, CLOUDINARY_URL
    npm start
```

3.  **Frontend Setup:**
### **3. Frontend Setup**
```bash
    cd frontend
    npm install
    npm run dev
```

---

## 💡 Why This Project?

This project was built to demonstrate proficiency in the **MERN stack** while exploring the implementation of **AI-driven features**. By managing complex database schemas and integrating third-party AI SDKs, I have created a tool that not only builds documents but provides intelligent diagnostics—aligning with the "Full-Stack AI" focus of modern software engineering.

---

### **Alignment with Full Stack Intern Requirements:**
*   **AI Integration:** Hands-on experience with Google GenAI for refactoring and data analysis.
*   **Full-Stack Proficiency:** Proven ability to build and maintain robust Node.js/Express APIs and React frontends.
*   **Testing & Debugging:** Implemented global error handlers and Zod validation to identify and resolve bugs efficiently.
*   **Responsive UI:** Developed a custom design system using Tailwind and Sass to ensure high-performance UI components.
