const STORAGE_KEY = 'draggable-todo-board-v1';

export const loadTasksFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error('Failed to load tasks from storage:', error);
    return null; // Indicates corrupted data
  }
  return [];
};

export const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error('Failed to save tasks to storage:', error);
    return false;
  }
};

export const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear storage:', error);
    return false;
  }
};