import { useContext, useEffect, useState } from 'react'; // Import useState
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

const MOBILE_APK_URL = 'https://expo.dev/artifacts/eas/8q39qzGZKnctupBbYcMQqX.apk';
const MOBILE_APK_PROMO_STORAGE_KEY = 'spendly.mobile-apk-promo.dismissed.v1';
const MOBILE_APK_PROMO_CLOSE_ICON_URL =
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/icons/x-circle-fill.svg';

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext)!;
  const { data: expenses = [] } = useGetExpenses(); // Fetch expenses
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isPromoDismissed, setIsPromoDismissed] = useState(false);

  useEffect(() => {
    setIsPromoDismissed(localStorage.getItem(MOBILE_APK_PROMO_STORAGE_KEY) === 'true');
  }, []);

  const handleDismissPromo = () => {
    setIsPromoDismissed(true);
    localStorage.setItem(MOBILE_APK_PROMO_STORAGE_KEY, 'true');
  };

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
      {!isPromoDismissed ? (
        <section className="mobile-app-promo" aria-label="Download the Spendly mobile app">
          <div className="mobile-app-promo-copy">
            <span className="mobile-app-promo-badge">New</span>
            <p>Try the Android app for quicker on-the-go expense tracking.</p>
          </div>
          <div className="mobile-app-promo-actions">
            <a
              href={MOBILE_APK_URL}
              className="btn btn-primary mobile-app-promo-button"
              target="_blank"
              rel="noreferrer"
            >
              Download APK
            </a>
            <button
              type="button"
              className="mobile-app-promo-close"
              onClick={handleDismissPromo}
              aria-label="Dismiss mobile app promotion"
            >
              <img
                src={MOBILE_APK_PROMO_CLOSE_ICON_URL}
                alt=""
                className="mobile-app-promo-close-icon"
                aria-hidden="true"
              />
            </button>
          </div>
        </section>
      ) : null}
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
