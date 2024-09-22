import { defineStore } from "pinia";
enum InfosEnum {
  TOKEN_KEY = "token",
}
export const useInfosStore = defineStore("infos", {
  state: () => ({
    token: "",
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem(InfosEnum.TOKEN_KEY, token);
    },
    clean(){
        this.token = "";
        localStorage.removeItem(InfosEnum.TOKEN_KEY);
    }
  },
});
