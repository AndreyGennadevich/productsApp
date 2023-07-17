import { getCitys } from "@/api/getCitys";

export default {
  namespaced: true,
  modules: {},
  state: {
    selectCity: null,
    citysList: null,
  },
  getters: {},
  mutations: {
    UPDATE_CITYS_LIST(state, data) {
      state.citysList = data;
    },
    UPDATE_CITY(state, city) {
      state.selectCity = city;
    },
  },
  actions: {
    UpdateCitysList({ commit }, data) {
      commit("UPDATE_CITYS_LIST", data);
    },
    GetCitysList({ dispatch }, inputValue) {
      getCitys({ term: inputValue }).then((res) =>
        dispatch("UpdateCitysList", res?.data)
      );
    },
    InitDefaultCity({ dispatch }) {
      const id = localStorage.getItem("cityID")
        ? localStorage.getItem("cityID")
        : 1;
      getCitys({ id }).then((res) => dispatch("UpdateCity", res?.data));
    },
    UpdateCity({ commit }, city) {
      localStorage.setItem("cityID", JSON.stringify(city.id));
      commit("UPDATE_CITY", city);
    },
  },
};
