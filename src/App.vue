<template>
  <div id="app">
    <VColorPicker></VColorPicker>
  </div>
</template>

<script>
import VColorPicker from './components/VColorPicker';

export default {
  name: 'app',
  components: {
    VColorPicker,
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
