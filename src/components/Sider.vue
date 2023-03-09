<template>
  <div class="sticky">
    <Icon :content="IconMap.get(0)" @select="changeSelect" />
    <Icon :content="IconMap.get(1)" @select="changeSelect" style="--pic-background-color: white" />
  </div>
  <el-scrollbar :height="'var(--show-height)'" view-style="z-index: 1" class="scroll">
    <Icon v-for="w in watch" :key="w" :content="IconMap.get(w)" @select="changeSelect" />
  </el-scrollbar>
</template>

<script setup>
import { ref, computed } from 'vue'
import { GetStorage } from './util'
import { GetUserInfo } from './bili'

import { ElScrollbar } from 'element-plus'

import Icon from './Icon.vue'

defineProps({ watch: Object })

// 按钮蓝色边框选择
let lastSelected = ref(0)
const selectedIcon = computed(() => IconMap.value.get(lastSelected.value))

// 修改被选择按钮
function changeSelect(position) {
  selectedIcon.value.select = false
  IconMap.value.get(position).select = true
  lastSelected.value = position
}

let userIcon = {
  src: GetStorage("face", "https://i2.hdslb.com/bfs/face/de957f8066a32cb00183e6b8f71d3fef35b4d3ba.jpg"),
  banner: GetStorage("banner", "url(http://i1.hdslb.com/bfs/space/cb1c3ef50e22b6096fde67febe863494caefebad.png)")
}

// 按钮大全
const IconMap = ref(new Map([
  defaultIcon(0, {select: true, face: true, name: "头像", ...userIcon}),
  defaultIcon(1, {name: "主页", src: "/planet-outline.png", banner: "url(https://yun.nana7mi.link/7mi.webp)"}),
  defaultIcon(3, {name: "舞蹈（不是", src: "https://danmu.nana7mi.link/favicon.ico", banner: "url(https://yun.nana7mi.link/afternoon.webp)", url: "dance"})
]))


GetUserInfo(localStorage.getItem("uid")).then(res => {
  localStorage.setItem("face", res.src)
  localStorage.setItem("banner", res.banner)
})

// 获取比例比例按钮
GetUserInfo(434334701).then(
  res => IconMap.value.set(...defaultIcon(2, {
    name: "哔哩哔哩",
    url: "bilibili",
    ...res
  }))
).catch(console.log)

function defaultIcon(id, config) {
  return [id, {
    id: id,
    select: false,
    face: false,
    src: "",
    banner: "",
    name: "",
    size: 0,
    url: "",
    ...config
  }]
}

defineExpose({ icon: selectedIcon })
</script>

<style scoped lang="scss">
.sticky {
  height: var(--header);
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
  height: auto;

  .icon {
    margin: 10px;
  }

  :deep(.el-scrollbar__bar) {
    opacity: 0;
  }
}
</style>