import { createRouter, createWebHashHistory } from "vue-router";
import UserProfile from "../views/UserProfile.vue";

const routes = [
  {
    path: "/",
    name: "userProfile",
    meta: {
      layout: "main",
    },
    component: UserProfile,
  },
  {
    path: "/user_profile",
    name: "userProfile",
    meta: {
      layout: "main",
    },
    component: UserProfile,
  },
  {
    path: "/registration",
    name: "registration",
    meta: {
      layout: "form",
    },
    component: () => import("../views/Registration.vue"),
  },
  {
    path: "/authorization",
    name: "authorization",
    meta: {
      layout: "form",
    },
    component: () => import("../views/Authorization.vue"),
  },
  {
    path: "/password_recovery",
    name: "password_recovery",
    meta: {
      layout: "form",
    },
    component: () => import("../views/PasswordRecovery.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
