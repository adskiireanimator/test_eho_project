import { createStore } from "vuex";
import registerphoto from "./modules/registerphoto";
import authorize from "./modules/authorize";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    authorize,
    registerphoto,
  },
});
