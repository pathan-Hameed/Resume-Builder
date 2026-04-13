# 📄 Resume Builder

A full-stack Resume Builder application built with **React + Vite** (frontend) and **Spring Boot + MySQL** (backend).

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, JavaScript |
| Backend | Java 17, Spring Boot, Maven |
| Database | MySQL |
| Auth | JWT (JSON Web Tokens) |

---

## ✨ Features

- 🔐 User Registration & Login with JWT Authentication
- 📝 Create, Edit and Manage Resumes
- 👤 Demo account available for quick access
- 📱 Responsive UI

---

## 🛠️ Prerequisites

Make sure the following are installed on your system:

- **Java 17 (JDK 17)** — [Download](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) | Verify: `java -version`
- **Node.js v18+ & npm** — [Download](https://nodejs.org/) | Verify: `node -v` and `npm -v`
- **MySQL Server** — [Download](https://dev.mysql.com/downloads/mysql/) | Verify: `mysql --version`
- **Maven** — [Download](https://maven.apache.org/download.cgi) | Verify: `mvn --version`

---

## ⚙️ Local Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder
```

---

### Step 2: Database Setup

Open MySQL in your terminal:

```bash
mysql -u root -p
```

Create the database:

```sql
CREATE DATABASE resume_builder;
exit;
```

---

### Step 3: Configure Backend Environment

Create a file called `application-local.yml` inside:
```
Resume_Building-backend/src/main/resources/
```

Add your local configuration:

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/resume_builder?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
    username: root
    password: your_mysql_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB

jwt:
  secret: your_local_jwt_secret_key_here
  expiration: 86400000

logging:
  level:
    com.resume: DEBUG
```

> ⚠️ **Never push `application-local.yml` to GitHub** — it contains sensitive credentials.

---

### Step 4: Run the Backend

```bash
cd Resume_Building-backend
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

Wait until you see:
```
Started ResumeBuildingApplication
Demo user seeded: demo@example.com / demo123
```

Backend runs at: **http://localhost:8080**

> ⚠️ Keep this terminal open while using the app.

---

### Step 5: Run the Frontend

Open a **new terminal**:

```bash
cd resume-frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

### Step 6: Login

Open your browser at **http://localhost:5173** and log in with:

```
Email:    demo@example.com
Password: demo123
```

> You can also register a new account using the Register option.

---

## 🌐 Production Deployment

| Service | Platform |
|---|---|
| Frontend | [Vercel](https://vercel.com) or [Netlify](https://netlify.com) |
| Backend | [Render](https://render.com) |
| Database | [Railway](https://railway.app) |

### Backend Environment Variables (Render)

```
DATABASE_URL        jdbc:mysql://your-host:port/railway?useSSL=false&serverTimezone=UTC
DATABASE_USERNAME   your_db_username
DATABASE_PASSWORD   your_db_password
JWT_SECRET          your_production_secret_key
JWT_EXPIRATION      86400000
PORT                8080
```

### Frontend Environment Variables (Vercel)

```
VITE_API_URL    https://your-backend.onrender.com
```

---

## 🔧 Troubleshooting

| Error | Fix |
|---|---|
| `Access denied for user 'root'@'localhost'` | Check MySQL credentials in `application-local.yml` |
| `Unknown database 'resume_builder'` | Run `CREATE DATABASE resume_builder;` in MySQL |
| `Port 8080 already in use` | Close other apps using port 8080 or change port in yml |
| `Port 5173 already in use` | Press `y` when Vite asks to use another port |
| `npm install` fails | Delete `node_modules` folder and run `npm install` again |
| Frontend can't reach backend | Make sure backend is running on port 8080 |

---

## 📋 Quick Start Summary

```bash
# 1. Create database
mysql -u root -p
CREATE DATABASE resume_builder;
exit;

# 2. Run backend
cd Resume_Building-backend
mvn spring-boot:run -Dspring-boot.run.profiles=local

# 3. Run frontend (new terminal)
cd resume-frontend
npm install
npm run dev

# 4. Open browser
http://localhost:5173

# 5. Login
Email: demo@example.com
Password: demo123
```

---

## 📁 Project Structure

```
resume-builder/
├── Resume_Building-backend/       # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/resume/   # Java source files
│   │       └── resources/
│   │           ├── application.yml         # Production config
│   │           └── application-local.yml   # Local config (gitignored)
│   └── pom.xml
│
└── resume-frontend/               # React + Vite Frontend
    ├── src/
    ├── public/
    └── package.json
```

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
