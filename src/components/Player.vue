<template>
  <div :class="{player: true, cover: covered.status}">
    <el-divider />
    <slot></slot>
  </div>
</template>

<script setup>
import { ElDivider } from 'element-plus'

defineProps({
  covered: Object
})
</script>

<style lang="scss">
.player {
  position: relative;
  padding: 1em;
  width: calc(100% - 2em);
  height: calc(var(--main-height) - 2em);
  left: 100%;
  top: calc(-100% + var(--title));
  background-color: white;
  z-index: 5;
  transition: left 0.2s;

  button {
    float: right;
  }

  .el-divider {
    position: relative;
    width: calc(100% + 2em);
    margin: 0;
    top: -1em;
    left: -1em;
  }
}

.cover {
  left: 0 !important;
}
</style>