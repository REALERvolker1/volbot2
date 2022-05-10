import {SlashCommandBuilder} from '@discordjs/builders'
import {embedSend} from '../__commands__.js'
import fetch from 'node-fetch'
const comm = {
	data: new SlashCommandBuilder()
		.setName('getskin')
		.setDescription('view anyone\'s Minecraft skin!')
		.addStringOption((option) => {
			option.setName("ign")
			.setRequired(true)
			.setDescription("The IGN (In-game Name) of the player whose skin you want")
			return option
		})
		.addStringOption((option) => {
			option.setName("render")
			.setDescription("Select which render you want!")
			.addChoices([["head","true"],["body","false"]])
			return option
		}),
	async execute(interaction) {
		let ign = interaction.options.get('ign').value.toString()
		var type = "full"
		var {uuid} = await fetch(`https://api.mojang.com/users/profiles/minecraft/${ign}`)
		.then(res => {
		return(res.json())
		})
		.then(res => {
		let uuid = res.id
		if (uuid){
			let embed = embedSend({
				author: {
					name: interaction.member.displayName,
					icon_url: interaction.member.displayAvatarURL(),
				},
				title: `Minecraft Skins`,
				response: `Current Minecraft skin of ${ign}`,
				image:{
				url:`https://visage.surgeplay.com/${type}/256/${uuid}.png`
				}
			})
			interaction.reply(({embeds: [embed]}))
		}
	})
	}
}
export{comm}