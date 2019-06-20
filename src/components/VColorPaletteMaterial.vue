<template>
  <div class="colorizer-palette-material" column>
    <div class="color-group-wrap">
      <div class="color-group"
          :key="colorGroupIndex"
          v-for="(colorGroup, colorGroupIndex) in colorGroups">
        <div class="color-box"
            :key="color.name"
            :class="colorClass(color)"
            :style="colorStyle(color)"
            :title="color.name"
            @click="setColor(color)"
            v-for="color in colorGroup.colors">
          <div v-if="isSelectedColor(color)" class="selected-color-outline"></div>
        </div>
      </div>
    </div>
    <div @click.stop class="color-palette-hex">
      <v-text-field
        v-model="hexNum"
        readonly
        class="text-field-hex"
        ref="hexField"
        placeholder="Hex #"
        outline>
      </v-text-field>
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
    },
  },
  data() {
    return {
      hexNum: null,
      materialColors,
      color: null,
      colors: null,
      colorGroups: null,
    };
  },
  watch: {
    value() {
      this.setColorFromInput();
    },
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
      this.hexNum = color.value;
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
  mounted() {
    this.setColors();
    this.setColorFromInput();
  },
};
</script>

<style lang="scss">
.color-palette-hex {
  height: 50px;
  width: 200px;

  .v-text-field__details {
    height: 0px !important;
  }

  .v-input__slot {
    font-size: 14px;
    color: rgba(34, 34, 34, 0.6) !important;
    margin-top: 16px;
    width: 200px;
    min-height: 24px !important;
    margin-bottom: 0px !important;
    height: 24px;
    border: 1px solid #dedede !important;

    input[placeholder="Hex #"] {
      -webkit-user-select: all;
      -moz-user-select: all;
      -ms-user-select: all;
      user-select: all;
    }
  }

  .v-text-field--outline input {
    margin-top: 0px !important;
  }

  .text-field-hex {
    padding: 0px !important;
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
  margin: 0px !important;
  padding: 8px;
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;

  .color-box-base {
    width: 20px !important;
  }

  .color-group-wrap {
    width: 355;
    display: flex;
    flex-direction: row;
  }

  .color-group {
    width: 20px !important;
    height: 100% !important;
    display: flex;
    flex-direction: column;
    float: left;
    margin-bottom: 1px;
  }

  .color-box {
    float: left;
    width: 20px;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
    background-color: whitesmoke;
    margin-right: 0;
    text-align: center;
    font-size: 14px;
    color: white;

    &-base {
      width: 40px;
    }

    &-light {
      color: black;
    }
  }
}

</style>
