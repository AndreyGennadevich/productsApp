import { createStore } from "vuex";
import citys from "./modules/citys";
import category from "./modules/category";

export default createStore({
  modules: {
    citys,
    category,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});