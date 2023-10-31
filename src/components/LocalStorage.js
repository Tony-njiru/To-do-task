
export const LocalStorage = {
    // Get data from local storage
    get: (key, defaultValue) => {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
      } catch (error) {
        console.error('Local storage get error:', error);
        return defaultValue;
      }
    },
  
    // Set data in local storage
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Local storage set error:', error);
      }
    },
  
    // Remove data from local storage
    remove: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Local storage remove error:', error);
      }
    },
  };
  
