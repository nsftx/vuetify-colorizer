[![NPM version](https://badge.fury.io/js/vuetify-colorizer.svg)](http://badge.fury.io/js/vuetify-colorizer) 
[![Build Status](https://travis-ci.org/manico/vuetify-colorizer.svg?branch=master)](https://travis-ci.org/manico/vuetify-colorizer) 
[![codecov](https://codecov.io/gh/manico/vuetify-colorizer/branch/master/graph/badge.svg)](https://codecov.io/gh/manico/vuetify-colorizer) 
[![codebeat badge](https://codebeat.co/badges/81171683-f0d7-4a4f-8664-25dba6824452)](https://codebeat.co/projects/github-com-manico-vuetify-colorizer-master)

# vuetify-colorizer

> Color component for Vuetify framework

## Installation

```bash
# npm
npm install @nsoft/vuetify-colorizer
```

## Using

### Import

```javascript
import Vue from 'vue';
import { VColorPickerInput } from '@nsoft/vuetify-colorizer';
import App from './App';

Vue.config.productionTip = false;
Vue.use(VColorPickerInput);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
```

### Import locally

```javascript
import { VColorPickerInput } from '@nsoft/vuetify-colorizer';

export default {
  name: 'app',
  components: {
    VColorPickerInput,
  },
};
```

### Use in template

```html
<template>
  <div id="app">
    <VColorPickerInput/>
  </div>
</template>
```
