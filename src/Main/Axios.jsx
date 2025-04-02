import axios from "axios";
import useMyStor from "./Store/Mystore";

const api = axios.create({
  baseURL: "https://nt.softly.uz",
});
api.interceptors.response.use(null, (e) => {
  if (e.status === 401) {
    const state = useMyStor.getState();
    state.logout();
  }
});
export default api;
