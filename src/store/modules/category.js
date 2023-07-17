import { getCategory } from "@/api/getCategory";
import { getProducts } from "@/api/getProducts";

export default {
  namespaced: true,
  modules: {},
  state: {
    categoriesList: null,
    selectCategory: null,
    products: null,
    productsLoad: true,
    categoryLoad: true,
  },
  getters: {},
  mutations: {
    UPDATE_CATEGORIES(state, data) {
      state.categoriesList = data;
    },
    CHOICE_CATEGORY(state, slug) {
      state.selectCategory = state.categoriesList.filter(
        (c) => c.slug === slug
      )[0];
    },
    UPDATE_LOAD_STATE(state, { name, value }) {
      state[name] = value;
    },
    UPDATE_PRODUCTS(state, products) {
      state.products = products;
    },
  },
  actions: {
    UpdateCategories({ commit }, data) {
      commit("UPDATE_CATEGORIES", data);
    },
    GetCategories({ dispatch }) {
      dispatch("UpdateLoadState", { name: "categoryLoad", value: true });
      dispatch("UpdateCategories", null);
      const id = localStorage.getItem("cityID")
        ? localStorage.getItem("cityID")
        : 1;
      getCategory(id)
        .then((res) => dispatch("UpdateCategories", res?.tags))
        .then(() =>
          dispatch("UpdateLoadState", { name: "categoryLoad", value: false })
        );
    },
    ChoiceCategory({ commit, dispatch }, slug) {
      dispatch("UpdateLoadState", { name: "productsLoad", value: true });
      commit("CHOICE_CATEGORY", slug);
      getProducts(localStorage.getItem("cityID"), slug)
        .then((res) => dispatch("UpdateProducts", res?.products))
        .then(() => dispatch("UpdateLoadState", { name: "productsLoad", value: false }));
    },
    UpdateLoadState({commit}, obj) {
      commit("UPDATE_LOAD_STATE", obj);
    },

    UpdateProducts({ commit }, data) {
			commit("UPDATE_PRODUCTS", data);
		},
  },
};
