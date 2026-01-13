import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import api from '../api/axios';
import { Clock, AlertCircle, CheckCircle2, Trash2, Edit2 } from 'lucide-react';

const COLUMNS = [
    { id: 'pending', title: 'Pending', icon: <Clock size={20} className="text-pending" />, color: 'var(--pending)' },
    { id: 'in-progress', title: 'In Progress', icon: <AlertCircle size={20} className="text-progress" />, color: 'var(--progress)' },
    { id: 'completed', title: 'Completed', icon: <CheckCircle2 size={20} className="text-completed" />, color: 'var(--completed)' },
];

const KanbanBoard = ({ tasks, refreshTasks, onEditTask }) => {
    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        try {
            // Find the task
            const task = tasks.find(t => t._id === draggableId);
            if (!task) return;

            // Update status in backend
            await api.put(`/tasks/${draggableId}`, { status: destination.droppableId });

            // Refresh to get updated state
            refreshTasks();
        } catch (err) {
            console.error('Failed to update task status');
        }
    };

    const deleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/${id}`);
                refreshTasks();
            } catch (err) {
                alert('Failed to delete task');
            }
        }
    };

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
                                {tasks.filter(t => t.status === column.id).length}
                            </span>
                        </div>

                        <Droppable droppableId={column.id}>
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableId}
                                    ref={provided.innerRef}
                                    className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                                >
                                    {tasks
                                        .filter((task) => task.status === column.id)
                                        .map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`task-card glass ${snapshot.isDragging ? 'dragging' : ''}`}
                                                    >
                                                        <div className="task-card-header">
                                                            <h4>{task.title}</h4>
                                                            <div className="task-actions">
                                                                <button className="edit-btn" onClick={() => onEditTask(task)}>
                                                                    <Edit2 size={16} />
                                                                </button>
                                                                <button className="delete-btn" onClick={() => deleteTask(task._id)}>
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
          background: rgba(190, 24, 93, 0.05);
          padding: 2px 10px;
          border-radius: 20px;
          font-size: 0.85rem;
          color: var(--primary);
        }
        .task-list {
          flex: 1;
          background: rgba(190, 24, 93, 0.02);
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
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .task-card:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(190, 24, 93, 0.1); }
        .task-card.dragging { box-shadow: 0 20px 40px rgba(190, 24, 93, 0.2); opacity: 0.9; }
        .task-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; }
        .task-card-header h4 { font-weight: 600; color: var(--text-main); }
        .task-desc { color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .task-card-footer { display: flex; align-items: center; justify-content: space-between; }
        .due-date { display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; color: var(--text-muted); }
        .task-actions { display: flex; gap: 0.5rem; }
        .delete-btn { color: var(--text-muted); background: transparent; padding: 4px; border-radius: 4px; transition: color 0.2s; }
        .edit-btn:hover { color: var(--primary); background: rgba(99, 102, 241, 0.1); }
        .delete-btn:hover { color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        
        @media (max-width: 1024px) {
          .kanban-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </DragDropContext>
    );
};

export default KanbanBoard;
