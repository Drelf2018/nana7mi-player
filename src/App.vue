<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="18vw" class="aside">
        <div class="sticky">
          <Icon 
            v-for="content in IconContents.slice(0, 2)"
            :key="content.id"
            :content="content"
            @select="changeSelect"
          />
        </div>
        <el-scrollbar :height="'calc(100vh - 35vw)'" view-style="z-index: 1" class="scroll">
          <Icon 
            v-for="content in IconContents.slice(2)"
            :key="content.id"
            :content="content"
            @select="changeSelect"
          />
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header height="35vw" class="header">
          <h2>你好李鑫</h2>
        </el-header>
        <el-main>{{ IconContents[lastSelected].id }}</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconContent } from './components/util';

import Icon from './components/Icon.vue'

// 按钮蓝色边框选择
const lastSelected = ref(0)
function changeSelect(id: number) {
  IconContents.value[lastSelected.value].select = false
  IconContents.value[id].select = true
  lastSelected.value = id
}

const IconContents = ref<IconContent[]>([
  {
    id: 0,
    select: false,
    face: true,
    src: "/favicon.ico"
  }
])

for(let i=1;i<50;i++) {
  IconContents.value.push({
    id: i,
    select: false,
    face: false,
    src: "/favicon.ico"
  })
}

</script>

<style scoped lang="scss">
.common-layout {
  width: 100vw;
  overflow: hidden;
  
  .aside {
    max-width: 120px;
    height: 100vh;
    background-color: var(--scroll-background);
    overflow: hidden;
    
    .sticky {
      height: 35vw;
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      box-shadow: 0px 0px 5px 5px var(--scroll-background);
      
      .icon {
        margin: 0 auto;
      }
    }

    .scroll {
      z-index: 1;

      .icon {
        margin: 2vw auto;
      }

      :deep(.el-scrollbar__bar) {
        opacity: 0;
      }
    }
  }

  .header {
    background-image: url("https://yun.nana7mi.link/afternoon.webp");
    background-size: cover;
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