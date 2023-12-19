<template>
  <div class="flex flex-col min-h-screen font-Noto bg-weather-primary">
    <SiteNavigation />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import SiteNavigation from './components/SiteNavigation.vue';
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
