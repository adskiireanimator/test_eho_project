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
          name: "Misha",
          surname: "Dorodnikov",
          phone: "8 800-555-3535",
        };
      }
      /*
        axios({
            url: "http://localhost:3000/api/user",
            method: "GET",
          })
            .then((resp) => {
              ctx.commit("updateData", resp.data);
              resolve(resp);
            })
            .catch((err) => {
              commit("auth_error");
              reject(err);
            });
            */
      ctx.commit("updateData", data);
    },
  },
  mutations: {
    updateData(state, data) {
      state.id = data.id;
      state.surname = data.surname;
      state.name = data.name;
      state.phone = data.phone;
    },
  },
  state: {
    id: "",
    surname: "",
    name: "",
    phone: "",
  },
  getters: {
    getName: (state) => state.name,
    getSurname: (state) => state.surname,
    getPhone: (state) => state.phone,
  },
};
