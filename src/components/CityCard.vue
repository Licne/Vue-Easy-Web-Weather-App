<template>
    <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer mb-2">
        <div class="flex flex-col flex-1">
            <h2 class="text-2xl">{{ city.city }}</h2>
            <h3>{{ city.weather.lives[0].province }}</h3>
        </div>

        <div class="flex flex-col">
            <h2 class="text-2xl self-end">{{ city.weather.lives[0].temperature }}&degC</h2>
            <h3 class="self-end">{{ city.weather.lives[0].weather }}</h3>
            
        </div>

    </div>
</template>

<script setup>

defineProps({
    city:{
        type: Object,
        default: () => {}
    }
})
</script>

<!-- { "status": "1", "count": "1", "info": "OK", "infocode": "10000", "lives": [ { "province": "江苏", "city": "徐州市", "adcode": "320300", "weather": "阴", "temperature": "2", "winddirection": "西", "windpower": "≤3", "humidity": "75", "reporttime": "2024-01-20 18:04:58", "temperature_float": "2.0", "humidity_float": "75.0" } ] } -->