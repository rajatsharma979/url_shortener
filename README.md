# 🔗 URL Shortener

A full-stack web application to shorten long URLs, track clicks, and analyze link usage based on device and location. Built with **React**, **Node.js**, **Express**, **MongoDB**, and **JWT** authentication.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Signup/Login using **JWT tokens**
  - Secure authentication via `httpOnly` cookies
  - Input validation using `express-validator`

- ✂️ **URL Shortening**
  - Paste any valid URL and generate a short version
  - One-click copy-to-clipboard functionality
  - Links are unique and persistent

- 📊 **Analytics Dashboard**
  - View all created short URLs in your account
  - Track **clicks by device type** (mobile, desktop, tablet)
  - Track **clicks by location** (based on IP geolocation)
  - See URL creation dates and original links

---

## 🛠 Tech Stack

**Frontend**
- React
- Tailwind CSS
- Axios
- React Router DOM

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- express-validator
- ip-api.co
- user-agent-parser

---

## 📦 Installation & Setup

### Backend

```bash
cd backend
npm install
```

###Create .env file

DB_LINK = your Database url ||
PORT = 3000 ||
JWT_Access_Secret = your secret ||
JWT_Refresh_Secret = your secret ||
JWT_Access_Token_Expiry = give time in milliseconds ||
JWT_Refresh_Token_Expiry = give time in milliseconds ||
Access_Token_Cookie_Expiry = give time in milliseconds ||
Refresh_Token_Cookie_Expiry = give time in milliseconds

### Start backend server
```
tsc
npm start
```

### Frontend
```
cd url-Shortener
npm i
npm run dev
```

