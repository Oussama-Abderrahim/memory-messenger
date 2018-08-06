import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "messenger-view",
      component: require("@/views/MessengerView.vue").default
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
