<template>
  <div ref="player" :class="{player: true, cover: covered.status, height: covered.isWidth}">
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
.height {
  max-height: calc(0.5 * var(--main-height) - 2em);
}

.player {
  position: relative;
  padding: 1em;
  width: max-content;
  max-width: calc(100% - 79px - 2em);
  height: calc(var(--main-height) - 2em);
  left: 100%;
  top: calc(-100% + var(--title));
  background-color: white;
  z-index: 5;
  transform: translateX(0);
  border-bottom-left-radius: 10px;
  transition: transform 0.2s;

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
  transform: translateX(calc(-100% + 1px));
  box-shadow: -7px 15px 15px 0px rgb(0 0 0 / 30%);
}
</style>