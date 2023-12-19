/** @type {import('tailwindcss').Config} */
export default {
  // 指定哪些文件被扫描以生成css样式
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    // 指定主题的属性
    extend: {
      colors: {
        "weather-primary": "#00668A",
        "weather-secondary": "#004E71",
      },
    },
    // 指定字体及后备字体
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
      Noto:["'Noto Serif SC', serif"],
    },
    // 指定自定义容器样式
    container: {
      padding: "2rem",
      center: true,
    },
    // 指定自定义响应式断点
    screens: {
      // sm 小屏幕最小宽度 md 中屏幕最小宽度
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
}

