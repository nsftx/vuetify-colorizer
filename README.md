[![npm](https://img.shields.io/npm/v/@nsoft/vuetify-colorizer.svg)](https://www.npmjs.com/package/@nsoft/vuetify-colorizer) 
[![Greenkeeper badge](https://badges.greenkeeper.io/chmjs/vuetify-colorizer.svg)](https://greenkeeper.io/) 
[![Build Status](https://travis-ci.org/chmjs/vuetify-colorizer.svg?branch=master)](https://travis-ci.org/chmjs/vuetify-colorizer) 
[![codebeat badge](https://codebeat.co/badges/690f689b-87eb-42f4-a656-cc3400ac3c0d)](https://codebeat.co/projects/github-com-chmjs-vuetify-colorizer-master)
[![codecov](https://codecov.io/gh/chmjs/vuetify-colorizer/branch/master/graph/badge.svg)](https://codecov.io/gh/chmjs/vuetify-colorizer)

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
