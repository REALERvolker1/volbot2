import {SlashCommandBuilder} from'@discordjs/builders'
import {embedSend} from '../__commands__.js'
const comm = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with the ping of the bot\'s response'),
	async execute(interaction) {
		const ping = interaction.createdAt.getTime() - (new Date().getTime()) - 4000
		let embed = embedSend({
			author: {
				name: interaction.member.displayName,
				icon_url: interaction.member.displayAvatarURL(),
			},
			title: `Ping`,
			response: `Pong! Processed with a delay of ${ping} ms`,
		})
		await interaction.reply(({embeds: [embed]}))
	},
}
export{comm}