<template>
	<el-scrollbar :height="'calc(100vh - 35vw)'" view-class="view">
		<div class="line" v-for="line in realData">
			<Item v-for="i in line" :item="i" :style="{'--size': size}" />
		</div>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ItemContent } from './util';
import { TaskWaitAll } from './bili'

import Item from './Item.vue'

const props = defineProps({
	itemURL: String,
	size: Number
})

const Items = ref<ItemContent[]>([])

const realData = computed(() => {
	let tempData: ItemContent[] = []
	let reslData = []
	Items.value.forEach(
		data => {
			tempData.push(data)
			if(props.size && tempData.length >= props.size) {
				reslData.push(tempData)
				tempData = []
			}
		}
	)
	if(tempData.length != 0) reslData.push(tempData)
	return reslData
})

TaskWaitAll([
	"BV1Nd4y1E7Xi", "BV1NV4y1s7qy", "BV1Wq4y1g7SW", "BV1WQ4y1i7NH", "BV1Y541177Rg", "BV18q4y1z7Vv",
	"BV1vJ411B7ng", "BV1n3411Y7fR", "BV1d34y1D7Vk", "BV1wT4y1r7g6", "BV1924y1R76y", "BV1JA4y1d7Bb",
	"BV1yU4y1W7Y2", "BV1tU4y1R7qu", "BV1yf4y137XH", "BV16D4y177Ef", "BV1DK4y1g7zE", "BV19K4y1p7Zh"
]).then(result => Items.value = result)
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
	}
}
</style>