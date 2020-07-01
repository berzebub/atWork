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
      {
        path: "practiceMain",
        component: () => import("pages/practiceMain.vue"),
        name: "practiceMain"
      },
      // ------------------- flashcard -------------------
      {
        path: "flashcardMain/:levelId/:unitId/:practiceId",
        component: () => import("pages/flashcardMain.vue"),
        name: "flashcardMain"
      },
      {
        path: "flashcardInput/:levelId/:unitId/:practiceId",
        component: () => import("pages/flashcardInput.vue"),
        name: "flashcardInput"
      },
      {
        path: "flashcardEdit/:levelId/:unitId/:practiceId",
        component: () => import("pages/flashcardInput.vue"),
        name: "flashcardEdit"
      },
      // ------------------- multiple -------------------
      {
        path: "multipleMain",
        component: () => import("pages/multipleMain.vue"),
        name: "multipleMain"
      },
      {
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
        path: "expressionMain/:levelId/:unitId",
        component: () => import("pages/expressionMain.vue"),
        name: "expressionMain"
      },
      {
        path: "expressionInput/:levelId/:unitId",
        component: () => import("pages/expressionInput.vue"),
        name: "expressionInput"
      },
      {
        path: "expressionEdit/:levelId/:unitId",
        component: () => import("pages/expressionInput.vue"),
        name: "expressionEdit"
      },
      // ------------------- vdo -------------------
      {
        path: "vdoMain",
        component: () => import("pages/vdoMain.vue"),
        name: "vdoMain"
      },
      {
        path: "vdoInputAdd",
        component: () => import("pages/vdoInput.vue"),
        name: "vdoInputAdd"
      },
      {
        path: "vdoInputEdit/:key",
        component: () => import("pages/vdoInput.vue"),
        name: "vdoInputEdit"
      },
      // ------------------- lessonMain ระดับการเรียน -------------------
      {
        path: "lessonMainList",
        component: () => import("pages/lessonMainList.vue"),
        name: "lessonMainList"
      },
      {
        path: "lessonInput",
        component: () => import("pages/lessonInputEdit.vue"),
        name: "lessonInput"
      },
      {
        path: "lessonEdit",
        component: () => import("pages/lessonInputEdit.vue"),
        name: "lessonEdit"
      },
      {
        path: "lessonUnitlist",
        component: () => import("pages/lessonUnitList.vue"),
        name: "lessonUnitlist"
      },
      // ------------------- account ผู้ใช้งาน -------------------
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
        path: "userAdd",
        component: () => import("pages/userAddEdit.vue"),
        name: "userAdd"
      },
      {
        path: "userEdit",
        component: () => import("pages/userAddEdit.vue"),
        name: "userEdit"
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
