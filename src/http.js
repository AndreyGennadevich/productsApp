import axios from "axios";

export default axios.create({
  baseURL: "https://nlstar.com/api/catalog3/v1/",
});