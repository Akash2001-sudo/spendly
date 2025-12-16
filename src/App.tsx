import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';
import logo from './assets/logo.png';

const App = () => {
  return (
    <>
      <div className="background-container"></div>
      <div className="container">
        <nav className="navbar">
          <a href="#home" className="navbar-brand">
            <img src={logo} alt="Spendly Logo" className="logo" />
            <span>Spendly</span>
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
