import { createApp } from 'vue'
import './font.css'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // { path: '/', component: HelloWorld },
    ]
})

function updateVH() {
    document.body.style.setProperty("--vh", window.innerHeight / 100 + "px")
}
updateVH()
window.onresize = updateVH

createApp(App).use(ElementPlus).use(router).mount('#app')
