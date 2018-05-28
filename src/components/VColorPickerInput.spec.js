import { mount } from '@vue/test-utils';
import VColorPickerInput from './VColorPickerInput';

describe('VColorPickerInput', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(VColorPickerInput);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
