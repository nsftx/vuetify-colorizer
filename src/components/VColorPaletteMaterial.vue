<template>
  <div class="colorizer-palette-material"
       column>
    <div class="color-group-wrap">
      <div v-for="(colorGroup, colorGroupIndex) in colorGroups"
           :key="colorGroupIndex"
           class="color-group">
        <div v-for="colorValue in colorGroup.colors"
             :key="colorValue.name"
             class="color-box"
             :class="colorClass(colorValue)"
             :style="colorStyle(colorValue)"
             :title="colorValue.name"
             @click="setColor(colorValue)">
          <div v-if="isSelectedColor(colorValue) && hexColor"
               class="selected-color-outline" />
        </div>
      </div>
    </div>
    <div class="color-palette-hex"
         @click.stop>
      <v-text-field ref="hexField"
                    v-model="hexNum"
                    readonly
                    class="text-field-hex"
                    placeholder="Hex #"
                    outlined />
    </div>
  </div>
</template>

<script>
import {
  clone,
  each,
  find,
  isNil,
  isEmpty,
  isObject,
  sortBy,
  startsWith,
} from 'lodash';

import materialColors from 'vuetify/es5/util/colors';
import { toKebabCase } from '../utility';

export default {
  name: 'VColorPaletteMaterial',
  props: {
    value: {
      type: [Object, String],
      default: null,
    },
    hexColor: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      materialColors,
      color: null,
      colors: null,
      colorGroups: null,
    };
  },
  computed: {
    hexNum() {
      return this.hexColor ? this.hexColor.value : null;
    },
  },
  watch: {
    value() {
      this.setColorFromInput();
    },
  },
  mounted() {
    this.setColors();
    this.setColorFromInput();
  },
  methods: {
    colorName(groupName, name, isBase) {
      if (groupName === 'shades') {
        return toKebabCase(name);
      }

      if (isBase) {
        return toKebabCase(groupName);
      }

      return `${toKebabCase(groupName)} ${toKebabCase(name)}`;
    },
    colorClass(color) {
      const classes = [];

      if (color.isBase) {
        classes.push('color-box-base');
      }

      if (color.isLight) {
        classes.push('color-box-light');
      }

      if (color.isGroupEnd || color.isBase) {
        classes.push('color-box-end');
      }

      return classes;
    },
    colorStyle(color) {
      return {
        backgroundColor: color.value,
      };
    },
    colorWeight(colorName) {
      return Number(colorName.substring(colorName.length - 1));
    },
    isSelectedColor(color) {
      return this.color && color.name === this.color.name;
    },
    setColor(color) {
      this.color = color;
      this.sendColorChange();
    },
    setColorFromInput() {
      if (isNil(this.value) || isEmpty(this.value)) {
        this.color = null;
      } else if (isObject(this.value)) {
        this.color = clone(this.value);
      } else {
        const isHex = startsWith(this.value, '#');
        if (isHex) {
          this.color = find(this.colors, { value: this.value });
        } else {
          this.color = find(this.colors, { name: this.value });
        }

        this.sendColorChange();
      }
    },
    setColors() {
      const colors = [];
      const colorGroups = [];

      each(this.materialColors, (group, groupName) => {
        const colorGroupColors = [];
        each(group, (value, name) => {
          let priority = 0;
          let isGroupEnd = false;
          let isBase = false;
          let isLight = false;
          if (name.startsWith('accent')) {
            priority = 4;
            isGroupEnd = name.endsWith('4');
            isLight = this.colorWeight(name) <= 2;
          } else if (name.startsWith('darken')) {
            priority = 3;
            isGroupEnd = name.endsWith('4');
          } else if (name.startsWith('lighten')) {
            priority = 2;
            isGroupEnd = name.endsWith('5');
            isLight = this.colorWeight(name) >= 3;
          } else {
            priority = 1;
            isGroupEnd = true;
            isBase = true;
            isLight = ['white', 'transparent'].indexOf(name) > -1;
          }

          const color = {
            priority,
            name: this.colorName(groupName, name, isBase),
            value,
            isBase,
            isGroupEnd,
            isLight,
          };
          colors.push(color);
          colorGroupColors.push(color);
        });

        colorGroups.push({
          name: groupName,
          colors: sortBy(colorGroupColors, ['priority']),
        });
      });

      this.colors = colors;
      this.colorGroups = colorGroups;
    },
    sendColorChange() {
      this.$emit('input', this.color);
    },
  },
};
</script>

<style lang="scss">

.theme--dark.text-field-hex {
  fieldset {
    border-color: #575960 !important;
  }
}
.color-palette-hex {
  height: 50px;
  width: 200px;

  .v-text-field__details {
    display: none !important;
  }

  .v-input__slot {
    font-size: 14px;
    color: rgba(34, 34, 34, 0.6) !important;
    margin-top: 16px;
    width: 200px;
    min-height: 24px !important;
    margin-bottom: 0 !important;
    height: 24px !important;
    max-height: 24px !important;

    input[placeholder="Hex #"] {
      margin-top: 0 !important;
      -webkit-user-select: all;
      -moz-user-select: all;
      -ms-user-select: all;
      user-select: all;
    }
  }

  .v-text-field--outline input {
    margin-top: 0 !important;
  }

  .text-field-hex {
    padding: 0 !important;
    color: black !important;
  }
}

.selected-color-outline {
  height: 20px !important;
  width: 20px !important;
  border: 2px solid #2d3038;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.color-box:first-child {
  margin-bottom: 8px !important;
}

.colorizer-palette-material {
  background-color: white !important;
  margin: 0 !important;
  padding: 8px;
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  height: 360px;

  .color-box-base {
    width: 20px !important;
  }

  .color-group-wrap {
    display: flex;
  }

  .color-group {
    display: flex;
    flex-direction: column;
  }

  .color-box {
    height: 20px;
    cursor: pointer;
  }
}

.theme--dark {
  .colorizer-palette-material {
    background-color: #2d3038 !important;
  }
}
</style>
