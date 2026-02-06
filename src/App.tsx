import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';
import logo from './assets/logo.png';

const App = () => {
  const [isAnimatedBackground, setIsAnimatedBackground] = useState(true);

  useEffect(() => {
    document.body.className = isAnimatedBackground ? 'animated-background' : 'normal-background';
  }, [isAnimatedBackground]);

  return (
    <>
      <button
        className="toggle-button"
        onClick={() => setIsAnimatedBackground(!isAnimatedBackground)}
        aria-label={isAnimatedBackground ? "Switch to normal background" : "Switch to animated background"}
      >
        {isAnimatedBackground ? "☀️" : "🌙"}
      </button>
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
    </>
  );
};

export default App;
