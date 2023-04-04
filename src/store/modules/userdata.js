import axios from "axios";
export default {
  actions: {
    async fetchData(state) {},
  },
  mutations: {},
  state: {
    token: localStorage.getItem("token") || "",
    surname: "",
    name: "",
  },
  getters: {},
};
