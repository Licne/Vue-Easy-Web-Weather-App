<template>
    <Suspense>
        <AsyncCityView />
        <template #fallback>
            <p class="text-center bg-weather-secondary text-white py-2 px-1">
                Loading...♥ <br>
                若长时间加载请尝试重新搜索或扩大搜索范围
            </p>
        </template>
    </Suspense>
</template>

<script setup>
import AsyncCityView from '@/components/AsyncCityView.vue';


</script>

<style scoped></style>