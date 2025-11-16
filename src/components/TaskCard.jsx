import React from 'react';
import { DragIcon, EditIcon, DeleteIcon } from '../icons/Icons';

const TaskCard = ({ 
  task, 
  onEdit, 
  onDelete, 
  onDragStart, 
  onDragEnd,
  isDragging 
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Could trigger selection mode here
    }
  };
  
  return (
    <div
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      tabIndex={0}
      role="button"
      aria-grabbed={isDragging}
      aria-label={`Task: ${task.title}`}
      onKeyDown={handleKeyDown}
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(15,23,42,0.04)',
        borderRadius: '10px',
        padding: '10px 12px',
        marginBottom: '12px',
        boxShadow: '0 6px 18px rgba(12,18,31,0.06)',
        cursor: isDragging ? 'grabbing' : 'grab',
        opacity: isDragging ? 0.9 : 1,
        transform: isDragging ? 'scale(1.02)' : 'translateY(0)',
        transition: 'transform 160ms cubic-bezier(.2,.9,.2,1), box-shadow 160ms cubic-bezier(.2,.9,.2,1)',
        userSelect: 'none'
      }}
      onMouseEnter={(e) => {
        if (!isDragging) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 10px 24px rgba(12,18,31,0.09)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 6px 18px rgba(12,18,31,0.06)';
        }
      }}
    >
      <div 
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6B7280',
          flexShrink: 0,
          cursor: 'grab'
        }}
        aria-label="Drag handle"
      >
        <DragIcon />
      </div>
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '500',
          color: '#0F172A',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          marginBottom: task.description ? '4px' : 0
        }}>
          {task.title}
        </div>
        {task.description && (
          <div style={{
            fontSize: '12px',
            fontWeight: '400',
            color: '#6B7280',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: '1.4'
          }}>
            {task.description}
          </div>
        )}
      </div>
      
      <div style={{
        display: 'flex',
        gap: '8px',
        flexShrink: 0
      }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          aria-label={`Edit task: ${task.title}`}
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '6px',
            color: '#6B7280',
            cursor: 'pointer',
            transition: 'all 150ms'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F8FAFB';
            e.currentTarget.style.color = '#4F46E5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#6B7280';
          }}
        >
          <EditIcon />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task);
          }}
          aria-label={`Delete task: ${task.title}`}
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '6px',
            color: '#6B7280',
            cursor: 'pointer',
            transition: 'all 150ms'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FEF2F2';
            e.currentTarget.style.color = '#DC2626';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#6B7280';
          }}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;