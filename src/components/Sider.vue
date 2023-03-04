<template>
  <div class="sticky">
    <Icon :content="IconMap.get(0)" @select="changeSelect" />
    <Icon :content="IconMap.get(1)" @select="changeSelect" style="--pic-background-color: white" />
  </div>
  <el-scrollbar :height="'calc(100vh - 35vw)'" view-style="z-index: 1" class="scroll">
    <Icon v-for="w in watch" :key="w" :content="IconMap.get(w)" @select="changeSelect" />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'

import Icon from './Icon.vue'

defineProps({ watch: Object })

// 按钮蓝色边框选择
let lastSelected = ref(0)
const selectedIcon = computed(() => {
  return IconMap.value.get(lastSelected.value)
})

// 修改被选择按钮
function changeSelect(position: number) {
  selectedIcon.value.select = false
  IconMap.value.get(position).select = true
  lastSelected.value = position
}

// 按钮大全
const IconMap = ref(new Map())
IconMap.value.set(0, {
  id: 0,
  select: false,
  face: true,
  src: "/favicon.ico",
  banner: "https://yun.nana7mi.link/7mi.webp",
  name: "头像"
})
IconMap.value.set(1, {
  id: 1,
  select: false,
  face: false,
  src: "/planet-outline.png",
  banner: "https://yun.nana7mi.link/7mi.webp",
  name: "主页"
})

// 获取比例比例按钮
axios.get("https://aliyun.nana7mi.link/user.User(434334701).get_user_info().face").then(
  res => IconMap.value.set(2, {
    id: 2,
    select: false,
    face: false,
    src: res.data.data,
    banner: "https://yun.nana7mi.link/afternoon.webp",
    name: "哔哩哔哩"
  })
)

defineExpose({ icon: selectedIcon })
</script>

<style scoped lang="scss">
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
</style>