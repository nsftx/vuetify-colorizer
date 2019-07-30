<template>
  <v-app id="app">
    <VColorPickerInput v-model="color"
                       return-type="value"
                       @change="showColor" />
  </v-app>
</template>

<script>
import VColorPickerInput from './components/VColorPickerInput';

export default {
  name: 'App',
  components: {
    VColorPickerInput,
  },
  data() {
    return {
      color: null,
    };
  },
  mounted() {
    setTimeout(() => {
      this.color = '#f44336';
      console.log('setting color =>', JSON.stringify(this.color));
    }, 5000);
  },
  methods: {
    showColor(value) {
      console.log('selected =>', JSON.stringify(value));
    },
  },
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 10px;
}
</style>
