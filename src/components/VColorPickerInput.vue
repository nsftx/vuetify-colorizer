<template>
  <div class="colorizer-picker-input">
    <v-menu full-width
            max-width="304px"
            :return-value="color"
            v-model="visible"
            >
      <v-text-field readonly
                    outline
                    align-center
                    slot="activator"
                    color="primary"
                    :value="colorName"
                    :disabled="disabled"
                    ><template v-slot:label><p>Color</p><v-icon>info</v-icon></template>
      </v-text-field>
      <VColorPicker :hide-tabs="hideTabs"
                    :value="value"
                    :return-type="returnType"
                    @input="setColor">
      </VColorPicker>
    </v-menu>
    <div class="color-box-preview"
         :class="color.name"
         :style="colorStyle"
         @click="toggleMenu"
         v-if="color">
    </div>
  </div>
</template>

<script>
import {
  isString,
  isObject,
  isNil,
  startsWith,
} from 'lodash';

import VColorPicker from './VColorPicker';
import { stat } from 'fs';

export default {
  name: 'VColorPickerInput',
  components: {
    VColorPicker,
  },
  props: {
    hideTabs: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Object, String],
    },
    returnType: {
      type: String,
      default: 'color',
    },
    disabled: {
      type: Boolean,
      default: false,
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
      return isObject(this.color) && !isNil(this.color) ? this.color.name : null;
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
      const value = this.returnType === 'color' ? this.color : this.getColorType();

      this.$emit('change', value);
    },
    setColor(value) {
      if (isObject(value)) {
        this.color = value;
      } else {
        let color;
        if (startsWith(value, '#')) {
          color = {
            value,
          };
        } else {
          color = {
            name: value,
          };
        }

        this.color = color;
      }

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
  watch: {
    value: {
      handler(value) {
        if (isString(value)) {
          if (startsWith(value, '#')) {
            this.setColor({
              value,
            });
          } else {
            this.setColor({
              name: value,
            });
          }
        } else {
          this.setColor(value);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="stylus">
.colorizer-picker-input {
  .v-input {
    &.v-text-field--outline {
      .v-input__slot {
        border: 1px solid rgba(0,0,0,0.12)!important;
      }
    }
  }
  .v-input__slot{
    margin-top:50px;
    min-height: 40px !important;
    height: 40px;
  }
  .v-label{
    transition: none !important;
    position:relative;
    top: 10px !important;
  }
  .v-label--active{
            -webkit-transform: translateY(-32px) translateX(-12px) scale(1);
            transform: translateY(-32px) translateX(-12px) scale(1) !important;
            font-size: 14px !important;
            color: grey !important;
          }
  .v-input input{
      max-height: 40px;
    }
    .v-text-field--outline input{
        margin-top: 0px !important;
      }
  .color-box-preview {
    position: absolute;
    right: 7px;
    top: 60px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}
</style>
