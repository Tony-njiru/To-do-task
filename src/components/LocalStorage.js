//Ensures Todos get stored in browsers local storage
const LOCAL_STORAGE_KEY = 'todos';

export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
}
