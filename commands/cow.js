import {SlashCommandBuilder} from'@discordjs/builders'
import {embedSend,rnd,cowarr} from '../__commands__.js'
const comm = {
	data: new SlashCommandBuilder()
		.setName('cow')
		.setDescription('generate a cute cow :3'),
	async execute(interaction) {
		let embed = embedSend({
			title: `Generated a cow!`,
			response: `\`\`\`\n${cowarr[rnd(0,cowarr().length)]}\n\`\`\``
		})
		await interaction.reply(({embeds: [embed]}))
	},
}
export{comm}