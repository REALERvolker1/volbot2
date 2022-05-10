import {SlashCommandBuilder} from'@discordjs/builders'
import {embedSend} from '../__commands__.js'
const comm = {
	data: new SlashCommandBuilder()
		.setName('pins')
		.setDescription('Check the pins!!'),
	async execute(interaction) {
		let embed = embedSend({
			author: {
				name: interaction.member.displayName,
				icon_url: interaction.member.displayAvatarURL(),
			},
			title: `Pins`,
			response: `Check the pins!`,
			image:{url:`https://c.tenor.com/9Tt2qNCOWB8AAAAC/check-the-pins-kowalski.gif`}
		})
		await interaction.reply(({embeds: [embed]}))
	},
}
export{comm}