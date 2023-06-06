import axios from 'axios'

const aliyun = axios.create({
  baseURL: 'https://aliyun.nana7mi.link/',
})

export default aliyun

export async function request(url, max_age = -1) {
  let res = await aliyun.get(url, { params: { max_age: max_age } })
  if(res.data.code != 0) throw res.data.data
  return res.data.data
}

export async function get_user_info(uid, max_age = -1) {
  return await request(`/user.User(${uid}).get_user_info()`, max_age)
}

export async function get_user_face(uid, max_age = -1) {
  return await request(`/user.User(${uid}).get_user_info().face`, max_age)
}

export async function get_room_info(roomid, max_age = -1) {
  return await request(`/live.LiveRoom(${roomid}).get_room_info()`, max_age)
}

export async function get_chat_host(roomid, max_age = -1) {
  return await request(`/live.LiveRoom(${roomid}).get_chat_conf().host`, max_age)
}

export async function get_download_url(bv, max_age = -1) {
  return await request(`/video.Video(bvid=${bv}).get_download_url(0:int,html5=1).durl.0.url`, max_age)
}

export async function get_video_info(bv, max_age = -1) {
  return await request(`/video.Video(${bv}).get_info()`, max_age)
}

export async function get_video_list(uid, pn = 1, max_age = -1) {
  return await request(`/user.User(${uid}).get_videos(pn=${pn}:int).list.vlist`, max_age)
}