import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import babyDinoImg from '../assets/baby_dino_one.png';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup({ username, email, password });
      toast.success('Account created successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="login-signup-container">
        <div className="info-section">
          <img src={babyDinoImg} alt="Baby Dino" className="baby-dino-img" />
          <h2>Join <span className="animated-spendly">Spendly</span> Today!</h2>
          <p>Start your journey to financial clarity. Spendly helps you track, manage, and understand your expenses with ease.</p>
          <ul>
            <li>Secure account creation</li>
            <li>Intuitive expense tracking</li>
            <li>Insightful financial reports</li>
            <li>User-friendly interface</li>
          </ul>
          <p>Sign up now and gain control over your spending!</p>
        </div>
        <div className="card">
          <h2 className="text-center">Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Signup'}
            </button>
          </form>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <p className="text-center mt-3 developed-by">Developed by Akash with ❤️ in Bengaluru</p>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
