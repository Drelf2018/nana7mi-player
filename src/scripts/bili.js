import { formatDate } from './util'
import { get_user_info, get_download_url, get_video_info, get_video_list } from './aliyun'

export async function GetUserInfo(uid) {
  let data = await get_user_info(uid)
  return {src: data.face, banner: "url(" + data.top_photo + ")"}
}

// async function GetHTML5(bv) {
//   let html = await axios.get(`https://aliyun.nana7mi.link/video.Video(bvid=${bv}).get_download_url(0:int,html5=1).durl.0.url?max_age=3600`)
//   return html.data.data
// }

export function TaskWaitAll(args) {
	async function getPicture(bv) {
    let url = await get_download_url(bv)
    return get_video_info(bv, 86400).then(
      data => {
				return {
					title: data.title,
					src: data.pic,
					url: url,
					time: formatDate(data.pubdate * 1000)
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
    let data = await get_video_list(uid, pn)
    data.forEach(video => {
      get_download_url(video.bvid).then(url => arr.push({
        title: video.title,
        src: video.pic,
        url: url,
        time: formatDate(video.created * 1000)
      }))
    })
    pn += 1
  }
}