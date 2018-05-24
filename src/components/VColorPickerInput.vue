<template>
  <div class="colorizer-picker-input">
    <v-menu offset-y
            full-width
            max-width="304px"
            v-model="visible"
            :return-value="color">
      <v-text-field readonly
                    clearable
                    hide-details
                    slot="activator"
                    color="primary"
                    :value="colorName"
                    :label="label"
                    @input="setColorName">
      </v-text-field>
      <VColorPicker :value="colorName"
                    @input="setColorName"
                    @change="setColor">
      </VColorPicker>
    </v-menu>
    <div class="color-box-preview"
         :style="colorStyle"
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
    setColor(value) {
      this.color = value;
      this.$emit('input', this.color.name);
      this.$emit('change', this.color);
    },
    setColorName(value) {
      this.color = value;
      this.visible = false;
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
    bottom: 8px;
    width: 20px;
    height: 20px;
  }
}
</style>
