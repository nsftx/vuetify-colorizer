<template>
  <div :style="colorSetStyle">
    <div :key="colorGroupKey"
         :style="colorGroupStyle"
         :title="colorGroupKey"
         v-for="(colorGroup, colorGroupKey) in colorGroups">
      <div :key="color.name"
           :style="colorStyle(color)"
           :title="color.name"
           v-for="color in colorGroupColors(colorGroup)">
      </div>
    </div>
  </div>
</template>

<script>
import { each, endsWith, startsWith, sortBy } from 'lodash';
import materialColors from 'vuetify/es5/util/colors';

export default {
  name: 'VColorPalleteMaterial',
  data() {
    return {
      materialColors,
    };
  },
  computed: {
    colorGroups() {
      return this.materialColors;
    },
    colorGroupStyle() {
      return {
        float: 'left',
        width: '304px',
        height: '20px',
        marginBottom: '1px',
      };
    },
    colorSetStyle() {
      return {
        width: '304px',
        height: '419px',
        backgroundColor: 'whitesmoke',
      };
    },
  },
  methods: {
    colorGroupColors(colorGroup) {
      const colors = [];


      each(colorGroup, (value, name) => {
        let priority = 0;
        let isGroupEnd = false;
        let isBase = false;
        if (startsWith(name, 'accent')) {
          priority = 2;
          isGroupEnd = endsWith(name, '4');
        } else if (startsWith(name, 'darken')) {
          priority = 3;
          isGroupEnd = endsWith(name, '4');
        } else if (startsWith(name, 'lighten')) {
          priority = 4;
          isGroupEnd = endsWith(name, '5');
        } else {
          priority = 1;
          isGroupEnd = true;
          isBase = true;
        }

        colors.push({
          priority,
          name,
          value,
          isBase,
          isGroupEnd,
        });
      });

      return sortBy(colors, ['priority', 'name']);
    },
    colorStyle(color) {
      return {
        float: 'left',
        width: color.isBase ? '40px' : '20px',
        height: '20px',
        cursor: 'pointer',
        backgroundColor: color.value,
        border: `1px solid ${color.value}`,
        marginRight: color.isGroupEnd || color.isBase ? '1px' : 0,
      };
    },
  },
};
</script>
