const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "practiceList",
        component: () => import("pages/practiceList.vue")
      },
      // -------------------multiple
      {
        path: "multipleOutput",
        component: () => import("pages/multipleOutput.vue"),
        name: "multipleOutput"
      },
      {
        path: "multipleInput",
        component: () => import("pages/multipleInput.vue"),
        name: "multipleInput"
      },
      {
        path: "expressionMain",
        component: () => import("pages/expressionMain.vue")
      },
      {
        path: "expressionInput",
        component: () => import("pages/expressionInput.vue")
      },
      {
        path: "usermain",
        component: () => import("pages/usermain.vue")
      },
      {
        path: "useraddedit",
        component: () => import("pages/useraddedit.vue")
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
