import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueI18n from "vue-i18n";
import i18n from "./i18n";
import ToggleButton from "vue-js-toggle-button";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";
import VueAxios from "vue-axios";
import VueQRCodeComponent from "vue-qr-generator";
import VueTheMask from 'vue-the-mask'

Vue.config.productionTip = false;

Vue.use(VueTheMask)
Vue.use(VueI18n);
Vue.use(ToggleButton);
Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios);
Vue.component("qr-code", VueQRCodeComponent);

new Vue({
  router,
  vuetify,
  i18n,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
