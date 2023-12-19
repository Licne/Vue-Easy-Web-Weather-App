<template>
    <div class="flex flex-col gap-4 items-center text-sm">
        <p class="whitespace-nowrap text-md">{{ time.getDate() }}日 &nbsp;{{ time.getHours() }}时</p> 
        <img :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`" alt="图裂了！" class="w-auto h-[50px] object-cover">
        <p class="text-xl">
              {{ Math.round(hourData.main.temp) }}&deg;C
        </p>
    </div>
</template>

<script setup>
const props = defineProps({
    hourData:{
        type:Object,
    },
    time:{
        type:Date
    }
})

// const time = new Date(hourData.value.dt_txt);
// const icon = `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`;
// const temp = hourData.main.temp;

// const month = String(time.getMonth() + 1);
// const day = String(time.getDate());
// const hour = String(time.getHours());
</script> 

<style lang="scss" scoped></style>