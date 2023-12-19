<template>
    <!-- SiteNavigation 导航 -->
    <header class="sticky bg-weather-primary shadow-lg">
        <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">

            <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-sun text-2xl"></i>
                    <p class="text-2xl">本地天气</p>
                </div>
            </RouterLink>

            <div class="flex gap-3 flex-1 justify-end">
                <!-- Info图标 -->
                <i 
                    @click="changeModal"
                    class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
                <i 
                    @click="addCity"
                    v-if="route.query.preview"
                    class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
            </div>

            <BaseModal :isModal="isModal" @close-Modal="changeModal">
                <!-- Info内容 -->
                <div class="text-black">
                    <h1 class="text-2xl mb-1">关于:</h1>
                    <p class="mb-4">
                        本地天气允许您跟踪当前和您选择的城市的未来天气。
                    </p>
                    <h2 class="text-2xl">如何使用:</h2>
                    <ol class="list-decimal list-inside mb-4">
                        <li>
                            通过在搜索栏中输入名称来搜索您所在的城市。
                        </li>
                        <li>
                            在结果中选择一个城市，这将采取您以当前天气为您选择。
                        </li>
                        <li>
                            中的“+”图标跟踪城市右上方。这将保存城市以稍后在主页上查看。
                        </li>
                    </ol>
                    <h2 class="text-2xl">移除一个城市:</h2>
                    <p>
                        如果您不再希望跟踪一个城市，只需选择首页内的城市。在底部页，将有一个选项删除城市。
                    </p>
                </div>
            </BaseModal>

        </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter, useRoute} from 'vue-router';
import BaseModal from "./BaseModal.vue"
import {uid} from 'uid'
import router from '@/router';

const route = useRoute();

const savedCities = ref([]);

const isModal = ref(false);
const changeModal = () => {
    isModal.value = !isModal.value;
}

const addCity = () => {
    if(localStorage.getItem("savedCities")) {
        savedCities.value = JSON.parse(localStorage.getItem("savedCities"))
    }

    const locationObj = {
        id: uid(),
        city: route.params.city,
    }

    savedCities.value.push(locationObj);
    localStorage.setItem("savedCities",JSON.stringify(savedCities.value));

    let query = Object.assign({}, route.query);
    delete query.preview;
    query.id = locationObj.id;
    router.replace({query});
}



</script>