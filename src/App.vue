<template>
  <Title></Title>
  <el-container class="common-layout">
    <el-aside width="80px" class="aside">
      <Sider ref="sider" :watch="watch" />
    </el-aside>
    <el-container v-if="sider" class="content">
      <el-header height="35vw" class="header" :style="{ backgroundImage: `url(${sider.icon.banner})` }">
        <h2>{{ sider.icon.name }}</h2>
      </el-header>
      <el-main class="main">
        <p v-if="sider.icon.id == 0">头像</p>
        <p v-else-if="sider.icon.id == 1">主页</p>
        <Show v-else :size="0"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'

import Sider from './components/Sider.vue'
import Show from './components/Show.vue';
import Title from './components/Title.vue'

import { ElContainer, ElAside, ElHeader, ElMain } from 'element-plus'

const sider = ref(null)
const watch = ref([])

setTimeout(() => {
  watch.value = [2, 3, 4, 5, 6]
}, 10)
</script>

<style scoped lang="scss">
.common-layout {
  width: 100%;
  height: calc(100vh - 10px - var(--title));
  overflow: hidden;

  .aside {
    background-color: var(--scroll-background);
    overflow: hidden;
  }

  .content {
    width: calc(100% - 80px);
  }

  .header {
    min-height: 130px;
    max-height: 160px;
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