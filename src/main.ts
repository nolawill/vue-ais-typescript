import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import InstantSearch from "vue-instantsearch";
import { SplitFactory } from "@splitsoftware/splitio";

Vue.use(InstantSearch);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h =>
    h(App, {})
}).$mount("#app");
