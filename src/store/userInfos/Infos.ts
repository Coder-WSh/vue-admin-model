import { defineStore } from "pinia";

export const useInfosStore = defineStore("infos", {
  state: () => ({
    token: "",
  }),
  actions: {
  setToken(token:string){
    this.token=token
  },

  },
});
