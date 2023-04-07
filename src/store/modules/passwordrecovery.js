import axios from "axios";

export default {
  actions: {
    startRecovery(ctx, phoneNumber) {
      let response = {};
      if (phoneNumber == "8 999-999-9999") {
        response.success = true;
        response.message = ";jhdfshjuklsdjhkflknhjasfhjk";
      } else {
        response.success = false;
        response.message = "safsafafaf";
        response.errors = ["номера телефона нет в нашей базе"];
      }
      if (response.success) {
        ctx.commit("phone_exists");
      }
      if (response.errors) {
        ctx.commit("errors_exists", response.errors);
      }
      /*
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
              ctx.commit("phone_exists");
            }
            if (resp.data.errors) {
              ctx.commit("errors_exists", resp.data.errors);
            }
            resolve(resp);
          })
          .catch((err) => {
            ctx.commit("errors_exists", ["ошибка в соединении"]);
            reject(err);
          });
      });
      */
    },
    endRecovery(ctx, data) {
      let response = {};
      if (data.code == "5555") {
        response.message = "sadjnksajdma";
        response.success = true;
        response.token = "sadaksdljaskldjaksdldlksadjaskldjaiwdofqslkafjl";
      } else {
        response.message = "sadjnksajdma";
        response.success = false;
        response.errors = ["код неверный"];
      }

      if (response.success) {
        ctx.commit("code_correct", response.token);
      }
      if (response.errors) {
        ctx.commit("errors_exists", response.errors);
      }
      /*
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
      });*/
    },
  },
  mutations: {
    phone_exists(state) {
      state.codeState = true;
    },
    code_correct(state, token) {
      localStorage.setItem("token", token);
      state.codeState = false;
    },
    errors_exists(state, errors) {
      state.errors = errors;
    },
  },
  state: {
    codeState: false,
    errors: [],
  },
  getters: {
    getRecoveryErrors: (state) => state.errors,
    codeState: (state) => state.codeState,
  },
};
