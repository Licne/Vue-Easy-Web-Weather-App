import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@/views/HomeView.vue"),
      meta:{
        title:"Home"
      }
    },
    {
      path: '/weather/:city',
      name: 'cityView',
      component: () => import("@/views/CityView.vue"),
      meta: {
        title:"Weather"
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.params.city ? to.params.city : to.meta.title} | 本地天气`;
  next();
})

export default router
