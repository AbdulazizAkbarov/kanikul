import { create } from "zustand";
import api from "../Axios/";
const useMyStor = create(() => {
  const ls_strin = localStorage.getItem("auth");

  if (!ls_strin) {
    return {
      accessToken: "",
      user: null,
    };
  }
  const ls = JSON.parse(ls_strin);

  api.defaults.headers.accessToken = `Bearer ${ls.accessToken}`;
  return {
    accessToken: ls.accessToken,
    user: ls.user,
  };
});
export default useMyStor;
