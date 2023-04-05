import axios from "axios";

export default {
  actions: {
    async fetchData(ctx, token) {
      console.log(token, "           sadasdassdasada");
      let data = {
        id: 21312213,
        name: "mishsadaa",
        surname: "dorodniksadasdaov",
        phone: "8 800-555-35asdsad35",
      };
      if (token == "sadaksdljaskldjaksdldlksadjaskldjaiwdofqslkafjl") {
        data = {
          id: 21312,
          name: "misha",
          surname: "dorodnikov",
          phone: "8 800-555-3535",
        };
      }
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
      ctx.commit("updateData", data);
    },
  },
  mutations: {
    updateData(state, data) {
      state.surname = data.surname;
      state.name = data.name;
      state.phone = data.phone;
    },
  },
  state: {
    surname: "",
    name: "",
    phone: "",
  },
  getters: {
    getName: (state) => {
      return state.name;
    },
    getSurname: (state) => {
      return state.surname;
    },
    getPhone: (state) => {
      return state.phone;
    },
  },
};
