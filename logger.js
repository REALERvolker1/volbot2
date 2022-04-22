import fs from 'fs'
import chalk from 'chalk'
import { getTime } from './__commands__.js'
const log = async(logText,path) => {
  let d = new Date()
}
const logMessage = async(message) => { //inp message
  const d = getTime(new Date())
  var inp = `\n\n${d}\n${message.author.id}\n${message.member?.displayName}\n${message.content.replace(/\n/g, "\\n")}`
  var logmsg = `${chalk.gray(`[${d}]`)} ${chalk.blue(message.guild.name)} ${chalk.green(message.channel.name)} ${chalk.yellow(message.member?.displayName)}\n${chalk.bold(message.content.replace(/\n/g, "\\n"))}`
  let path = `logs/${message.guild.name}=${message.guild.id}/`
  let fileName = `${message.channel.name}=${message.channel.id}.txt`
  if (message.attachments){
    inp += `\n`
    logmsg += `\n`
    message.attachments.forEach(element => {
      inp += `[${element.contentType}  ${element.url}] `
      logmsg += `[${element.contentType}  ${element.url}] `
    })
  }
  if (!fs.existsSync(path)) fs.mkdirSync(path)
  fs.appendFileSync(`${path}${fileName}`,inp)
  console.log(logmsg)
}
const logEdit = async(msgs) => { //inp message array
  console.log('sup world')
  const d = getTime(new Date())
  var path, fileName, inp = `\n\nEDIT AT ${d}`
  msgs.forEach((message,key)=>{
    inp += `\n${message.author.id}\n${message.member?.displayName}\n${message.content.replace(/\n/g, "\\n")}`
    path = `logs/${message.guild.name}=${message.guild.id}/`
    fileName = `${message.channel.name}_EDITS=${message.channel.id}.txt`
    if (key == 0) inp += `\nCHANGED TO\n`
  })
  if (!fs.existsSync(path)) fs.mkdirSync(path)
  fs.appendFileSync(`${path}${fileName}`,inp)
}
const logInteraction = async(inter) => { //inp interaction
  const d = getTime(new Date())
  let inp = `\n\n${d}\n${inter.member.id}\n${inter.member?.displayName}\n${inter.commandName}`
  let path = `logs/${inter.guild.name}=${inter.guild.id}/`
  let fileName = `${inter.channel.name}=${inter.channel.id}.txt`
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  fs.appendFileSync(`${path}${fileName}`,inp)
  console.log(chalk.bgWhite(`${chalk.gray(`[${d}]`)} ${chalk.blue(inter.guild.name)} ${chalk.green(inter.channel.name)} ${chalk.red(inter.member?.displayName)}\n${chalk.black(chalk.bold(inter.commandName))}`))
}
const logMember = async(memb) => { //inp guildMember
  console.log(`test`)
}
const logGuild = async(guild) => { //inp guild
  console.log(`test`)
}
export {logMessage,logEdit,logInteraction,logMember,logGuild,log}
