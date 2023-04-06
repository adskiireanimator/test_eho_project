import axios from "axios";

export default {
  actions: {
    login({ commit }, user) {
      commit("auth_request");
      commit("test_status", `${user.phoneNumber}       ${user.password}`);
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
          errors: [],
        };
      } else if (user.phoneNumber == "8 999-999-9999") {
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
        if (user.save_token) {
          localStorage.setItem("token", response.token);
        }
        commit("auth_success", response.token, user);
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
      localStorage.removeItem("name");
      localStorage.removeItem("surname");
      localStorage.removeItem("phone_number");
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
  state: {
    status: "",
    user: {},
    token: localStorage.getItem("token") || "",
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    accesToken: (state) => state.token,
  },
};
