<template>
    <main class="container text-white">
        <div class="pt-4 mb-8 relative">
            <input 
            type="text" 
            placeholder="搜索一个城市或地区" 
            v-model="searchQuery"
            @input="getSearchResults"
            class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">
            <ul 
                v-show="cityResults"
                class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-16 overflow-y-scroll max-h-64 cityRes-box">
                <p v-if="isSeverError" class="py-2">哇哦，服务器出现未知错误捏</p>
                <p v-else-if="!isSeverError && cityResultsLength === 0">诶，没有结果耶</p>
                <template v-else>
                    <li 
                        :key="cityResult.adcode"
                        v-for="cityResult in cityResults"
                        @click="previewCity(cityResult)"
                        class="py-2 cursor-pointer">
                        {{ cityResult.name }}
                    </li>   
                </template>
            </ul>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'
import { useRouter } from 'vue-router';

// API常量
const CITY_URL = import.meta.env.VITE_API_CITY_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// 使用router
const router = useRouter()


// 输入请求内容
const searchQuery =ref("");
// 行政区结果 
const cityResults = ref(null);
// 行政区结果长度
const cityResultsLength = ref(null);
// 请求定时器
const queryTimeOut = ref(null);
// 搜索错误
const isSeverError = ref(false);

// 查询行政区
const getSearchResults = () => {
    // 此处定时器用于防抖
    // 每次输入都会清楚上一次的定时器，直到不进行输入1s 定时器执行回调
    // 清除定时器
    clearTimeout(queryTimeOut.value);
    // 清除查询长度
    cityResultsLength.value = null;
    // 清除错误信息
    isSeverError.value = null;
    queryTimeOut.value = setTimeout(async () => {
        if(searchQuery.value !== ""){
            try{
                const result = await axios.get(`${CITY_URL}?key=${API_KEY}&subdistrict=0&keywords=${searchQuery.value}`)
                cityResults.value = result.data.districts;
                cityResultsLength.value = cityResults.value.length;
                console.log("当前查询的城市结果:",cityResults);
                return;
            } catch(err) {
                isSeverError.value = true;
                console.log(err);
            }
        }
        cityResults.value = null;
    },300)
}
const previewCity = (cityResult) => {
    console.log('当前预览的城市:',cityResult);

    const [lat,lon] = cityResult.center.split(',')
    router.push({
        name:'cityView',
        params: {
            city: cityResult.name,
        },
        query:{
            preview:true,
        }
    });
};

</script>

<style scoped>
.cityRes-box::-webkit-scrollbar {
    display: none;
}
</style>