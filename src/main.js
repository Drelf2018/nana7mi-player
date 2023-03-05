import { createApp } from 'vue'
import './font.css'
import './style.css'
import App from './App.vue'
import Title from './components/Title.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createRouter, createWebHistory } from 'vue-router'

import { on } from './components/util'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/electron', component: Title },
    ]
})

on("resize", () => {
    document.body.style.setProperty("--vh", window.innerHeight / 100 + "px")
})

createApp(App).use(ElementPlus).use(router).mount('#app')
