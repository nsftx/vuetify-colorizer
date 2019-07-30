<template>
  <v-tabs v-model="activePaletteIndex"
          class="color-tabs-header"
          show-arrows
          color="primary"
          slider-color="secondary"
          :class="{ 'hidden-bars': hideTabs }">
    <v-tab v-for="(palette, index) in palettes"
           :key="palette.key"
           @click="setPalleteIndex(index)">
      {{ palette.name }}
    </v-tab>
    <v-tab-item v-for="palette in palettes"
                :key="palette.key">
      <component :is="palette.component"
                 :value="value"
                 :hex-color="hexColor"
                 @input="setColor" />
    </v-tab-item>
  </v-tabs>
</template>

<script>
import VColorPaletteMaterial from './VColorPaletteMaterial';

export default {
  name: 'VColorPicker',
  components: {
    VColorPaletteMaterial,
  },
  props: {
    hideTabs: {
      type: Boolean,
      default: false,
    },
    hexColor: {
      type: Object,
      default: null,
    },
    value: {
      type: [Object, String],
      default: null,
    },
    returnType: {
      type: String,
      default: 'color',
    },
  },
  data() {
    return {
      activePaletteIndex: 0,
      color: null,
      palettes: [
        {
          key: 'material',
          name: 'Material',
          component: 'VColorPaletteMaterial',
        },
      ],
    };
  },
  methods: {
    getColorByReturnType() {
      if (this.color) {
        return this.returnType === 'color' ? this.color : this.color[this.returnType];
      }

      return null;
    },
    setPalleteIndex(index) {
      this.activePaletteIndex = index;
    },
    setColor(color) {
      this.color = color;
      const value = this.getColorByReturnType();

      this.$emit('input', this.color);
      this.$emit('change', value);
    },
  },
};
</script>

<style lang="scss">
.color-tabs-header {
  .v-tabs-bar {
    display: none !important;
  }
}
</style>
