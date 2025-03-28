
# E-Commerce

eMart is an online e-commerce store.

## 🚀 Demo

<a href='https://eMart-by-karan.vercel.app'> 
    <img src='./demo.png'>
    </img>
</a>

## ✨ Features

- Guest cart (cart for unauthorized user)
- Admin can create, update and delete products
- Razorpay payment gateway
- User can track their orders


## 💻 Tech Stack

**Frontend:** React, TailwindCSS, Zustand

**Backend:** Node, Express

**Database:** MongoDB


## 🛠️ Installation

Installation with npm

```bash
  cd backend
  npm install
  nodemon index.js
```

```bash
  cd frontend
  cd user
  npm install
  npm run dev
``` 

```bash
  cd frontend
  cd admin
  npm install
  npm run dev
```  


## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your .env file (backend)

`PORT = ...`

`DB_URL = ...`

`JWT_SECRET = ...`

`CLOUD_NAME = ...` 

`API_KEY = ...` 

`API_SECRET = ...`

`ADMIN_EMAIL = ...`

`ADMIN_PASS = ...`

`RAZORPAY_KEY_ID = ...`

`RAZORPAY_KEY_SECRET = ...`

`FRONTEND_URL = ...`

`ADMIN_URL = ...`