import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-card glass">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Log in to manage your tasks effectively</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Logging in...' : (
              <>
                <LogIn size={20} />
                <span>Log In</span>
              </>
            )}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>

      <style jsx>{`
        .auth-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: calc(100vh - 80px);
          padding: 1rem;
        }
        .auth-card {
          width: 100%;
          max-width: 400px;
          padding: 3rem 2rem;
          text-align: center;
        }
        h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(to right, #be185d, #db2777);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .auth-subtitle {
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          font-size: 0.9rem;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .input-group {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-muted);
        }
        input {
          width: 100%;
          padding: 0.8rem 1rem 0.8rem 3rem;
          background: #fdf2f8;
          border: 1px solid rgba(190, 24, 93, 0.15);
          border-radius: 8px;
          color: var(--text-main);
          transition: border-color 0.3s;
        }
        input:focus {
          border-color: var(--primary);
        }
        .auth-btn {
          background: var(--primary);
          color: white;
          padding: 0.8rem;
          border-radius: 8px;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          transition: transform 0.2s, background 0.3s;
        }
        .auth-btn:hover:not(:disabled) {
          background: var(--primary-hover);
          transform: translateY(-2px);
        }
        .auth-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .error-message {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .auth-footer {
          margin-top: 2rem;
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        .auth-footer a {
          color: var(--primary);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Login;
