import axios from "axios";

export default {
  actions: {
    async fetchData(ctx) {
      /*
        axios({
            url: "http://localhost:3000/api/user",
            method: "GET",
          })
            .then((resp) => {
              const id = resp.data.id;
              const name = resp.data.name;
              const surname= resp.data.surname;
              const phone=resp.data.surname
              resolve(resp);
            })
            .catch((err) => {
              commit("auth_error");
              localStorage.removeItem("token");
              reject(err);
            });
            */
    },
  },
  mutations: {},
  state: {
    surname: "",
    name: "",
  },
  getters: {
    getName() {},
  },
};
