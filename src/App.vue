<template>
  <el-container class="common-layout">
    <el-aside width="18vw" class="aside">
      <Sider ref="sider" :watch="watch" />
    </el-aside>
    <el-container>
      <el-header height="35vw" class="header" :style="{ backgroundImage: `url(${sider?.icon.banner})` }">
        <h2>{{ sider?.icon.name }}</h2>
      </el-header>
      <el-main style="--el-main-padding: 0px">
        <p v-if="sider?.icon.id == 0">头像</p>
        <p v-else-if="sider?.icon.id == 1">主页</p>
        <Show v-else :size="2"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Sider from './components/Sider.vue'
import Show from './components/Show.vue';

const sider = ref<InstanceType<typeof Sider> | null>(null)
const watch = ref<number[]>([])

setTimeout(() => {
  watch.value = [2, 3, 4, 5]
}, 10)
</script>

<style scoped lang="scss">
.common-layout {
  width: 100vw;
  overflow: hidden;

  .aside {
    max-width: 120px;
    height: calc(100 * var(--vh));
    background-color: var(--scroll-background);
    overflow: hidden;
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
}
</style>