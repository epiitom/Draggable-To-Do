import React, { useEffect, useRef } from 'react';

const TaskModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  title, 
  description, 
  column,
  onTitleChange,
  onDescriptionChange,
  onColumnChange,
  error,
  isEdit 
}) => {
  const titleInputRef = useRef(null);
  const modalRef = useRef(null);
  
  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter' && !e.shiftKey && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        onSave();
      }
    };
    
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, onSave]);
  
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(2,6,23,0.4)',
      backdropFilter: 'blur(2px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
      padding: '16px'
    }}>
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 18px 40px rgba(12,18,31,0.12)'
        }}
      >
        <h2 id="modal-title" style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#0F172A',
          marginBottom: '20px'
        }}>
          {isEdit ? 'Edit Task' : 'Create New Task'}
        </h2>
        
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="task-title" style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#0F172A',
            marginBottom: '6px'
          }}>
            Title <span style={{ color: '#DC2626' }}>*</span>
          </label>
          <input
            ref={titleInputRef}
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Enter task title"
            style={{
              width: '100%',
              height: '40px',
              padding: '8px 12px',
              border: `1px solid ${error ? '#DC2626' : '#E5E7EB'}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'border-color 150ms'
            }}
            onFocus={(e) => e.target.style.borderColor = error ? '#DC2626' : '#4F46E5'}
            onBlur={(e) => e.target.style.borderColor = error ? '#DC2626' : '#E5E7EB'}
          />
          {error && (
            <p style={{
              fontSize: '12px',
              color: '#DC2626',
              marginTop: '4px'
            }}>
              {error}
            </p>
          )}
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="task-description" style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#0F172A',
            marginBottom: '6px'
          }}>
            Description
          </label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Enter task description (optional)"
            rows="3"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'inherit',
              outline: 'none',
              resize: 'vertical',
              transition: 'border-color 150ms'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
            onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
          />
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="task-column" style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#0F172A',
            marginBottom: '6px'
          }}>
            Column
          </label>
          <select
            id="task-column"
            value={column}
            onChange={(e) => onColumnChange(e.target.value)}
            style={{
              width: '100%',
              height: '40px',
              padding: '8px 12px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'inherit',
              outline: 'none',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              transition: 'border-color 150ms'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
            onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              height: '40px',
              padding: '0 16px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#0F172A',
              cursor: 'pointer',
              transition: 'all 150ms'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#F8FAFB'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            style={{
              height: '40px',
              padding: '0 16px',
              backgroundColor: '#4F46E5',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 150ms'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#4338CA'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4F46E5'}
          >
            {isEdit ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;