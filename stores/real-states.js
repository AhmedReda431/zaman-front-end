import { defineStore } from "pinia";

export const useRealStateStore = defineStore("realState", {
  state: () => ({
    realState: null,
    step: 1,
    isUpdate: false,
  }),
  getters: {
    isRealState: (state) => !!state.realState,
  },
  actions: {
    setStep(newStep) {
      this.step = newStep;
    },
    setUpdate(update) {
      this.isUpdate = update;
    },
    setRealState(newRealState) {
      this.realState = newRealState;
      this.setStep(newRealState?.step);
    },
    clearRealState() {
      this.realState = null;
      this.step = 1;
      this.isUpdate = false;
    },
  },
});
