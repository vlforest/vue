import { createRouter, createWebHistory } from "vue-router";
import UserPage from "@/views/user/UserPage.vue";
import AdminPage from "@/views/admin/AdminPage.vue";
import CategoryPage from "@/views/admin/pages/products/CategoryPage.vue";
import ProductPage from "@/views/admin/pages/products/ProductPage.vue";
import OrderPage from "@/views/admin/pages/orders/OrderPage.vue";
import HomePage from "@/views/user/pages/HomePage.vue";
import ContactPage from "@/views/user/pages/ContactPage.vue";
import AboutUsPage from "@/views/user/pages/AboutUsPage.vue";
import ProductsByCategory from "@/views/user/pages/ProductsByCategory.vue";
import CategoryDetails from "@/views/user/pages/CategoryDetails.vue"; // Import component chi tiết danh mục

const routes = [
  {
    path: "/",
    name: "UserPage",
    component: UserPage,
    children: [
      {
        path: "",
        name: "HomePage",
        component: HomePage,
        meta: {
          titleKey: "title.home",
        },
      },
      {
        path: "contact",
        name: "ContactPage",
        component: ContactPage,
        meta: {
          titleKey: "title.contact",
        },
      },
      {
        path: "about",
        name: "AboutUsPage",
        component: AboutUsPage,
        meta: {
          titleKey: "title.about",
        },
      },
      {
        path: "category/:categoryId",
        name: "CategoryDetails",
        component: CategoryDetails,
        props: (route) => ({ categoryId: Number(route.params.categoryId) }),
        meta: {
          titleKey: "title.categories",
        },
      },
      {
        path: "categories/:categoryId/:subcategoryId",
        name: "ProductsByCategory",
        component: ProductsByCategory,
        props: (route) => ({
          categoryId: Number(route.params.categoryId),
          subcategoryId: Number(route.params.subcategoryId),
        }),
        meta: {
          titleKey: "title.categories",
        },
      },
    ],
  },
  {
    path: "/admin",
    name: "AdminPage",
    component: AdminPage,
    children: [
      {
        path: "products/categories",
        name: "CategoryPage",
        component: CategoryPage,
        meta: {
          titleKey: "title.categories",
        },
      },
      {
        path: "products",
        name: "ProductPage",
        component: ProductPage,
        meta: {
          titleKey: "title.products",
        },
      },
      {
        path: "orders",
        name: "OrderPage",
        component: OrderPage,
        meta: {
          titleKey: "title.orders",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
