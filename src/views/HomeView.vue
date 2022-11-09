<template>
  <h1>Home</h1>
  <div v-for="item in iconData.icons" :key="item.id">
    <img
      :src="`data:image/svg+xml;base64,${Base64.encode(item.svgCode)}`"
      height="36"
      width="36"
    />
    <div>{{ JSON.stringify(item) }}</div>
  </div>
</template>

<script setup>
import { shallowRef } from 'vue';
import { Base64 } from 'js-base64';

const iconData = shallowRef({});

window.network.fetchIconData().then((data) => (iconData.value = data));
</script>
