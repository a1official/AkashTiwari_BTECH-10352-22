import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar glass">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/ozi-logo.png" alt="Ozi" className="logo-img" />
        </Link>

        {user ? (
          <div className="nav-links">
            <Link to="/dashboard" className="nav-link">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/profile" className="nav-link">
              <User size={20} />
              <span>Profile</span>
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </div>
        )}
      </div>

      <style jsx>{`
        .navbar {
          position: sticky;
          top: 1rem;
          margin: 0 1rem;
          padding: 1rem 2rem;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-container {
          width: 100%;
          max-width: 1200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
        }
        .logo-img {
          height: 96px;
          width: auto;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: var(--text-main);
        }
        .signup-btn {
          background: var(--primary);
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          transition: background 0.3s;
        }
        .signup-btn:hover {
          background: var(--primary-hover);
        }
        .logout-btn {
          background: transparent;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
        }
        .logout-btn:hover {
          color: #ef4444;
        }
        @media (max-width: 768px) {
          .navbar {
            margin: 0 0.5rem;
            padding: 0.75rem 1rem;
          }
          .logo-img {
            height: 60px;
          }
          .nav-link span, .logout-btn span {
            display: none;
          }
          .nav-links {
            gap: 0.75rem;
          }
        }
        @media (max-width: 480px) {
          .logo-img {
            height: 48px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
