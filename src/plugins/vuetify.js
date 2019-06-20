import Vue from 'vue';
import Vuetify, {
  VBtn,
  VIcon,
  VMenu,
  VTabs,
  VTextField,
  VTooltip,
} from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VBtn,
    VIcon,
    VMenu,
    VTabs,
    VTextField,
    VTooltip,
  },
});

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
