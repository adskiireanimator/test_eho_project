import axios from "axios";

export default {
  actions: {
    login({ commit }, user) {
      commit("auth_request");
      let response = {
        success: false,
        token: "sadaksdljaskldjaksdldlksadjaskldjaiwdofqslkafjl",
        message: "404",
        errors: ["такой пользователь не найден"],
      };
      if (
        user.phoneNumber == "8 999-999-9999" &&
        user.password == "1234567890"
      ) {
        response = {
          success: true,
          token: "sadaksdljaskldjaksdldlksadjaskldjaiwdofqslkafjl",
          message: "200",
        };
      } else if (user.phoneNumber == "8 999-999-9999") {
        response = {
          success: false,
          message: "401",
          errors: ["Пароль не подходит"],
        };
      } else {
        response = {
          success: false,
          message: "404",
          errors: ["такой пользователь не найден"],
        };
      }

      if (response.success) {
        if (user.save_token) {
          localStorage.setItem("token", response.token);
        }
        commit("auth_success", response.token);
      }

      if (response.errors) {
        commit("login_error", response.errors);
      }
      /*
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/api/auth/login",
          data: { phone: user.phoneNumber, password: user.password },
          method: "POST",
        })
          .then((resp) => {
            const success = resp.data.success;
            const message = resp.data.message;

            if (success) {
              commit("auth_success", resp.data.token);
              if (user.save_token) {
                localStorage.setItem("token", token);
              }
            }
            if (resp.data.errors) {
              commit("login_error", resp.data.errors);
            }

            resolve(resp);
          })
          .catch((err) => {
            commit("login_error", ["ошибка в соединении"]);
            reject(err);
          });
      });*/
    },

    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/api/user/registration",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const success = resp.data.success;
            const message = resp.data.message;

            if (success) {
              commit("auth_success", resp.data.token);
            }
            if (resp.data.errors) {
              commit("login_error", resp.data.errors);
            }
            resolve(resp);
          })
          .catch((err) => {
            commit("login_error", ["ошибка в соединении"]);
            reject(err);
          });
      });
    },

    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        resolve();
      });
    },
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      localStorage.removeItem("name");
      localStorage.removeItem("surname");
      localStorage.removeItem("phone_number");
      state.status = "success";
      state.token = token;
    },
    login_error(state, errors) {
      state.status = "error";
      state.errors = errors;
    },
    logout(state) {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      state.status = "";
      state.token = "";
    },
    test_status(state, str) {
      state.status = str;
    },
  },
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    errors: [],
  },
  getters: {
    isLoggedIn: (state) => localStorage.getItem("token") || !!state.token,
    authStatus: (state) => state.status,
    accesToken: (state) => state.token,
    getAutorizationErrors: (state) => state.errors,
  },
};
