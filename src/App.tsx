import { useContext } from 'react';
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
import { FaSignOutAlt } from 'react-icons/fa'; // Import the logout icon
import MonthlySpendChart from './components/MonthlySpendChart'; // Import MonthlySpendChart
import { useGetExpenses } from './hooks/useExpenses'; // Import useGetExpenses

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext)!;
  const { data: expenses = [] } = useGetExpenses(); // Fetch expenses

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