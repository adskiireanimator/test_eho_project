import axios from "axios";

export default {
  actions: {
    startRecovery(ctx, phoneNumber) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:3000/api/user/forgot-start",
          phone: phoneNumber,
          method: "POST",
        })
          .then((resp) => {
            const success = resp.data.success;
            const message = resp.data.message;
            if (success) {
              commit("phone_exists");
            }
            if (resp.data.errors) {
              commit("errors_exists", resp.data.errors);
            }
            resolve(resp);
          })
          .catch((err) => {
            commit("errors_exists", ["ошибка в соединении"]);
            reject(err);
          });
      });
    },
  },
  mutations: {
    phone_exists(state) {
      state.codestate = true;
    },
    errors_exists(state, errors) {
      state.errors = errors;
    },
  },
  state: {
    codestate: false,
    errors: [],
  },
  getters: {
    getRecoveryErrors(state) {
      return state.errors;
    },
    codeState(state) {
      return state.codeState;
    },
  },
};
