# 🚀 CodePilot AI

CodePilot AI is a full-stack AI-powered developer assistant built with **React, TypeScript, Spring Boot, and Google Gemini AI**. It helps developers generate code, review source code, detect bugs, create SQL queries, generate professional emails, and automatically produce documentation—all from a modern and responsive web interface.

---

## ✨ Features

- 💬 AI Chat Assistant
- 🔍 AI Code Review
- 🐞 Bug Finder
- 🗄️ SQL Query Generator
- 📧 Professional Email Generator
- 📝 Documentation Generator
- 📋 Copy Responses with One Click
- ⚡ Fast and Responsive User Interface
- 🎨 Modern Dark Theme

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Markdown
- Lucide React Icons

### Backend
- Java 21
- Spring Boot
- REST API
- Jackson
- Maven

### AI
- Google Gemini API

---

## 📁 Project Structure

```
CodePilot-AI
│
├── backend
│   ├── controller
│   ├── service
│   ├── client
│   ├── dto
│   └── exception
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   ├── lib
│   └── assets
│
└── README.md
```

---

## 🚀 Available AI Tools

### 💬 AI Chat
Ask programming questions and receive AI-generated responses.

### 🔍 Code Review
Analyze code and receive:
- Code quality feedback
- Best practices
- Optimization suggestions
- Improved code

### 🐞 Bug Finder
Detect common programming bugs and receive explanations with corrected code.

### 🗄️ SQL Generator
Generate SQL queries from plain English descriptions.

### 📧 Email Generator
Generate professional emails with different tones and purposes.

### 📝 Documentation Generator
Automatically create clean documentation for your code.

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/CodePilot-AI.git

cd CodePilot-AI
```

---

## Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Configure your Gemini API Key inside:

```
application.properties
```

```properties
gemini.api.key=YOUR_API_KEY
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

## Frontend Setup

Navigate to the frontend.

```bash
cd project
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|----------|-------------------------------|----------------|
| POST | `/api/chat` | AI Chat |
| POST | `/api/chat/code-review` | Code Review |
| POST | `/api/chat/bug-finder` | Bug Finder |
| POST | `/api/chat/sql-generator` | SQL Generator |
| POST | `/api/chat/email-generator` | Email Generator |
| POST | `/api/chat/documentation` | Documentation Generator |

---
---

## 👨‍💻 Author


GitHub: https://github.com/kusumbagdawat

---

⭐ If you found this project useful, please consider giving it a Star!
