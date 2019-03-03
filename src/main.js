import Vue from "vue";

import VueRouter from "vue-router";
import routerConfig from "./router";

import App from "./app.vue";

Vue.use(VueRouter);

const router = new VueRouter(routerConfig);

new Vue({
    el: "#webapp",
    router: router,
    render: h => h(App)
});
