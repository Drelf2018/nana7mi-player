import axios from 'axios'
import { formatDate } from './util'

async function GetHTML5(bv) {
  let html = await axios.get(`https://aliyun.nana7mi.link/video.Video(bvid=${bv}).get_download_url(0:int,html5=1).durl.0.url?max_age=2592000`)
  return html.data.data
}

export function TaskWaitAll(args) {
	function getPicture(bv) {
		return axios.get(`https://aliyun.nana7mi.link/video.Video(${bv}).get_info()?max_age=86400`).then(
			async res => {
				return {
					title: res.data.data.title,
					src: res.data.data.pic,
					url: await GetHTML5(bv),
					time: formatDate(res.data.data.pubdate * 1000)
				}
			}
		).catch(console.log)
	}
	let taskall = []
	for (let arg of args) taskall.push(getPicture(arg))
	return Promise.all(taskall)
}

export function GetVideos(u, arr) {
  let uid = u
  let pn = 1
  return async function() {
    let res = await axios.get(`https://aliyun.nana7mi.link/user.User(${uid}).get_videos(pn=${pn}:int).list.vlist`)
    res.data.data.forEach(async video => {
      arr.push({
        title: video.title,
        src: video.pic,
        url: await GetHTML5(video.bvid),
        time: formatDate(video.created * 1000)
      })
    })
    pn += 1
  }
}