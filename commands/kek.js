import {SlashCommandBuilder} from '@discordjs/builders'
import {embedSend} from '../__commands__.js'
const comm = {
	data: new SlashCommandBuilder()
		.setName('kek')
		.setDescription('use this command if something slightly comical happens'),
	async execute(interaction) {
		let embed = embedSend({
			author: {
				name: interaction.member.displayName,
				icon_url: interaction.member.displayAvatarURL(),
			},
			title: `kek`,
			response: `idfk why I made this a command`,
			image:{
				url:`https://c.tenor.com/Ow2L8IP50uYAAAAd/champoy-el-risitas.gif`
			}
		})
		await interaction.reply(({embeds: [embed]}))
	},
}
export{comm}