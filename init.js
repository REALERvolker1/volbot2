console.log(`Registering commands... Please wait...`)
import {REST} from '@discordjs/rest'
import {Routes} from 'discord-api-types/v9'
import {botToken,myID} from './private/secret.mjs'
import {readFileSync,readdirSync} from 'fs'
const appSlashCommandInit = async() => {
	const guilds = readFileSync('./logs/guilds.txt').toString().split("|")
	console.log(guilds)
	const commands = []
	const commandFiles = readdirSync('commands').filter(file => file.endsWith('.js'))
	console.log(commandFiles)
	for (const file of commandFiles) {
		const {comm} = await import(`./commands/${file}`)
		commands.push(comm.data.toJSON())
	}
	const rest = new REST({version:'9'}).setToken(botToken)
	for (const guild of guilds){
		rest.put(Routes.applicationGuildCommands(myID, guild),{body:commands})
		.then(() => {console.log('Successfully registered application commands.')})
		.catch(console.error)
	}
}
export {appSlashCommandInit}
