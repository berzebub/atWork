import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
var firebaseConfig = {
  apiKey: "AIzaSyArJ0zxkVN2dJnXE5wq2zCyvNfy_nwpoXk",
  authDomain: "atwork-dee11.firebaseapp.com",
  databaseURL: "https://atwork-dee11.firebaseio.com",
  projectId: "atwork-dee11",
  storageBucket: "atwork-dee11.appspot.com",
  messagingSenderId: "617447385183",
  appId: "1:617447385183:web:f9c8c29f85827b952153ea",
  measurementId: "G-GJTSD57TQH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
const storage = firebase.storage();
export const st = storage.ref();
export const auth = firebase.auth();
export const axios = require("axios").default;
Vue.mixin({
  data() {
    return {};
  },
  methods: {
    logOut() {
      auth
        .signOut()
        .then(() => this.$router.push("/"))
        .catch(function (error) {});
    },
    // ฟังชั่น ซิงโครไนค์
    async sync(practiceId) {

      return new Promise((a, b) => {
        db.collection("practice_draft")
          .where("practiceId", "==", practiceId)
          .get()
          .then(doc => {
            // let unitId
            this.loadingShow()
            let unitId
            for (const element of doc.docs) {
              unitId = element.data().unitId
              if (element.data().status == "notSync") {
                let data = element.data();
                delete data.status;
                db.collection("practice_server")
                  .doc(element.id)
                  .set(data)

                db.collection("practice_draft")
                  .doc(element.id)
                  .update({
                    status: "updated"
                  })

              } else if (element.data().status == "waitForDelete") {
                db.collection("practice_server")
                  .doc(element.id)
                  .delete()

                db.collection("practice_draft")
                  .doc(element.id)
                  .delete()

              }

            }


            db.collection("unit")
              .doc(unitId)
              .update({
                timestamp: new Date().getTime()
              }).then(() => {
                db.collection("practice_list")
                  .doc(practiceId)
                  .update({
                    timestamp: new Date().getTime()
                  }).then(() => {
                    this.loadingHide()
                    console.log("FINISH");
                    a("finish")
                  })
              })




          });
      })


    },
    async getUserInfo(uid) {
      return new Promise((a, b) => {
        db.collection("user_admin")
          .where("uid", "==", uid)
          .get()
          .then(data => {
            a({
              ...data.docs[0].data(),
              userId: data.docs[0].id
            });
          });
      });
    },
    loadingShow() {
      this.$q.loading.show({
        delay: 400
      });
    },
    loadingHide() {
      this.$q.loading.hide();
    }
  }
});

export default function ( /* { store, ssrContext } */ ) {
  const Router = new VueRouter({
    scrollBehavior: () => ({
      x: 0,
      y: 0
    }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  return Router;
}
