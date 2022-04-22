import {SlashCommandBuilder} from'@discordjs/builders'
import {embedSend} from '../__commands__.js'
import figlet from 'figlet'
const comm = {
	data: new SlashCommandBuilder()
		.setName('ascii')
		.setDescription('converts your message to ASCII art!')
    .addStringOption((option) => {
      option.setName("message")
      .setRequired(true)
      .setDescription("Write some text...")
      return option
    }),
	async execute(interaction) {
    let embed = embedSend({
      title: `ASCII-fied ${interaction.options.getString('message')}`,
      response: `\`\`\`\n${figlet.textSync(interaction.options.getString('message'))}\n\`\`\``,
    })
		await interaction.reply(({embeds: [embed]}))
	},
}
export{comm}