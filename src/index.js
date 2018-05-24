import VColorPicker from './components/VColorPicker';
import VColorPickerInput from './components/VColorPickerInput';

export default {
  VColorPicker: {
    install(Vue) {
      Vue.component(VColorPicker.name, VColorPicker);
    },
  },
  VColorPickerInput: {
    install(Vue) {
      Vue.component(VColorPickerInput.name, VColorPickerInput);
    },
  },
};
