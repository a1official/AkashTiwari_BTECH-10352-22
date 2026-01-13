import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import KanbanBoard from '../components/KanbanBoard';
import { Plus, Filter } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '', status: 'pending' });

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data.data);
        } catch (err) {
            console.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            if (editingTask) {
                await api.put(`/tasks/${editingTask._id}`, newTask);
            } else {
                await api.post('/tasks', newTask);
            }
            closeModal();
            fetchTasks();
        } catch (err) {
            alert(`Failed to ${editingTask ? 'update' : 'create'} task`);
        }
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        setNewTask({
            title: task.title,
            description: task.description,
            due_date: task.due_date.split('T')[0],
            status: task.status
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingTask(null);
        setNewTask({ title: '', description: '', due_date: '', status: 'pending' });
    };

    if (loading) return <div className="loading-screen">Loading your workspace...</div>;

    return (
        <div className="dashboard-container animate-fade-in">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1>My Projects</h1>
                    <p>Manage and track your tasks efficiently.</p>
                </div>
                <div className="header-right">
                    <button className="add-task-btn" onClick={() => setShowModal(true)}>
                        <Plus size={20} />
                        <span>New Task</span>
                    </button>
                </div>
            </header>

            <KanbanBoard tasks={tasks} refreshTasks={fetchTasks} onEditTask={openEditModal} />

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content glass">
                        <h3>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
                        <form onSubmit={handleCreateTask}>
                            <input
                                type="text"
                                placeholder="Task Title"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                required
                            />
                            <input
                                type="date"
                                value={newTask.due_date}
                                onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                                required
                            />
                            <select
                                value={newTask.status}
                                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <div className="modal-actions">
                                <button type="button" onClick={closeModal} className="cancel-btn">Cancel</button>
                                <button type="submit" className="submit-btn">
                                    {editingTask ? 'Update Task' : 'Create Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
        .dashboard-container {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }
        h1 { font-size: 2.5rem; font-weight: 800; color: var(--text-main); }
        p { color: var(--text-muted); }
        .add-task-btn {
          background: var(--primary);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          transition: transform 0.2s;
        }
        .add-task-btn:hover { transform: translateY(-3px); background: var(--primary-hover); }
        
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          width: 100%;
          max-width: 500px;
          padding: 2rem;
        }
        form { display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem; }
        input, textarea, select {
          padding: 0.8rem;
          background: var(--bg-dark);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: white;
        }
        .modal-actions { display: flex; gap: 1rem; margin-top: 1rem; }
        .cancel-btn { flex: 1; background: transparent; color: var(--text-muted); padding: 0.8rem; border-radius: 8px; border: 1px solid var(--glass-border); }
        .submit-btn { flex: 1; background: var(--primary); color: white; padding: 0.8rem; border-radius: 8px; font-weight: 600; }
        
        .loading-screen {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          color: var(--primary);
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
