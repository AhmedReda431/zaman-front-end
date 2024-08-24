import { defineStore } from "pinia";

export const useSpaceStore = defineStore("space", {
  state: () => ({
    token: null,
    space: null,
    step: 1,
    isUpdate: false,
  }),
  getters: {
    isSpace: (state) => !!state.token,
  },
  actions: {
    setToken(newToken) {
      this.token = newToken;
    },
    setStep(newStep) {
      this.step = newStep;
    },
    setUpdate(update) {
      this.isUpdate = update;
    },
    setSpace(newSpace) {
      this.space = newSpace;
      this.setStep(newSpace?.step);
    },
    clearSpace() {
      this.token = null;
      this.space = null;
      this.step = 1;
      this.isUpdate = false;
    },
  },
});
