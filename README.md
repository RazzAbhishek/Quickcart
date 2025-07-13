# 🛒 Quickcart

Quickcart is a full-featured e-commerce web application built using the MERN stack (MongoDB, Express, React, Node.js). It supports user authentication, product listings, shopping cart, order management, and payment integration via PayPal.

---

## 📦 Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **State Management**: Redux Toolkit
- **Payment Gateway**: PayPal Sandbox
- **Deployment**: Vercel (Backend) & Vercel (Frontend)

---

## 🚀 Features

- 👤 User registration and login
- 🔐 JWT-based authentication
- 🛍️ Browse and filter products
- 🛒 Add/remove items in cart (with guest support)
- 📦 Place and track orders
- 💳 Payment integration with PayPal
- 🔍 Search and sort products
- 📱 Responsive UI

---

## 🛠️ Project Structure

quickcart/
├── backend/ # Node.js/Express API
│ └── config/
│ └── data/
│ ├── models/
│ ├── routes/
│ ├── .env
│ ├── package.json
│ └── server.js
│ └── seeder.js
├── frontend/ # React + Vite Frontend
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── redux/
│ │ └── main.jsx
│ │ ├── index.css
│ │ ├── app.jsx
│ └── vite.config.js
│ └── .env
│ └── package.json
│ └── tailwind.config.js
├── .gitignore
└── README.md


---

## 🔧 Getting Started (Development)

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/quickcart.git
cd quickcart


cd backend
npm install
touch .env

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id

npm run dev


cd ../frontend
npm install
npm run dev


📝 License
This project is open-source and available under the MIT License.

👨‍💻 Author
Developed by Abhishek Raj
📧 razz.abhishek1632@gmail.com
🔗 GitHub:https://github.com/RazzAbhishek/RazzAbhishek
🔗 LinkedIn:https://www.linkedin.com/in/abhishek-raj-0b4b6a226/
