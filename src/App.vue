<template>
  <div class="flex flex-col min-h-screen font-Noto bg-weather-primary">
    <SiteNavigation />
    <RouterView v-slot="{Component}">
      <Transition>
        <component :is="Component" />
      </Transition>
    </RouterView>
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

.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
