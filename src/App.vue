<template>
  <Title :covered="covered">海比播放器</Title>
  <el-container class="common-layout">
    <el-aside width="80px" class="aside">
      <Sider ref="sider" :watch="watch" />
    </el-aside>
    <el-container v-if="sider" class="content">
      <el-header :height="sider.icon.id == 0 && uid == null ? '0px' : 'var(--header)'" class="header"
        :style="{ backgroundImage: sider.icon.banner }">
        <h2>{{ sider.icon.name }}</h2>
      </el-header>
      <el-main class="main">
        <Login v-if="sider.icon.id == 0 && uid == null" />
        <p v-else-if="sider.icon.id == 0 && uid != null">头像</p>
        <p v-else-if="sider.icon.id == 1">主页</p>
        <Show v-else :key="sider.icon.id" :size="sider.icon.size" :url="sider.icon.url" :covered="covered" />
      </el-main>
    </el-container>
  </el-container>
  <div v-if="covered.status" id="popLayer" @click="() => covered.close()"></div>
  <Player :covered="covered">
    <video ref="video" :src="covered.data" autoplay :volume="0.3" class="video" @loadedmetadata="() => covered.onVideoLoaded()"></video>
  </Player>
</template>

<script setup>
import { ref } from 'vue'

import Show from './components/Show.vue'
import Sider from './components/Sider.vue'
import Title from './components/Title.vue'
import Login from './components/Login.vue'
import Player from './components/Player.vue'

import { ElContainer, ElAside, ElHeader, ElMain } from 'element-plus'

const uid = ref(localStorage.getItem("uid"))
const sider = ref(null)
const video = ref(null)
const watch = ref([])
const covered = ref(new Covered(false))

function Covered(status) {
  this.data = null
  this.status = status
  this.isWidth = false
  this.switch = function () {
    this.status = !this.status
  }
  this.open = function (data) {
    this.data = data
    this.status = true
  }
  this.close = function (data, delay = 200) {
    setTimeout(() => this.data = data, delay)
    this.status = false
  }
  this.onVideoLoaded = function() {
    this.isWidth = video.value.videoWidth > video.value.videoHeight
  }
}

setTimeout(() => {
  watch.value = [2, 3, 4, 5, 6]
}, 10)
</script>

<style scoped lang="scss">
#popLayer {
  position: fixed;
  width: calc(100% - 10px);
  height: var(--main-height);
  top: calc(var(--title) + 5px);
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: rgba(0, 0, 0, 0.05);
  z-index: 4;
}

.video {
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}

.common-layout {
  width: 100%;
  height: var(--main-height);
  overflow: hidden;
  transition: all 0.2s;

  .aside {
    background-color: var(--scroll-background);
    overflow: hidden;
  }

  .content {
    width: calc(100% - 80px);
  }

  .header {
    background-size: cover;
    z-index: 2;
    background-position-x: center;

    h2 {
      color: white;
      position: relative;
      top: 100%;
      transform: translateY(-200%);
      text-shadow: 1px 2px 2px rgb(0 0 0 / 50%);
      float: left;
    }
  }

  .main {
    --el-main-padding: 0px;
    background-color: white;
  }
}
</style>