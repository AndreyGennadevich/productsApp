import axios from "@/http.js"

export const getCategory = async (id) => {
	try {
		const { data } = await axios.get("/menutags", {
      params: { city_id: id },
    });
		return data;
	}
	catch(e) {
		new Error(e)
	}

}
