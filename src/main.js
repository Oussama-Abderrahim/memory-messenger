import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import vuetify from "./plugins/vuetify";
import "./plugins/PerfectScrollbar";
import "./plugins/ObserveVisibility";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  // store,
  render: (h) => h(App),
}).$mount("#app");
