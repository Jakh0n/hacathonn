# 🌟 Multi-Tenant SaaS Admin Panel

Welcome to our **SaaS Hackathon Project** — a dynamic, multi-tenant admin panel with a modern tech stack! This platform provides a seamless, personalized experience for each tenant and includes:

## ✨ Features

- 🎨 **Theme switching**: Light/Dark mode per tenant
- 🔧 **Feature toggles**: Enable/disable modules like Real-Time Chat
- ⚡ **Real-time notifications**: Built using Socket.IO
- 📱 **Fully responsive**: Mobile and desktop ready
- 🔐 **Tenant isolation**: No config leaks between tenants

---

## 📸 Live Demo

🔗 [Frontend on Vercel](https://hacathon-frontend-neon.vercel.app)

Try it on mobile or desktop:
1. Visit the link.
2. Choose a tenant (`Tenant 1` or `Tenant 2`).
3. Click **Load**.
4. Watch the dashboard adapt in real time! 🚀

---

## 🧪 Test Cases

### ✅ Tenant 1 (Mobile View)
- **Light theme**
- **Chat module enabled**
- **Notification popup**: "Welcome to Tenant 1!"
- **Info**: `tenant1.example.com`

### ✅ Tenant 2 (Mobile View)
- **Dark theme**
- **Chat module disabled**
- **No popup**
- **Info**: `tenant2.example.com`

### 🔄 Tenant Switching
- Switch between tenants with no data/config leaks.
- UI updates correctly with each tenant’s preferences.

---

## 🛠️ Tech Stack

| Component  | Technology                  |
|------------|-----------------------------|
| Frontend   | Next.js, React, Shadcn UI, Typescript              |
| Backend    | Node js, Express.js                  |
| Real-Time  | WebSocket (Socket.IO)       |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## 🚀 Local Setup

```bash

cd frontend
npm install
# Add .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
echo "NEXT_PUBLIC_WEBSOCKET_URL=http://localhost:3001" >> .env.local
npm run dev

cd server
npm install
# Add .env file
echo "ALLOWED_ORIGIN=https://hacathon-frontend-neon.vercel.app" > .env
npm start
