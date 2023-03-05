import { createApp } from 'vue'
import './font.css'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { on } from './components/util'

on("resize", () => {
    document.body.style.setProperty("--vh", window.innerHeight / 100 + "px")
})

createApp(App).use(ElementPlus).mount('#app')
