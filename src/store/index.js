import Vue from "vue";
import Vuex from "vuex";
import Note from "./modules/notes.js";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Note
  },
  plugins: [createPersistedState()]
});
