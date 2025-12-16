import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';

const App = () => {
  return (
    <>
      <div className="bubbles-container">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      <div className="container">
        <nav className="navbar">
          <a href="#home" className="navbar-brand">
            Spendly
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
