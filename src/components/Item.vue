<template>
	<el-card shadow="hover" class="card" :body-style="{ padding: '0px' }">
		<a :href="item?.url" target="_blank">
			<img :src="item?.src" class="image" />
			<div class="container">
				<span>{{ item?.title }}</span>
				<div class="bottom">
					<time class="time">{{ item?.time }}</time>
				</div>
			</div>
		</a>
	</el-card>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { ItemContent } from './util';

defineProps({
	item: Object as PropType<ItemContent>
})
</script>

<style scoped lang="scss">
.card {
	width: calc(100% / var(--size) - 10px * (var(--size) - 1) / var(--size) - 1px);

	a {
		color: inherit
	}

	.container { 
		padding: 5px 10px;

		span {
			width: 100%;
			display: block;
			text-align: left;
			height: 3em;
			overflow: hidden;
		}

		.bottom {
			position: relative;
			bottom: 0;
			.time {
				font-size: 0.5em;
				color: grey;
				display: block;
				text-align: right;
			}
		}
		
	}
	.image {
		width: 100%;
		display: block;
	}
}
</style>