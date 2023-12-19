<template>
    <div class="flex flex-col flex-1 items-center">
        <!-- 提示信息 -->
        <div 
            v-show="route.query.preview"
            class="text-white p-4 bg-weather-secondary w-full text-center">
            <p>
                您当前正在预览一个城市，点击"+"图标跟踪这个城市
            </p>
        </div>
        
        <!-- 天气总览 -->
        <div class="flex flex-col items-center text-white py-8">
            <h1 class="text-2xl mb-1">{{ route.params.city }}</h1>
            <p class="text-sm mb-8">{{ currentTime }}</p>
            <p class="text-6xl mb-8">{{ weatherData.curList.main.temp}}&deg;C</p>
            <p>体感&nbsp;{{ weatherData.curList.main.feels_like }}&deg;C</p>
            <p>{{ weatherData.curList.weather[0].description }}</p>
            <img
            class="w-[80px] h-auto"
            :src="`http://openweathermap.org/img/wn/${weatherData.curList.weather[0].icon}@2x.png`"
            alt="图炸了！！！"
            />
        </div>

        <hr class="border-white border-opacity-10 border w-full" />

        <!-- 小时天气 -->

        <div class="max-w-screen-md w-full py-10">
            <div class="mx-8 text-white">
                <h2 class="mb-4">时段天气</h2>
                <div class="flex gap-10 overflow-x-scroll hourly-box">
                    <HourlyTime 
                    :hourData="hourData"
                    :time="new Date(hourData.dt_txt)" 
                    :key="hourData.dt" 
                    v-for="hourData in weatherData.list"/>
                <!-- <div v-for="hourData in weatherData.list">{{ console.log(hourData) }}</div> -->
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onBeforeUnmount} from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import HourlyTime from './HourlyTime.vue';

const WEATHER_URL = import.meta.env.VITE_API_WEATHER_URL;
const API_KEY = import.meta.env.VITE_API_OPEN_WEATHER_API_KEY;


// 生命周期钩子
onBeforeUnmount(()=> {
    clearInterval(currentTimeout);
})

// axios 请求数据
const route = useRoute();

// 取得距离当前时间最近的天气
// 返回 lists中的一个对象
const getCurrentWeather = (weatherData) => {
    const curTime = new Date();
    // let closetTime = null;
    let closetIndex = 0;
    let minDifference = Infinity;
    weatherData.list.forEach((w, index) => {
        const temTime = new Date(w.dt_txt);
        const diff = Math.abs(curTime - temTime);
        if (diff < minDifference) {
            // console.log(diff,"   ", minDifference)
            minDifference = diff;
            closetIndex = index
        }
    })
    return weatherData.list[closetIndex];

};
// axios请求 取得数据
const getweatherData = async () => {
    try {
        const weatherData = await axios.get(`${WEATHER_URL}?appid=${API_KEY}&q=${route.params.city}&lang=zh_cn&units=metric`);

        const curTemp = getCurrentWeather(weatherData.data);
        weatherData.data.curList = curTemp;

        return weatherData.data;
        
    } catch (error) {
        console.log(error)
    }
}
const weatherData = await getweatherData();

console.log(weatherData);


// 实时时间显示
const currentTime = ref('');
const transTime = () => {
    const now = new Date()
    currentTime.value = now.toLocaleDateString("zh-cn",{
              weekday: "short",
              day: "2-digit",
              month: "long",
            }) + ' ' + now.toLocaleTimeString("zh-cn",{
                timeStyle:"short",
            });
}
// 立即执行并设定定时器
transTime();
const currentTimeout = setInterval(transTime, 1000);



</script>

<style scoped>
.hourly-box::-webkit-scrollbar {
    display: none;
}
</style>