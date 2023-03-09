<template>
	<div class="title">
		<div>
			<el-avatar :size="40" src="/favicon.ico" @click="reload" />
			<span><slot></slot></span>
		</div>
		<div>
			<el-button :icon="isLock ? Unlock : Lock" size="small" circle @click="() => lock()" :title="isLock ? '取消置顶' : '置于顶层'" />
			<el-button :icon="Minus" circle size="small" @click="miniWin" title="最小化" />
			<el-button :icon="isFull ? ZoomOut : ZoomIn" circle size="small" @click="resizeWin" title="切换窗口大小" />
			<el-button id="close" :icon="Close" circle size="small" style="color: red" color="rgb(255 20 20 / 10%)" @click="closeWin" title="关闭" />
		</div>
	</div>
</template>

<script setup>
import { Close, Minus, ZoomOut, ZoomIn, Unlock, Lock } from '@element-plus/icons-vue'
import { ipcRenderer } from "electron";

import { ref } from 'vue'
import { ElAvatar, ElButton } from 'element-plus'

defineProps({
	covered: Object
})

const remote = require('electron').remote;
const isFull = ref(true)
const isLock = ref(false)

function lock() {
	isLock.value = !isLock.value
	ipcRenderer.send(isLock.value ? "window-lock" : "window-unlock");
}

function reload() {
	location.reload()
}

function resizeWin() {
	if(isFull.value) remote.getCurrentWindow().setSize(359, 59)
	else remote.getCurrentWindow().setSize(890, 700)
	isFull.value = !isFull.value
}

function closeWin() {
  ipcRenderer.send("window-close");
}

function miniWin() {
  ipcRenderer.send("window-mini");
}
</script>

<style scoped lang="scss">
.title {
	background-color: white;
	height: var(--title);
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

	#close:hover {
		color: white !important;
	}

	span:first-child, button {
		-webkit-app-region: none;
	}
}
</style>