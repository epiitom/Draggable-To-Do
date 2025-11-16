export const getDropIndex = (columnEl, mouseY) => {
  const cards = Array.from(columnEl.querySelectorAll('.task-card:not(.dragging)'));
  
  let dropIndex = 0;
  
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const rect = card.getBoundingClientRect();
    const cardMiddle = rect.top + rect.height / 2;
    
    if (mouseY < cardMiddle) {
      dropIndex = i;
      break;
    } else {
      dropIndex = i + 1;
    }
  }
  
  return dropIndex;
};

export const reorderTasks = (tasks, taskId, targetColumn, targetIndex) => {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return tasks;
  
  // Remove task from current position
  const filteredTasks = tasks.filter(t => t.id !== taskId);
  
  // Get tasks in target column
  const columnTasks = filteredTasks.filter(t => t.column === targetColumn);
  const otherTasks = filteredTasks.filter(t => t.column !== targetColumn);
  
  // Insert at target index
  const updatedTask = {
    ...task,
    column: targetColumn,
    updatedAt: new Date().toISOString()
  };
  
  columnTasks.splice(targetIndex, 0, updatedTask);
  
  // Reassign positions
  const finalTasks = [...otherTasks, ...columnTasks].map((t, idx) => ({
    ...t,
    position: idx
  }));
  
  return finalTasks;
};