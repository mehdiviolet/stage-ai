export const session = {
  set(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error session", error);
    }
  },

  get(key) {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(key) : null;
    } catch (error) {
      console.error("error get session", error);
    }
  },

  remove(key) {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error("Errore remove session", error);
    }
  },

  clear() {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("Error clear session", error);
    }
  },
};
