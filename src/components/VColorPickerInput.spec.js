import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue } from '@vue/test-utils';
import VColorPickerInput from './VColorPickerInput';

// https://github.com/vuejs/vue-test-utils/issues/532
Vue.config.silent = true;

const localVue = createLocalVue();

const rootAppElement = document.createElement('div');
rootAppElement.setAttribute('data-app', true);
document.body.appendChild(rootAppElement);

describe('VColorPickerInput', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('is a Vue instance', () => {
    const wrapper = mount(VColorPickerInput, {
      localVue,
      vuetify,
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
