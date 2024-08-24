import { defineStore } from "pinia";

export const useBookStore = defineStore("book", {
  state: () => ({
    token: null,
    book: null,
  }),
  getters: {
    isBook: (state) => !!state.token,
  },
  actions: {
    setToken(newToken) {
      this.token = newToken;
    },
    setBook(newbook) {
      this.book = newbook;
    },
    clearBook() {
      this.token = null;
      this.book = null;
    },
  },
});
