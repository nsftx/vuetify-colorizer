<template>
  <div class="colorizer-picker-input">
    <v-menu full-width
            max-width="304px"
            :return-value="color"
            v-model="visible">
      <v-text-field readonly
                    clearable
                    slot="activator"
                    color="primary"
                    :value="colorName"
                    :label="label"
                    @input="clearColor">
      </v-text-field>
      <VColorPicker :value="colorName"
                    @change="setColor">
      </VColorPicker>
    </v-menu>
    <div class="color-box-preview"
         :style="colorStyle"
         @click="toggleMenu"
         v-if="color">
    </div>
  </div>
</template>

<script>
import VColorPicker from './VColorPicker';

export default {
  name: 'VColorPickerInput',
  components: {
    VColorPicker,
  },
  props: {
    label: {
      type: String,
      default: 'Color',
    },
    value: {
      type: String,
    },
    returnType: {
      type: String,
      default: 'color',
    },
  },
  data() {
    return {
      color: null,
      visible: false,
    };
  },
  computed: {
    colorName() {
      return this.color ? this.color.name : this.value;
    },
    colorStyle() {
      return {
        backgroundColor: this.color.value,
      };
    },
  },
  methods: {
    getColorType() {
      if (this.color) {
        return this.color[this.returnType];
      }

      return null;
    },
    setChange() {
      this.$emit('input', this.color ? this.color.name : null);
      this.$emit('change', this.returnType === 'color' ? this.color : this.getColorType());
    },
    setColor(value) {
      this.color = value;
      this.setChange();
    },
    clearColor() {
      this.color = null;
      this.visible = false;
      this.setChange();
    },
    toggleMenu() {
      this.visible = !this.visible;
    },
  },
};
</script>

<style lang="stylus">
.colorizer-picker-input {
  position: relative;

  .color-box-preview {
    position: absolute;
    right: 32px;
    top: 22px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}
</style>
