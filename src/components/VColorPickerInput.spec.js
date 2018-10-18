import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount } from '@vue/test-utils';
import VColorPickerInput from './VColorPickerInput';

// Handle Vuetify and the root element
Vue.use(Vuetify);
const rootAppElement = document.createElement('div');
rootAppElement.setAttribute('data-app', true);
document.body.appendChild(rootAppElement);

describe('VColorPickerInput', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(VColorPickerInput);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
