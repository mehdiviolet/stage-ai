export const local = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("error set", error);
    }
  },

  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item && JSON.parse(item);
    } catch (error) {
      console.error("error get", error);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error remove", error);
    }
  },

  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.log("Error clear", error);
    }
  },
};
