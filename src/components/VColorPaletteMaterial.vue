<template>
  <div class="colorizer-palette-material">
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
        <span v-if="isSelectedColor(color)">&#9679;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { each, find, isNil, sortBy } from 'lodash';
import materialColors from 'vuetify/es5/util/colors';
import { toKebabCase } from '../utility';

export default {
  name: 'VColorPaletteMaterial',
  props: {
    value: {
      type: String,
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
  watch: {
    value() {
      this.setColorFromInput();
    },
  },
  methods: {
    colorName(groupName, name, isBase) {
      if (groupName === 'shades') {
        return name;
      } else if (isBase) {
        return groupName;
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
      if (isNil(this.value)) {
        this.color = null;
      } else {
        this.color = find(this.colors, { name: this.value });
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
            priority = 2;
            isGroupEnd = name.endsWith('4');
            isLight = this.colorWeight(name) <= 2;
          } else if (name.startsWith('darken')) {
            priority = 3;
            isGroupEnd = name.endsWith('4');
          } else if (name.startsWith('lighten')) {
            priority = 4;
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
          colors: sortBy(colorGroupColors, ['priority', 'name']),
        });
      });

      this.colors = colors;
      this.colorGroups = colorGroups;
    },
    sendColorChange() {
      let color = null;
      if (this.color) {
        color = {
          name: this.color.name,
          value: this.color.value,
        };
      }

      this.$emit('input', color);
    },
  },
  mounted() {
    this.setColors();
    this.setColorFromInput();
    this.sendColorChange();
  },
};
</script>

<style lang="stylus">
.colorizer-palette-material {
  $width = 304px;
  $height = 419px;
  $colorSize = 20px;
  width: $width;
  height: $height;
  background-color: whitesmoke;

  .color-group {
    float: left;
    width: $width;
    height: $colorSize;
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

    &-end {
      margin-right: 1px;
    }
  }
}
</style>
