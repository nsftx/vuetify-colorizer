<template>
  <div class="colorizer-picker-input">
    <v-menu full-width
            max-width="416px"
            :return-value="color"
            v-model="visible">
      <v-text-field readonly
                    outline
                    hide-details
                    placeholder="Select color"
                    align-center
                    slot="activator"
                    color="primary"
                    :value="colorName"
                    :disabled="disabled">
        <template v-slot:label>
          <div>{{label}}
            <v-tooltip slot="append" top class="help-tooltip">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" @click.stop>
                <v-icon class="help-icon material-icons-outlined">info</v-icon>
              </v-btn>
            </template>
            <span>Help tooltip</span>
          </v-tooltip>
          </div>
        </template>
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
    label: {
      type: String,
      default: 'Color',
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
  .v-btn--icon {
    height: 14px;
    width: 14px;
    margin: 0 !important;
    color: grey;
  }

  .v-btn--icon {
    pointer-events: all;
  }

  .help-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .v-input {
    &.v-text-field--outline {
      .v-input__slot {
        border: 1px solid rgba(0, 0, 0, 0.12) !important;
      }
    }
  }

  .v-input__slot {
    min-height: 40px !important;
    height: 40px;
  }

  .v-label {
    top: -22px;
    left: 0px !important;
  }

  .v-label,
  .help-icon {
    position: relative;
  }

  .help-icon {
    color: #7a7a7a !important;
    font-size: 14px;
  }

  .v-label--active {
    -webkit-transform: none;
    transform: none !important;
    font-size: 14px !important;
    color: grey !important;
  }

  .v-input input {
    max-height: 40px;
  }

  .v-text-field--outline input {
    margin-top: 0px !important;
  }

  .color-box-preview {
    border-radius: 4px;
    position: absolute;
    right: 7px;
    top: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}

</style>
