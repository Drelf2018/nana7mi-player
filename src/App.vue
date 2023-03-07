<template>
  <Title :covered="covered">海比播放器</Title>
  <el-container class="common-layout">
    <el-aside width="80px" class="aside">
      <Sider ref="sider" :watch="watch" />
    </el-aside>
    <el-container v-if="sider" class="content">
      <el-header height="160px" class="header" :style="{ backgroundImage: `url(${sider.icon.banner})` }">
        <h2>{{ sider.icon.name }}</h2>
      </el-header>
      <el-main class="main">
        <p v-if="sider.icon.id == 0">头像</p>
        <p v-else-if="sider.icon.id == 1">主页</p>
        <Show v-else :key="sider.icon.id" :size="sider.icon.size" :url="sider.icon.url" :covered="covered" />
      </el-main>
    </el-container>
  </el-container>
  <Player :covered="covered">
    <video :src="covered.data" autoplay style="width: 100%;height: 100%;max-width: 100%;max-height: 100%;"></video>
  </Player>
</template>

<script setup>
import { ref } from 'vue'

import Show from './components/Show.vue'
import Sider from './components/Sider.vue'
import Title from './components/Title.vue'
import Player from './components/Player.vue'

import { ElContainer, ElAside, ElHeader, ElMain } from 'element-plus'

const sider = ref(null)
const watch = ref([])
const covered = ref(new Covered(false))

function Covered(status) {
  this.data = null
  this.status = status
  this.switch = function() {
    this.status = !this.status
  }
  this.open = function(data) {
    this.data = data
    this.status = true
  }
  this.close = function(data) {
    this.data = data
    this.status = false
  }
}

setTimeout(() => {
  watch.value = [2, 3, 4, 5, 6]
}, 10)
</script>

<style scoped lang="scss">
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