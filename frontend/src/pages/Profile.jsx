import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Save, Trash2, AlertTriangle } from 'lucide-react';
import api from '../api/axios';

const Profile = () => {
    const { user, updateUser, logout } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            await updateUser({ name, email });
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('WARNING: This will permanently delete your account and all your tasks. Continue?')) {
            try {
                await api.delete('/users/me');
                logout();
            } catch (err) {
                alert('Failed to delete account');
            }
        }
    };

    return (
        <div className="profile-page animate-fade-in">
            <div className="profile-card glass">
                <div className="profile-header">
                    <div className="avatar">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <h2>Account Settings</h2>
                    <p>Update your personal information</p>
                </div>

                {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleUpdate}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <div className="input-with-icon">
                            <User size={20} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <div className="input-with-icon">
                            <Mail size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="save-btn" disabled={loading}>
                        <Save size={20} />
                        <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                </form>

                <div className="danger-zone">
                    <h3>Danger Zone</h3>
                    <p>Careful, these actions cannot be undone</p>
                    <button className="delete-account-btn" onClick={handleDeleteAccount}>
                        <Trash2 size={20} />
                        <span>Delete Account</span>
                    </button>
                </div>
            </div>

            <style jsx>{`
        .profile-page {
          display: flex;
          justify-content: center;
          padding: 4rem 1rem;
        }
        .profile-card {
          width: 100%;
          max-width: 600px;
          padding: 3rem;
        }
        .profile-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .avatar {
          width: 80px;
          height: 80px;
          background: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
          margin: 0 auto 1.5rem;
        }
        h2 { font-size: 1.8rem; margin-bottom: 0.5rem; }
        .profile-header p { color: var(--text-muted); }
        
        form { display: flex; flex-direction: column; gap: 2rem; }
        .input-group label { display: block; margin-bottom: 0.75rem; color: var(--text-muted); font-size: 0.9rem; }
        .input-with-icon { position: relative; display: flex; align-items: center; }
        .input-with-icon :global(svg) { position: absolute; left: 1rem; color: var(--text-muted); }
        .input-with-icon input {
          width: 100%;
          padding: 1rem 1rem 1rem 3.5rem;
          background: #fdf2f8;
          border: 1px solid rgba(190, 24, 93, 0.15);
          border-radius: 12px;
          color: var(--text-main);
        }
        .save-btn {
          background: var(--primary);
          color: white;
          padding: 1rem;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .message { padding: 1rem; border-radius: 8px; margin-bottom: 2rem; text-align: center; font-size: 0.9rem; }
        .success { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); }
        .error { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); }

        .danger-zone {
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 1px solid var(--glass-border);
        }
        .danger-zone h3 { color: #ef4444; margin-bottom: 1rem; }
        .danger-zone p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem; }
        .delete-account-btn {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          width: 100%;
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid rgba(239, 68, 68, 0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          transition: background 0.3s;
        }
        .delete-account-btn:hover { background: rgba(239, 68, 68, 0.2); }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .profile-page { padding: 1rem; }
          .profile-card { padding: 2rem 1.5rem; }
          .profile-card h1 { font-size: 1.75rem; }
          .form-grid { grid-template-columns: 1fr; }
          .form-actions { flex-direction: column; }
          .save-btn { width: 100%; }
        }
        @media (max-width: 480px) {
          .profile-card { padding: 1.5rem 1rem; }
          .profile-card h1 { font-size: 1.5rem; }
        }
      `}</style>
        </div>
    );
};

export default Profile;
