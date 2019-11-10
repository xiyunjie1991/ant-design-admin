import VueCookies from "vue-cookies";

export const getToken = () => {
  const token = VueCookies.get("token");
  if (token && token.length > 0) {
    return token;
  }
  return "";
};

export const setToken = token => {
  VueCookies.set("token", token, { expires: 1 }); // 保持登录一天
};

export const clearToken = () => {
  VueCookies.remove("token");
};

export  function dateFormat(time){
  var unixTimestamp = new Date(time * 1000 );
  return unixTimestamp.getFullYear() + "-" + (unixTimestamp.getMonth() + 1) + "-" + unixTimestamp.getDate() 
}

