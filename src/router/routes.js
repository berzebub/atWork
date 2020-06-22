const routes = [{
  path: "/",
  component: () => import("pages/login.vue")
},
{
  path: "/forgetPassword",
  component: () => import("pages/forgetPassword.vue")
},
// ------------------- multiple Print-------------------
{
  path: "/multiplePrint",
  component: () => import("pages/multiplePrint.vue"),
  name: "multiplePrint"
},

{
  path: "/",
  component: () => import("layouts/MainLayout.vue"),
  children: [
    // ------------------- practice list แบบฝึกหัด -------------------
    {
      path: "practiceList",
      component: () => import("pages/practiceList.vue"),
      name: "practiceList"
    },
    // ------------------- flashcard -------------------
    {
      path: "flashcardMain",
      component: () => import("pages/flashcardMain.vue"),
      name: "flashcardMain"
    },
    // ------------------- multiple -------------------
    {
      path: "multipleMain",
      component: () => import("pages/multipleMain.vue"),
      name: "multipleMain"
    }, {
      path: "multipleInputAdd",
      component: () => import("pages/multipleInput.vue"),
      name: "multipleInputAdd"
    },
    {
      path: "multipleInputEdit/:key",
      component: () => import("pages/multipleInput.vue"),
      name: "multipleInputEdit"
    },
    // ------------------- expression -------------------
    {
      path: "expressionMain",
      component: () => import("pages/expressionMain.vue"),
      name: "expressionMain"
    }, {
      path: "expressionInput",
      component: () => import("pages/expressionInput.vue"),
      name: "expressionInput"
    }, {
      path: "expressionEdit",
      component: () => import("pages/expressionInput.vue"),
      name: "expressionEdit"
    },
    // ------------------- vdo -------------------
    {
      path: "vdoMain",
      component: () => import("pages/vdoMain.vue"),
      name: "vdoMain"
    },
    // ------------------- lessonMain ระดับการเรียน -------------------
    {

      path: "lessonMain",
      component: () => import("pages/lessonMain.vue"),
      name: "lessonMain"
    },

    // ------------------- business กิจการ -------------------
    {
      path: "businessMain",
      component: () => import("pages/businessMain.vue"),
      name: "businessMain"
    },
    // ------------------- account พนักงาน -------------------
    {
      path: "accountMain",
      component: () => import("pages/accountMain.vue"),
      name: "accountMain"
    },
    // ------------------- userMain ผู้ดูแลระบบ -------------------
    {
      path: "userMain",
      component: () => import("pages/userMain.vue"),
      name: "userMain"
    },
    {
      path: "userAddEdit",
      component: () => import("pages/userAddEdit.vue"),
      name: "userAddEdit"
    },
    // ------------------- user info -------------------
    {
      path: "userInfo",
      component: () => import("pages/userInfo.vue"),
      name: "userInfo"
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
