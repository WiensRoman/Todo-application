import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true
  },
  {
    path: "/edit",
    name: "Edit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Edit.vue"),
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;
