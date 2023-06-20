import { createRouter, createWebHashHistory } from "vue-router";
import { authGuard } from "@bcwdev/auth0provider-client";

function loadPage(page) {
  return () => import(`./pages/${page}.vue`);
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: loadPage("HomePage"),
  },
  {
    path: "/channel/:id",
    name: "Channel",
    component: loadPage("ChannelPage"),
  },
  {
    path: "/channel/@me/:id",
    name: "Friend",
    component: loadPage("FriendPage"),
  },
  {
    path: "/account",
    name: "Account",
    component: loadPage("AccountPage"),
    beforeEnter: authGuard,
  },
  {
    path: "/room/:id",
    name: "Room",
    component: loadPage("RoomPage"),
  },
];

export const router = createRouter({
  linkActiveClass: "router-link-active",
  linkExactActiveClass: "router-link-exact-active",
  history: createWebHashHistory(),
  routes,
});
