import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import api from '../api/axios';
import { Clock, AlertCircle, CheckCircle2, Trash2, Edit2 } from 'lucide-react';

const COLUMNS = [
    { id: 'pending', title: 'Pending', icon: <Clock size={20} className="text-pending" />, color: 'var(--pending)' },
    { id: 'in-progress', title: 'In Progress', icon: <AlertCircle size={20} className="text-progress" />, color: 'var(--progress)' },
    { id: 'completed', title: 'Completed', icon: <CheckCircle2 size={20} className="text-completed" />, color: 'var(--completed)' },
];

const KanbanBoard = ({ tasks: initialTasks, refreshTasks, onEditTask }) => {
    const [localTasks, setLocalTasks] = useState(initialTasks);
    const [enabled, setEnabled] = useState(false);

    // Sync local state with props
    useEffect(() => {
        setLocalTasks(initialTasks);
    }, [initialTasks]);

    // Fix for React 18 Strict Mode - delay enabling droppable
    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));
        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        // Optimistic update - update local state immediately
        const updatedTasks = localTasks.map(task =>
            task._id === draggableId ? { ...task, status: destination.droppableId } : task
        );
        setLocalTasks(updatedTasks);

        try {
            await api.put(`/tasks/${draggableId}`, { status: destination.droppableId });
        } catch (err) {
            console.error('Failed to update task status');
            // Rollback on error
            refreshTasks();
        }
    };

    const deleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            // Optimistic delete
            setLocalTasks(prev => prev.filter(t => t._id !== id));
            try {
                await api.delete(`/tasks/${id}`);
            } catch (err) {
                alert('Failed to delete task');
                refreshTasks();
            }
        }
    };

    if (!enabled) {
        return null;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-grid">
                {COLUMNS.map((column) => (
                    <div key={column.id} className="kanban-column">
                        <div className="column-header">
                            <div className="column-title">
                                {column.icon}
                                <h3>{column.title}</h3>
                            </div>
                            <span className="task-count">
                                {localTasks.filter(t => t.status === column.id).length}
                            </span>
                        </div>

                        <Droppable droppableId={column.id}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                                >
                                    {localTasks
                                        .filter((task) => task.status === column.id)
                                        .map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`task-card glass ${snapshot.isDragging ? 'dragging' : ''}`}
                                                        style={{
                                                            ...provided.draggableProps.style,
                                                            cursor: snapshot.isDragging ? 'grabbing' : 'grab'
                                                        }}
                                                    >
                                                        <div className="task-card-header">
                                                            <h4>{task.title}</h4>
                                                            <div className="task-actions">
                                                                <button className="edit-btn" onClick={(e) => { e.stopPropagation(); onEditTask(task); }}>
                                                                    <Edit2 size={16} />
                                                                </button>
                                                                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); deleteTask(task._id); }}>
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <p className="task-desc">{task.description}</p>
                                                        <div className="task-card-footer">
                                                            <span className="due-date">
                                                                <Clock size={14} />
                                                                {new Date(task.due_date).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .kanban-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          min-height: 70vh;
        }
        .kanban-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .column-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0.5rem;
        }
        .column-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .column-title h3 { font-size: 1.1rem; font-weight: 700; color: var(--text-main); }
        .text-pending { color: var(--pending); }
        .text-progress { color: var(--progress); }
        .text-completed { color: var(--completed); }
        .task-count {
          background: rgba(190, 24, 93, 0.08);
          padding: 2px 10px;
          border-radius: 20px;
          font-size: 0.85rem;
          color: var(--primary);
        }
        .task-list {
          flex: 1;
          background: rgba(190, 24, 93, 0.03);
          border-radius: 16px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border: 1px dashed var(--glass-border);
          transition: background 0.2s;
        }
        .dragging-over { background: rgba(190, 24, 93, 0.08); }
        .task-card {
          padding: 1.25rem;
          background: #ffffff;
          border: 1px solid var(--glass-border);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .task-card:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(190, 24, 93, 0.1); }
        .task-card.dragging { box-shadow: 0 20px 40px rgba(190, 24, 93, 0.2); opacity: 0.95; }
        .task-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; }
        .task-card-header h4 { font-weight: 600; color: var(--text-main); }
        .task-desc { color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .task-card-footer { display: flex; align-items: center; justify-content: space-between; }
        .due-date { display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; color: var(--text-muted); }
        .task-actions { display: flex; gap: 0.5rem; }
        .edit-btn, .delete-btn { color: var(--text-muted); background: transparent; padding: 4px; border-radius: 4px; transition: all 0.2s; }
        .edit-btn:hover { color: var(--primary); background: rgba(190, 24, 93, 0.08); }
        .delete-btn:hover { color: #ef4444; background: rgba(239, 68, 68, 0.08); }
        
        
        @media (max-width: 1024px) {
          .kanban-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .kanban-grid { gap: 1.25rem; }
          .kanban-column { padding: 1rem; }
          .column-header h3 { font-size: 1rem; }
          .task-card { padding: 1rem; }
          .task-card-header h4 { font-size: 0.95rem; }
        }
        @media (max-width: 480px) {
          .kanban-grid { gap: 1rem; }
          .kanban-column { padding: 0.75rem; min-height: 150px; }
          .task-desc { font-size: 0.85rem; }
          .due-date { font-size: 0.75rem; }
        }
      `}</style>
        </DragDropContext>
    );
};

export default KanbanBoard;
