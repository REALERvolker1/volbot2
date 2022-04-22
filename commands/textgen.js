import {SlashCommandBuilder} from '@discordjs/builders'
import {embedSend,rnd} from '../__commands__.js'
import {sentence,paragraph} from 'txtgen'
const comm = {
	data: new SlashCommandBuilder()
		.setName('textgen')
		.setDescription('Generate a random sentence or paragraph!')
    .addStringOption((option) => {
      option.setName("selection")
      .setRequired(true)
      .setDescription("Select which generator you want!")
      .addChoices([["Sentence","true"],["Paragraph","false"]])
      return option
    }),
	async execute(interaction) {
    var wrk = sentence()
    if (interaction.options.getString('selection').value == "false"){
      wrk = paragraph(rnd(1,6))
    }
    let embed = embedSend({
      title: `Generated Sentence`,
      response: wrk
    })
		await interaction.reply(({embeds: [embed]}))
	},
}
export{comm}