import { useState } from 'react'
import {
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate
} from 'react-router-dom';

import Login from './pages/Auth/Login.jsx';
import SignUp from './pages/Auth/SignUp.jsx';
import Home from './pages/dashboard/Home.jsx';
import Income from './pages/dashboard/Income.jsx';
import Expense from './pages/dashboard/Expense.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';
import UserProvider from './context/userContext.jsx';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div>
      <UserProvider>
        <div>
          <Router>
            <Routes>
              <Route path="/" exact element={<Root />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/signup" exact element={<SignUp />} />
              <Route path="/dashboard" exact element={<Home />} />
              <Route path="/income" exact element={<Income />} />
              <Route path="/expense" exact element={<Expense />} />
              <Route path="/forgot-password" exact element={<ForgotPassword />} />
            </Routes>
          </Router>
        </div>

        <Toaster 
          toastOptions={{
            className: "toast",
            style: {
              fontSize: "14px",
              padding: "10px 15px",
              color: "#C6DEC6",
            }
          }}
        />
      </UserProvider>
    </div>
  )
}

export default App;

const Root = () => {
  // Check if user is localStorage authenticated
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
