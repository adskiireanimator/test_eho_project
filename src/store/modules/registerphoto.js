export default {
  actions: {
    async newPhoto(ctx, e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      let reader = new FileReader();
      reader.onloadend = () => {
        ctx.commit("updatePhoto", reader.result);
      };
      await reader.readAsDataURL(files[0]);
    },
  },
  mutations: {
    updatePhoto(state, url) {
      state.photoUrl = url;
      state.photoShow = true;
    },
  },
  state: {
    photoUrl: "",
    photoShow: false,
  },
  getters: {
    currentPhoto(state) {
      return state.photoUrl;
    },
    refreshPhoto(state) {
      return state.photoShow;
    },
  },
};
