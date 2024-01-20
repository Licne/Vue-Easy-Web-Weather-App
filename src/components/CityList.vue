<template>
    <div>
        <div v-for="city in savedCities" :key="city.id">
            <CityCard :city="city" @click="goToCityView(city)"/>
        </div>
    </div>
</template>

<script setup>

import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CityCard from './CityCard.vue';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_CURRENT_WEATHER_URL;

const savedCities = ref([])
const getCities = async () => {
    if(localStorage.getItem('savedCities')) {
        savedCities.value =JSON.parse(localStorage.getItem('savedCities'))

        const req = [];
        savedCities.value.forEach((city) => {
            req.push(
                axios.get(API_URL, {
                    params:{
                        key:API_KEY,
                        city:city.adcode
                    }
                })
            )
        })

        const weatherData = await Promise.all(req);

        // 优化动画效果，延迟一秒显示
        await new Promise((res) => {setTimeout(res,1000)})

        weatherData.forEach((value, index) => {
            savedCities.value[index].weather = value.data;
        })
    }
}

await getCities();

const router = useRouter();
const goToCityView = (city) => {
    router.push({
        name:"cityView",
        params:{city: city.city},
        query:{id: city.id,adcode:city.adcode},
    })
}

</script>

