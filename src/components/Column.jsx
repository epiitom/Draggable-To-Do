import React from 'react';
import TaskCard from './TaskCard';

const Column = ({ 
  column, 
  tasks, 
  onEdit, 
  onDelete, 
  onDragStart, 
  onDragEnd,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  draggedTask,
  isDropTarget,
  dropIndex
}) => {
  const columnTasks = tasks.filter(t => t.column === column.id);
  
  return (
    <div
      data-column={column.id}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{
        backgroundColor: isDropTarget ? 'rgba(79,70,229,0.03)' : '#FFFFFF',
        borderRadius: '12px',
        padding: '16px',
        border: isDropTarget ? '2px dashed rgba(79,70,229,0.12)' : '1px solid rgba(15,23,42,0.04)',
        boxShadow: '0 6px 18px rgba(12,18,31,0.06)',
        minHeight: '200px',
        transition: 'all 150ms'
      }}
    >
      <h2 style={{
        fontSize: '16px',
        fontWeight: '500',
        color: '#0F172A',
        marginBottom: '16px'
      }}>
        {column.title}
      </h2>
      
      <div className="task-list">
        {columnTasks.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '32px 16px',
            fontSize: '13px',
            color: '#6B7280'
          }}>
            No tasks — add one using the "Add Task" button
          </div>
        ) : (
          <>
            {columnTasks.map((task, index) => (
              <React.Fragment key={task.id}>
                {draggedTask && dropIndex === index && draggedTask.column !== column.id && (
                  <div style={{
                    height: '60px',
                    border: '2px dashed rgba(79,70,229,0.18)',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(79,70,229,0.03)',
                    marginBottom: '12px'
                  }} />
                )}
                <TaskCard
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onDragStart={(e) => onDragStart(e, task)}
                  onDragEnd={onDragEnd}
                  isDragging={draggedTask?.id === task.id}
                />
              </React.Fragment>
            ))}
            {draggedTask && dropIndex === columnTasks.length && (
              <div style={{
                height: '60px',
                border: '2px dashed rgba(79,70,229,0.18)',
                borderRadius: '10px',
                backgroundColor: 'rgba(79,70,229,0.03)',
                marginBottom: '12px'
              }} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Column;