import axios from "@/http.js"

export const getCitys = async (value) => {
	try {
		const { data } = await axios.get("/city", { params: { ...value, country: "ru" }})
		return data;
	}
	catch(e) {
		new Error(e)
	}

}
