import { useContext, useState } from 'react'; // Import useState
import { Routes, Route, Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';
import logo from './assets/logo.png';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { AuthContext } from './context/AuthContext';
import { FaSignOutAlt, FaEdit } from 'react-icons/fa'; // Import the logout and edit icon
import MonthlySpendChart from './components/MonthlySpendChart'; // Import MonthlySpendChart
import { useGetExpenses } from './hooks/useExpenses'; // Import useGetExpenses
import EditProfileModal from './components/EditProfileModal'; // Import EditProfileModal

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext)!;
  const { data: expenses = [] } = useGetExpenses(); // Fetch expenses
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

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
        <div className="user-controls"> {/* New div for user controls */}
           <span className="me-3">Welcome, {user?.username}</span>
           <button 
             onClick={() => setIsModalOpen(true)} 
             className="btn btn-primary btn-icon btn-sm me-2" // Added styling for edit button
             title="Edit Profile"
           >
             <FaEdit />
           </button>
           <button onClick={logout} className="btn btn-danger btn-icon" title="Logout">
             <FaSignOutAlt />
           </button>
        </div>
      </nav>
      <div className="dashboard-content-row mt-4">
        <div className="dashboard-column dashboard-chart-column mb-4">
          <MonthlySpendChart expenses={expenses} /> {/* Render the chart */}
        </div>
        <div className="dashboard-column mb-4">
          <ExpenseForm />
        </div>
        <div className="dashboard-column mb-4">
          <ExpenseList />
        </div>
      </div>

      <EditProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

const PrivateRoute = ({ children }: { children: ReactNode }) => {
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