import axios from "axios";

export default {
  actions: {
    login({ commit }, user, saveToken) {
      commit("auth_request");
      let response = {
        success: false,
        token: "sadaksdljaskldjaksdldlksadjaskldjaiwdofqslkafjl",
        message: "404",
        errors: ["такой пользователь не найден"],
      };
      if (user.phone_number == "79999999999" && user.password == "1234567890") {
        response = {
          success: true,
          token: "sadaksdljaskldjaksdldlksadjaskldjaiwdofqslkafjl",
          message: "200",
          errors: [],
        };
      } else if (user.phone_number == "79999999999") {
        response = {
          success: false,
          token: "sadaksdljaskldjaksdldlksadjaskldjaiwdofqslkafjl",
          message: "401",
          errors: ["Пароль не подходит"],
        };
      } else {
        response = {
          success: false,
          token: "sadaksdljaskldjaksdldlksadjaskldjaiwdofqslkafjl",
          message: "404",
          errors: ["такой пользователь не найден"],
        };
      }
      if (response.success) {
        if (saveToken) {
          console.log(41224114);
          commit("test_status", "работает");
          localStorage.setItem("token", token);
        }
        console.log(231231231231231);
        commit("auth_success", response.token, user);
        commit("test_status", "не работает");
      } else {
        // errors from server handler
      }

      /*
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/api/auth/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
      */
    },

    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/register",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },

    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        resolve();
      });
    },
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    test_status(state, str) {
      state.status = str;
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  state: {
    status: "",
    user: {},
    token: localStorage.getItem("token") || "",
  },
};
