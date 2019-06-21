<template>
  <v-app id="app">
    <v-content>
      <v-container>
        <h1>vuetify-colorizer</h1>
        <p>
          This is an example of the vuetify-colorizer:
        </p>
        <br>
        <VColorPickerInput v-model="color"
                           return-type="value"
                           @change="showColor">
        </VColorPickerInput>
      </v-container>
    </v-content>
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
      color: null,
    };
  },
  methods: {
    showColor(value) {
      console.log('selected =>', JSON.stringify(value));
    },
  },
  mounted() {
    setTimeout(() => {
      this.color = '#f44336';
      console.log('setting color =>', JSON.stringify(this.color));
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
