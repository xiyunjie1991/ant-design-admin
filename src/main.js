import Vue from "vue";
import VueCookies from "vue-cookies";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "@/css/style.scss";
// moment.locale('zh-cn');//需要汉化

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(Antd);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
