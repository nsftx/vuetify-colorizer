<template>
  <v-tabs dark
          show-arrows
          color="primary"
          v-model="activePalleteIndex">
    <v-tab :key="pallete.key"
           v-for="pallete in palletes">
      {{pallete.name}}
    </v-tab>
    <v-tab-item>
      <VColorPalleteMaterial></VColorPalleteMaterial>
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
  data() {
    return {
      activePalleteIndex: 0,
      palletes: [
        { key: 'material', name: 'Material' },
      ],
    };
  },
};
</script>
