<template>
	<div class="title">
		<div>
			<el-avatar :size="40" src="/favicon.ico" />
			<span>海比播放器</span>
		</div>
		<div>
			<el-button :icon="Minus" circle size="small" />
			<el-button :icon="Close" circle size="small" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { Close, Minus } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.title {
	background-color: white;
	height: 50px;
	width: calc(100% - 2em);
	padding: 0 1em;
	-webkit-app-region: drag;
	display: flex;
	align-items: center;
	justify-content: space-between;

	span+span {
		margin-top: 2px;
		margin-left: 6px;
		font-size: 1.15em;
	}

	div {
		display: flex;
		align-items: center;
	}
}
</style>