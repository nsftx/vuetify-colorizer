<template>
  <v-app id="app">
    <VColorPickerInput v-model="color"></VColorPickerInput>
  </v-app>
</template>

<script>
import VColorPickerInput from './components/VColorPickerInput';

export default {
  name: 'app',
  components: {
    VColorPickerInput,
  },
  data() {
    return {
      color: 'red darken-2',
    };
  },
  mounted() {
    setTimeout(() => {
      this.color = null;
    }, 5000);
  },
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
