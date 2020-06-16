const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "practiceList",
        component: () => import("pages/practiceList.vue")
      },
      {
        path: "expressionMain",
        component: () => import("pages/expressionMain.vue")
      },
      {
        path: "expressionInput",
        component: () => import("pages/expressionInput.vue")
      }
    ]
  },
  { path: "/", component: () => import("pages/login.vue") }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
