/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef } from 'react';
import Column from './components/Column';
import TaskModal from './components/TaskModal';
import Toast from './components/Toast';
import { PlusIcon } from './icons/Icons';
import { loadTasksFromStorage, saveTasksToStorage, clearStorage } from './utils/storage';
import { getDropIndex, reorderTasks } from './utils/dragDrop';
import './App.css';

const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDesc, setModalDesc] = useState('');
  const [modalColumn, setModalColumn] = useState('todo');
  const [titleError, setTitleError] = useState('');
  const [toast, setToast] = useState(null);
  const [appState, setAppState] = useState({ storageError: false, loaded: false });
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [dropIndex, setDropIndex] = useState(null);
  const announceRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Load tasks on mount
  useEffect(() => {
    const loaded = loadTasksFromStorage();
    if (loaded === null) {
      setAppState({ storageError: true, loaded: true });
    } else {
      setTasks(loaded);
      setAppState({ storageError: false, loaded: true });
    }
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    if (tasks.length > 0 || tasks.length === 0) {
      const success = saveTasksToStorage(tasks);
      if (!success) {
        showToast('Unable to save changes; please check browser storage settings', 'error');
      }
    }
  }, [tasks]);

  const announce = (message) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setModalTitle('');
    setModalDesc('');
    setModalColumn('todo');
    setTitleError('');
    setShowModal(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalTitle(task.title);
    setModalDesc(task.description || '');
    setModalColumn(task.column);
    setTitleError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setModalTitle('');
    setModalDesc('');
    setModalColumn('todo');
    setTitleError('');
  };

  const handleSaveTask = () => {
    if (!modalTitle.trim()) {
      setTitleError('Title is required');
      return;
    }

    if (editingTask) {
      // Edit existing task
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === editingTask.id
            ? {
                ...t,
                title: modalTitle.trim(),
                description: modalDesc.trim(),
                column: modalColumn,
                updatedAt: new Date().toISOString()
              }
            : t
        )
      );
      announce(`Task "${modalTitle}" updated`);
      showToast('Task updated');
    } else {
      // Create new task
      const newTask = {
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: modalTitle.trim(),
        description: modalDesc.trim(),
        column: modalColumn,
        position: tasks.filter(t => t.column === modalColumn).length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      announce(`Task "${modalTitle}" created`);
      showToast('Task created');
    }

    closeModal();
  };

  const handleDeleteTask = (task) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${task.title}"?`);
    if (confirmed) {
      setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
      announce(`Task "${task.title}" deleted`);
      showToast('Task deleted');
    }
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', task.id);
    announce(`Moving task "${task.title}" - select drop target`);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
    setDropIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    const columnEl = e.currentTarget;
    const columnId = columnEl.dataset.column;
    
    if (!draggedTask || !columnId) return;

    const index = getDropIndex(columnEl, e.clientY);
    setDragOverColumn(columnId);
    setDropIndex(index);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    const columnId = e.currentTarget.dataset.column;
    if (columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDragLeave = (e) => {
    if (e.currentTarget === e.target) {
      setDragOverColumn(null);
      setDropIndex(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    
    const columnEl = e.currentTarget;
    const targetColumn = columnEl.dataset.column;
    
    if (!draggedTask || !targetColumn) return;

    const index = getDropIndex(columnEl, e.clientY);
    const reordered = reorderTasks(tasks, draggedTask.id, targetColumn, index);
    
    setTasks(reordered);
    
    const columnName = COLUMNS.find(c => c.id === targetColumn)?.title || targetColumn;
    announce(`Task "${draggedTask.title}" moved to ${columnName}`);
    showToast('Saved');
    
    handleDragEnd();
  };

  const handleClearCorruptData = () => {
    clearStorage();
    setAppState({ storageError: false, loaded: true });
    setTasks([]);
    showToast('Storage cleared');
  };

  return (
    <div className="app">
      <div 
        ref={announceRef}
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
      />

      {appState.storageError && (
        <div style={{
          backgroundColor: '#FEF2F2',
          border: '1px solid #FEE2E2',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <span style={{
            fontSize: '14px',
            color: '#DC2626'
          }}>
            Saved data could not be loaded. Starting fresh.
          </span>
          <button
            onClick={handleClearCorruptData}
            style={{
              padding: '6px 12px',
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Clear corrupt data
          </button>
        </div>
      )}

      <header className="header">
        <h1 className="title">Draggable To-Do</h1>
        <p className="subtitle">Create, edit, delete and drag tasks between columns</p>
      </header>

      <div className="controls">
        <button
          onClick={openCreateModal}
          className="add-button"
          aria-label="Add new task"
        >
          <PlusIcon />
          <span>Add Task</span>
        </button>
      </div>

      <div className="board">
        {COLUMNS.map(column => (
          <Column
            key={column.id}
            column={column}
            tasks={tasks}
            onEdit={openEditModal}
            onDelete={handleDeleteTask}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggedTask={draggedTask}
            isDropTarget={dragOverColumn === column.id}
            dropIndex={dragOverColumn === column.id ? dropIndex : null}
          />
        ))}
      </div>

      <TaskModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={handleSaveTask}
        title={modalTitle}
        description={modalDesc}
        column={modalColumn}
        onTitleChange={setModalTitle}
        onDescriptionChange={setModalDesc}
        onColumnChange={setModalColumn}
        error={titleError}
        isEdit={!!editingTask}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
