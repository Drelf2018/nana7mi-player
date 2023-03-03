<template>
  <div
    ref="icon"
    class="icon"
    @mouseup="up"
    @mouseleave="up" 
    @mousedown="down" 
    :face="content?.face"
    :selected="content?.select"
  >
    <div class="icon-container">
      <img :src="content?.src" class="pic">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue'
import { IconContent } from './util'

const props = defineProps({
  content: Object as PropType<IconContent>
})

const icon = ref<HTMLDivElement | null>(null)
const emit = defineEmits(['select'])

function down() {
  emit("select", props.content!.id)
  icon.value!.classList.add("down")
}

function up() {
  icon.value!.classList.remove("down")
}

</script>

<style lang="scss">
.down {
  scale: 0.9 !important;
}

.icon {
  width: 75%;
  transition: all 0.2s;

  .icon-container {
    width: 92%;
    padding: 4%;
  }

  .pic {
    width: 100%;
    display: block;
  }

  &:hover {
    scale: 1.1;
  }

  &[selected=true] {
    outline: 0.2em solid var(--select-border);
  }

  &[face=false] {
    border-radius: 25%;

    .pic {
      border-radius: 25%;
      box-shadow: 0px 4px 5px 1px rgb(0 0 0 / 10%);
    }
  }

  &[face=true] {
    border-radius: 50%;

    .pic {
      border-radius: 50%;
    }
  }
}
</style>