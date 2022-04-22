import fs from 'fs'
import * as dc from 'discord.js'
import chalk from 'chalk'
import {logInteraction, logEdit, logMessage} from './logger.js'
import {embedSend} from './__commands__.js'
import {botToken} from './private/secret.mjs'
import Uwuifier from 'uwuifier'
const uwuifier = new Uwuifier({
  spaces: {faces: 0,actions: 0,stutters: 0},
  words: 1,
  exclamations: 0
})
const client = new dc.Client({intents: [`GUILDS`,`GUILD_MEMBERS`,`GUILD_BANS`,`GUILD_EMOJIS_AND_STICKERS`,`GUILD_INTEGRATIONS`,`GUILD_WEBHOOKS`,`GUILD_INVITES`,`GUILD_VOICE_STATES`,`GUILD_PRESENCES`,`GUILD_MESSAGES`,`GUILD_MESSAGE_REACTIONS`,`GUILD_MESSAGE_TYPING`,`DIRECT_MESSAGES`,`DIRECT_MESSAGE_REACTIONS`,`DIRECT_MESSAGE_TYPING`,`GUILD_SCHEDULED_EVENTS`]})

client.commands = new dc.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
	const {comm} = await import(`./commands/${file}`)
	client.commands.set(comm.data.name, comm)}
client.login(botToken)
client.once('ready', () => {
	client.user.setActivity(`Try out some / commands!`)
  console.log(chalk.green('sup world'))
})
client.on('error',console.error)
client.on('channelCreate',(ch)=>{
  try{
    ch.send('first :stuck_out_tongue_winking_eye:')
  }
  catch(err){
    console.log(chalk.redBright(err))
  }
})
client.on("messageCreate", async(msg) => {
  try{
    logMessage(msg)
  }
  catch(err){
    console.log(chalk.redBright(err))
  }
})
/*client.on("messageUpdate",(oldmsg,newmsg)=>{
  logEdit([oldmsg,newmsg])
})*/
client.on('interactionCreate',async(interaction)=>{
  if (interaction.isCommand()) interactCommand(interaction)
})
client.on('guildCreate', async(guild)=>{
  console.log(chalk.bgBlueBright(cyanBright(`ADDED TO A GUILD`)))
  try{
    fs.appendFileSync('./logs/guilds.txt',`|${guild.id}`)
    const {appSlashCommandInit} = await import(`./init.js`)
    appSlashCommandInit()
  }
  catch(err){
    console.log(err)
  }
})


async function interactCommand(interaction){
	const command = client.commands.get(interaction.commandName)
	if (!command) return
	try {
		await command.execute(interaction)
    try{
      logInteraction(interaction)
    }
    catch(err){
      console.log(chalk.redBright(err))
    }
	}
	catch (error) {
		console.error(chalk.redBright(error))
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
	}
}