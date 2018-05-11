import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import InstantSearch from "vue-instantsearch";
import { SplitFactory } from "@splitsoftware/splitio";

const factory: SplitIO.ISDK = SplitFactory({
  core: {
    authorizationKey: "ofeavnlpbjk6lfa293lfifs7b6rkgjagnavv",
    key: "94525800-de94-11e7-b605-0aabb9f98874"
  },
  startup: {
    readyTimeout: 1.5 // seconds
  }
});

const client: SplitIO.IClient = factory.client();

Vue.use(InstantSearch);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h =>
    h(App, {
      props: {
        splitio: client
      }
    })
}).$mount("#app");
