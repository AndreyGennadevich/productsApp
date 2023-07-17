import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "MainPage",
    path: "/",
    alias: "/category",
    component: () => import("@/views/mainPage"),
    meta: {
      title: "Category",
    },
  },
  {
    name: "Products",
    path: `/category/:categorySlug/:subcategorySlug`,
    component: () => import("@/views/productPage"),
    meta: {
      title: "Product",
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;