import axios from 'axios'
import { formatDate } from './util'

export function TaskWaitAll(args: Array<String>) {
	function getPicture(bv: String) {
		return axios.get(`https://aliyun.nana7mi.link/video.Video(${bv}).get_info()?max_age=2592000`).then(
			res => {
				return {
					title: res.data.data.title,
					src: res.data.data.pic,
					url: `https://www.bilibili.com/video/${bv}`,
					time: formatDate(res.data.data.pubdate * 1000)
				}
			}
		)
	}
	let taskall = []
	for (let arg of args) taskall.push(getPicture(arg))
	return Promise.all(taskall)
}