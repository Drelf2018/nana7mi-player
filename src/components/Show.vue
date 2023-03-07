<template>
	<el-scrollbar :height="'calc(var(--main-height) - 160px)'" view-class="view">
    <div v-infinite-scroll="GetAllVideos" :infinite-scroll-immediate="false" :infinite-scroll-distance="10">
      <div class="line" :size="line.length == realSize" v-for="line in realData">
        <Item v-for="i in line" :item="i" :covered="covered" :style="{'--size': realSize}" />
      </div>
    </div>
	</el-scrollbar>
</template>

<script setup>
import { ref, computed } from 'vue'
import { on } from './util';
import { TaskWaitAll, GetVideos } from './bili'

import { ElScrollbar } from 'element-plus'

import Item from './Item.vue'

const props = defineProps({
	url: String,
	size: {
		type: Number,
		default: 0
	},
  covered: Object
})

const realSize = ref(props.size)
const Items = ref([])

const realData = computed(() => {
	let tempData = []
	let reslData = []
	Items.value.forEach(
		data => {
			tempData.push(data)
			if(tempData.length >= realSize.value) {
				reslData.push(tempData)
				tempData = []
			}
		}
	)
	if(tempData.length != 0) reslData.push(tempData)
	return reslData
})

on("resize", function() {
	if(props.size == 0) realSize.value = Math.floor((window.innerWidth - 91) / 200)
})

let GetAllVideos

switch(props.url) {
  case "bilibili":
    GetAllVideos = GetVideos(434334701, Items.value)
    break
  case "dance":
    GetAllVideos = async () => TaskWaitAll([
      "BV1Nd4y1E7Xi", "BV1NV4y1s7qy", "BV1Wq4y1g7SW", "BV1WQ4y1i7NH", "BV1Y541177Rg", "BV18q4y1z7Vv",
      "BV1vJ411B7ng", "BV1n3411Y7fR", "BV1d34y1D7Vk", "BV1wT4y1r7g6", "BV1924y1R76y", "BV1JA4y1d7Bb",
      "BV1yU4y1W7Y2", "BV1tU4y1R7qu", "BV1yf4y137XH", "BV16D4y177Ef", "BV1DK4y1g7zE", "BV19K4y1p7Zh"
    ]).then(result => Items.value = result)
    break
}

GetAllVideos().catch(console.log)
</script>

<style scope lang="scss">
.view {
	.line:first-child {
		padding-top: 10px;
	}

	.line {
		display: flex;
		justify-content: space-between;
		padding: 5px 10px;
	}

	.line:last-child {
		padding-bottom: 10px;

		&[size=false] {
			justify-content: flex-start;
			.card {
				margin-right: 10px;
			}
		}
	}
}
</style>