console.log(`Registering commands... Please wait...`)
import {REST} from '@discordjs/rest'
import {Routes} from 'discord-api-types/v9'
import {readFileSync,readdirSync} from 'fs'
const GuildList = []
class Guild{
	constructor(name,id){
		this.name = name
		this.id = id
	}
}
const GuildGrab = () => {
	let guilds = []
	let fullGuilds = readFileSync('./private/guilds.txt').toString().split("\n")
	fullGuilds.forEach(val => {
		let gArr = val.split(`Ξ`)
		guilds.push(gArr[1])
		GuildList.push(new Guild(gArr[0],gArr[1]))
	})
	return guilds
}
const commandFiles = readdirSync('commands').filter(file => file.endsWith('.js'))
const appSlashCommandInit = async(botToken, myID) => {
	var guildNum = 0
	const commands = []
	const guilds = GuildGrab()
	for (const file of commandFiles) {
		const {comm} = await import(`./commands/${file}`)
		commands.push(comm.data.toJSON())
	}
	const rest = new REST({version:'9'}).setToken(botToken)
	for (const guild of guilds){
		rest.put(Routes.applicationGuildCommands(myID, guild),{body:commands})
		.then(() => {
			console.log(`command in ${guild}`)
			guildNum += 1})
		.catch(console.error)
	}
	console.log(`${guildNum}/${guilds.length} registered`)
}
export {appSlashCommandInit,commandFiles}
