#  本地天气 Local Weather

>学习视频 : https://www.bilibili.com/video/BV1514y1Y7hH



## 介绍

本项目为个人练习Vue3的简单前端应用，能够查询国内行政区的天气状况，并存储在本地。



### API列表

🚝行政区查询: [行政区域查询-基础 API 文档-开发指南-Web服务 API|高德地图API (amap.com)](https://lbs.amap.com/api/webservice/guide/api/district)

⛅当前天气查询:[天气查询-基础 API 文档-开发指南-Web服务 API|高德地图API (amap.com)](https://lbs.amap.com/api/webservice/guide/api/weatherinfo)

⛅天气预报查询:[Weather API - OpenWeatherMap](https://openweathermap.org/api)



## 使用

### 本地部署

```
安装依赖
npm install
运行项目
npm run dev
打包项目
npm run build
```

### 环境变量

在项目根目录创建文件.env，填入自己申请的APIKEY

```shell
# .env
# 高德行政区查询API
VITE_API_CITY_URL=https://restapi.amap.com/v3/config/district
VITE_API_KEY=[在此填入]
# 高德当前天气查询API
VITE_API_CURRENT_WEATHER_URL=https://restapi.amap.com/v3/weather/weatherInfo
# openWeather预报天气查询
VITE_API_WEATHER_URL=https://api.openweathermap.org/data/2.5/forecast
VITE_API_OPEN_WEATHER_API_KEY=[在此填入]
```

