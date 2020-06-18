const routes = [
  {
    path: "/",
    component: () => import("pages/login.vue")
  },
  {
    path: "/forgetPassword",
    component: () => import("pages/forgetPassword.vue")
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "lessonMain",
        component: () => import("pages/lessonMain.vue"),
        name: "lessonMain"
      },
      {
        path: "practiceList",
        component: () => import("pages/practiceList.vue"),
        name: "practiceList"
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
        component: () => import("pages/expressionMain.vue"),
        name: "expressionMain"
      },
      {
        path: "expressionInput",
        component: () => import("pages/expressionInput.vue"),
        name: "expressionInput"
      },
      {
        path: "expressionEdit",
        component: () => import("pages/expressionInput.vue"),
        name: "expressionEdit"
      },
      {
        path: "userMain",
        component: () => import("pages/userMain.vue"),
        name: "userMain"
      },
      {
        path: "userAddEdit",
        component: () => import("pages/userAddEdit.vue"),
        name: "userAddEdit"
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
