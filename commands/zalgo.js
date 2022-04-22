import {SlashCommandBuilder} from '@discordjs/builders'
import {embedSend} from '../__commands__.js'
import zalgo from 'zalgo-js'
const comm = {
	data: new SlashCommandBuilder()
		.setName('zalgo')
		.setDescription('Makes your text look A̺ ͝M͢ ͤA̱ ̿Z̛ ̓Iͬ ͌N͌ ͮGͭ')
    .addStringOption((option) => {
      option.setName("text")
      .setDescription(`Your input text`)
      .setRequired(true)
      return option
    }),
	async execute(interaction) {
    let str = zalgo.default(interaction.options.get('text').value)
    let embed = embedSend({
      title: `Zalgified`,
      response: str,
    })
		await interaction.reply(({embeds: [embed]}))
	},
}
export{comm}