import Vue from 'vue';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app');
