import {SlashCommandBuilder} from '@discordjs/builders'
import {embedSend} from '../__commands__.js'
const comm = {
	data: new SlashCommandBuilder()
		.setName('uwuify')
		.setDescription('Uwuify a message!')
		.addStringOption((option) => {
			option.setName("message")
			.setRequired(true)
			.setDescription("Type the message you want to uwuify! or reply to a message using /uwuify as a regular message.")
			return option
		}),
	async execute(interaction) { // 966757071238344734 .replace("@","@ >")
		let msg = interaction.options.getString('message').trim().replace(/r/g, "w").replace(/R/g, "W").replace(/l/g, "w").replace(/L/g, "W")
		if (msg == "") return
		let embed = embedSend({
			author: {
				name: interaction.member.displayName,
				icon_url: interaction.member.displayAvatarURL(),
			},
			title: `Uwuified sentence`,
			response: `${msg} UwU`
		})
		await interaction.reply(({embeds: [embed]}))
	},
}
export{comm}


