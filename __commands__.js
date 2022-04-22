import {MessageEmbed} from 'discord.js'
const getTime = (d) => {
  var tod = "pm"
  var h = d.getHours()
  var m = d.getMinutes()
  var s = d.getSeconds()
  if (h > 1 && h < 11){
    tod = "am"
  }
  else{
    if (h == 0 | h == 12) h = 24
    h -= 12
  }
  if (s < 10){
    s = `0${s}`
  }
  if (m < 10){
    m = `0${m}`
  }
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${h}:${m}:${s} ${tod}`
}
const rnd = (min,max) => {
  if (max == undefined) max = 1
  if (min == undefined) min = 0
  return Math.floor((Math.random()*(max-min))+min)
}
const rgbToHex = (r,g,b) => {
  return "0x"+((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
const embedSend = (res) => {
  let embed = new MessageEmbed({
    color:rgbToHex(rnd(0,255),rnd(0,255),rnd(0,255)),
    title:res.title,
    description:res.response,
    image:{
      url:res.image?.url
    },
    timestamp: new Date().toString(),
  })
  return embed
}
export {rnd,getTime,rgbToHex,embedSend}