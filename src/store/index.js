import { createStore } from "vuex";
import registerphoto from "./modules/registerphoto";
import authorize from "./modules/authorize";
import userdata from "./modules/userdata";
import passwordrecovery from "./modules/passwordrecovery";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    authorize,
    registerphoto,
    userdata,
    passwordrecovery,
  },
});
