import axios from "axios";

export default axios.create({
  baseURL: "https://oneclick-dt.herokuapp.com/api",
});
