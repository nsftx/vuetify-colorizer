<template>
  <v-tabs dark
          show-arrows
          color="primary"
          slider-color="secondary"
          v-model="activePaletteIndex">
    <v-tab :key="palette.key"
           :href="palette.key"
           v-for="palette in palettes">
      {{palette.name}}
    </v-tab>
    <v-tab-item :id="palette.key"
                :key="palette.key"
                v-for="palette in palettes">
      <component :is="palette.component"
                 :value="value"
                 @input="setColor">
      </component>
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
      activePaletteIndex: 0,
      color: null,
      palettes: [
        { key: 'material', name: 'Material', component: 'VColorPaletteMaterial' },
      ],
    };
  },
  methods: {
    setColor(value) {
      this.color = value;
      this.$emit('input', this.color.name);
      this.$emit('change', this.returnType === 'color' ? this.color : this.color[this.returnType]);
    },
  },
};
</script>
