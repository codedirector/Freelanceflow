# 📌 Freelance Marketplace App  

A **full-stack freelance marketplace** where:  
- Clients can post projects.  
- Freelancers can apply by submitting proposals.  
- Clients can accept or reject proposals.  
- Both can manage profiles and communicate after acceptance.  

---

## 🚀 Tech Stack  

### **Frontend**  
- ⚛️ [Next.js](https://nextjs.org/) – React framework  
- 🎨 Tailwind CSS – Styling  
- 🔐 Zustand – State Management  
- 🔔 React Hot Toast – Notifications  

### **Backend**  
- 🌐 Node.js & Express.js – REST API  
- 🗄️ MongoDB & Mongoose – Database  
- 🔑 JWT Authentication – Secure login & role-based access  

---

## 📂 Project Structure  

freelance-app/
│── backend/
│ ├── models/ # Mongoose schemas (User, Project, Proposal)
│ ├── routes/ # Express routes (auth, users, projects, proposals)
│ ├── middleware/ # Auth middleware
│ ├── server.js # Express app entry
│ └── .env # Environment variables
│
│── frontend/
│ ├── app/ # Next.js pages (login, register, dashboard, etc.)
│ ├── store/ # Zustand store
│ ├── utils/ # API helper functions
│ ├── styles/ # Tailwind setup
│ └── package.json
│
├── README.md
└── .gitignore

yaml
Copy code

---

## ⚡ Features  

✅ User Authentication (JWT)  
✅ Role-based users → **Client** & **Freelancer**  
✅ Client can **create projects**  
✅ Freelancer can **submit proposals**  
✅ Client can **accept/reject proposals**  
✅ Profile management (update name, view details)  
✅ Secure APIs with ownership checks  

---

## 🔧 Setup Instructions  

### 1️⃣ Clone Repo  
```bash
git clone https://github.com/yourusername/freelance-app.git
cd freelance-app
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
Create .env file in backend:

ini
Copy code
MONGO_URI=your-mongodb-uri
JWT_TOKEN=your-secret-key
PORT=3000
Run backend:

bash
Copy code
npm start
3️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
📌 Roadmap
 Auth (Register, Login, JWT)

 Role-based users (Client, Freelancer)

 Project creation (Client only)

 Proposal submission (Freelancer only)

 Proposal acceptance / rejection (Client only)

 Chat between client & freelancer

 File uploads for project delivery

 Payment system (future)

🤝 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.


---

Do you want me to also **add usage instructions with sample API calls (like POST /api/projects, POST /api/proposals)** so recruiters/developers can quickly test the backend?
