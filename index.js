import fs from 'fs'
import dc from 'discord.js'
import chalk from 'chalk'
import {appSlashCommandInit, commandFiles} from './init.js'
import {logInteraction, logEdit, logMessage} from './logger.js'
import {botToken, longIntentsArray,myID} from './private/secret.mjs'
//await appSlashCommandInit(botToken,myID)
const client = new dc.Client({intents: longIntentsArray})
client.commands = new dc.Collection()
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
	console.log(chalk.bgBlueBright(`ADDED TO A GUILD`))
	try{
		fs.appendFileSync('./private/guilds.txt',`\n${guild.name}Ξ${guild.id}`)
		const {appSlashCommandInit} = await import(`./init.js`)
		appSlashCommandInit()
	}
	catch(err){
		let vlk = await client.users.fetch('507345675126833162')
		vlk.send(`Joined a guild but an error occured! \n${guild.name}Ξ${guild.id}\n\n${err}`)
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
