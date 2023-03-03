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
        <el-header height="35vw" class="header" :style="{backgroundImage: `url(${selectedIcon.banner})`}">
          <h2>你好李鑫</h2>
        </el-header>
        <el-main class="main" style="--el-main-padding: 10px 0px">
          <el-scrollbar 
            :height="'calc(100vh - 35vw - 20px)'"
            style="padding: 0px 10px;"
            view-class="view">
            <div class="line" v-for="i in [...Array(selectedIcon.id).keys()]">
              <el-card shadow="hover" class="card" :body-style="{ padding: '0px' }">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                />
                <div style="padding: 14px">
                  <span>Yummy hamburger</span>
                  <div class="bottom">
                    <time class="time">{{ selectedIcon.id }}</time>
                    <el-button text class="button">Operating</el-button>
                  </div>
                </div>
              </el-card>
              <el-card shadow="hover" class="card" :body-style="{ padding: '0px' }">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                />
                <div style="padding: 14px">
                  <span>Yummy hamburger</span>
                  <div class="bottom">
                    <time class="time">{{ selectedIcon.id }}</time>
                    <el-button text class="button">Operating</el-button>
                  </div>
                </div>
              </el-card>
            </div>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { IconContent } from './components/util';

import Icon from './components/Icon.vue'

// 按钮蓝色边框选择
const lastSelected = ref(0)
const selectedIcon = computed(() => {
  return IconContents.value[lastSelected.value]
})
function changeSelect(id: number) {
  selectedIcon.value.select = false
  IconContents.value[id].select = true
  lastSelected.value = id
}

const IconContents = ref<IconContent[]>([
  {
    id: 0,
    select: false,
    face: true,
    src: "/favicon.ico",
    banner: "https://yun.nana7mi.link/7mi.webp"
  }
])

for(let i=1;i<50;i++) {
  IconContents.value.push({
    id: i,
    select: false,
    face: false,
    src: "/favicon.ico",
    banner: "https://yun.nana7mi.link/afternoon.webp"
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
  
  :deep(.view) {
    .line:first-child {
      padding-top: 0;
    }

    .line {
      display: flex;
      justify-content: space-between;
      padding: 2.5px 0;
      .card {
        width: calc(50% - 5px);
      }
    }

    .line:last-child {
      padding-bottom: 0;
    }
  }
}
</style>