# 👨‍👩‍👧‍👦 FamBudget - Family Expense Tracker

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern web application for families to track, analyze, and manage household expenses collaboratively. Get real-time insights into spending patterns and make informed financial decisions together.

[Live Demo](https://fam-budget-3xsp.vercel.app/)

## Features

### 📊 **Dashboard Overview**
- Real-time expense metrics for current/previous months and years
- Daily and monthly average spending calculations
- Monthly spending trend visualization
- Recent transactions with family member avatars
- Total transactions and family members count
- Family members data of current month

### 👨‍👩‍👧‍👦 **Family Management**
- Add, edit, and delete family members
- Custom avatars for each member
- Individual spending tracking per member
- Month-over-month spending trends
- Last expense details for each member

### 💰 **Expense Tracking**
- Manual expense entry with detailed categorization
- 9 predefined expense categories
- Assign expenses to specific family members
- Search and filter expenses
- Edit and Delete options for each expense
- Bulk expense management

### 📈 **Advanced Analytics (Both Montly and Yearly)**
- Spending by category (Pie Chart)
- Family member comparison Montly(Bar Chart2)
- Daily spending patterns (Bar Chart1)
- Yearly spending trends (Area Chart)
- Highest/Lowest spending analysis
- Average spending monthly and yearly

### 🔐 **Security & User Management**
- JWT-based authentication
- Password encryption with bcrypt and genSalt
- Protected routes and API endpoints
- User-specific data isolation
- Cors configuration
- 7-day session persistence

### 📱 Mobile Responsive
FamBudget is fully responsive and works on:
- Desktop (1920px and above)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🖥️ Live Demo

- **Frontend URL:** `http://localhost:5173`  
- **Backend API:** `http://localhost:5000`  
- **API Documentation:** [View API Docs](#api-documentation)

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
  ```bash
  git clone https://github.com/sreenathreddy0404/FAM-BUDGET.git
  cd FAM-BUDGET
  ```

2. **Setup Backend**

  ```bash
  cd server
  npm install
  ```

3. **Setup Frontend**
  ```bash
  cd client
  npm install
  ```

4. **Environment Configuration**

  Create .env file in server/ directory:

  ```env
  MONGODB_URI=mongodb://localhost:27017/fambudget
  JWT_SECRET_KEY=your_super_secret_jwt_key_here
  PORT=5000
  ```

5. **Run the Application**

  Terminal 1 - Backend:
  
  ```bash
  cd server
  npm run dev'
  ```
  
  Terminal 2 - Frontend:
  
  ```bash
  cd client
  npm run dev
  ```
6. **Access the Application**
- **Frontend :** `http://localhost:5173`
- **Backend API :** `http://localhost:5000`



## 🤝 Contributing
1. Fork the repository
2. Create your feature branch 
  ```bash
  git checkout -b feature/AmazingFeature
  ```
2. Commit your changes
  ```bash
  git commit -m 'Add some AmazingFeature')
  ```
3. Push to the branch
   ```bash
   git push origin feature/AmazingFeature)
   ```
4. Open a Pull Request

## Development Guidelines
1. Follow existing code style
2. Add comments for complex logic
3. Update documentation as needed
4. Write meaningful commit messages

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments
- **Icons by [Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit
- **Charting with [Recharts](https://recharts.org/)** - Composable charting library built on React components
- **UI Styling with [Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **UI Components by [shadcn](https://ui.shadcn.com/docs)** - Reusable Components

## Dependencies Used
### 🎨 Frontend (React + Vite)
- **[Vite](https://vitejs.dev/)** – Fast frontend build tool
- **[React Router DOM](https://reactrouter.com/)** – Client-side routing
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)**  – Smooth animations transitions
- **[Recharts](https://recharts.org/)** – Data visualization & charts
- **[Lucide React](https://lucide.dev/)** – Beautiful & consistent icon library
- **[shadcn UI](https://ui.shadcn.com/docs/)** – Accessible UI primitives (Dialog, Tabs, Select, Label)
- **[Axios](https://axios-http.com/)** – Promise-based HTTP client for api management
- **[date-fns](https://date-fns.org/)** – Modern JavaScript date utilities
- **[react-hot-toast](https://react-hot-toast.com/)** – Toast notifications
  
### ⚙️ Backend (Node.js + Express)
- **[Node.js](https://nodejs.org/)** – JavaScript runtime environment
- **[Express.js](https://expressjs.com/)** – Web framework for APIs
- **[MongoDB](https://www.mongodb.com/)** – NoSQL database
- **[Mongoose](https://mongoosejs.com/)** – MongoDB object modeling
- **[JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)** – Authentication & authorization
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** – Secure password hashing
- **[dotenv](https://github.com/motdotla/dotenv)** – Environment variable management
- **[cors](https://github.com/expressjs/cors)** – Cross-Origin Resource Sharing
- 
## 📞 Support
For support, email [sreenathreddy0404@gmail.com] or create an issue in the GitHub repository.

## 📊 Project Status

![Last Commit](https://img.shields.io/github/last-commit/sreenathreddy0404/FAM-BUDGET)
![Open Issues](https://img.shields.io/github/issues/sreenathreddy0404/FAM-BUDGET)
![Open Pull Requests](https://img.shields.io/github/issues-pr/sreenathreddy0404/FAM-BUDGET)

<div align="center">
Made with ❤️ by Sreenath Reddy

⭐ Star this repo if you find it useful! ⭐

</div>
