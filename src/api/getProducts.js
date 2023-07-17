import axios from "@/http.js";

export const getProducts = async (id, slug) => {
  try {
    const { data } = await axios.get(`/menutags/${slug}`, {
      params: { city_id: id },
    });
    return data;
  } catch (e) {
    new Error(e);
  }
};
