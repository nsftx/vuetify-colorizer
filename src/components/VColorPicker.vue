<template>
  <v-tabs dark
          show-arrows
          color="primary"
          slider-color="secondary"
          v-model="activePalleteIndex">
    <v-tab :key="pallete.key"
           :href="pallete.key"
           v-for="pallete in palletes">
      {{pallete.name}}
    </v-tab>
    <v-tab-item :id="pallete.key"
                :key="pallete.key"
                v-for="pallete in palletes">
      <component :is="pallete.component"
                 :value="value"
                 @input="setColor">
      </component>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import VColorPalleteMaterial from './VColorPalleteMaterial';

export default {
  name: 'VColorPicker',
  components: {
    VColorPalleteMaterial,
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
      activePalleteIndex: 0,
      color: null,
      palletes: [
        { key: 'material', name: 'Material', component: 'VColorPalleteMaterial' },
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
