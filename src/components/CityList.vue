<template>
    <div>

    </div>
</template>

<script setup>

import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_CURRENT_WEATHER_URL;

const savedCities = ref([])
const getCities = async () => {
    if(localStorage.getItem('savedCities')) {
        savedCities.value =JSON.parse(localStorage.getItem('savedCities'))

        const req = [];
        req.push(
            axios.get(``)
        )
    }
}
</script>

