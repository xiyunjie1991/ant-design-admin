import apiService from "@/api/http.js";

export const login = (phone, password) => {
  return apiService({
    url: "/account/Account/Login",
    method: "POST",
    data: {
      phone,
      password
    }
  });
};

export const getAccount = () => {
  return apiService({
    url: "/account/Account/GetAccount",
    method: "POST",
    data: {}
  });
};
