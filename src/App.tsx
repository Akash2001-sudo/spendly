import React, { useContext } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';
import logo from './assets/logo.png';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { AuthContext } from './context/AuthContext';

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext)!;

  return (
    <div className="container">
      <nav className="navbar">
        <a href="#home" className="navbar-brand">
          <img src={logo} alt="Spendly Logo" className="logo" />
          <span className="spendly-text">
            <span>S</span>
            <span>p</span>
            <span>e</span>
            <span>n</span>
            <span>d</span>
            <span>l</span>
            <span>y</span>
          </span>
        </a>
        <div className="d-flex align-items-center">
           <span className="me-3">Welcome, {user?.username}</span>
           <button onClick={logout} className="btn btn-outline-danger btn-sm">Logout</button>
        </div>
      </nav>
      <div className="row mt-4">
        <div className="col-lg-6 mb-4">
          <ExpenseForm />
        </div>
        <div className="col-lg-6">
          <ExpenseList />
        </div>
      </div>
    </div>
  );
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useContext(AuthContext)!;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;