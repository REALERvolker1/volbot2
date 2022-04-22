import {SlashCommandBuilder} from '@discordjs/builders'
import {embedSend} from '../__commands__.js'
import Uwuifier from 'uwuifier'
const uwuifier = new Uwuifier({
  spaces: {faces: 0,actions: 0,stutters: 0},
  words: 1,
  exclamations: 0
})
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
	async execute(interaction) { // 966757071238344734   .replace("@","@ >")
    let msg = uwuifier.uwuifySentence(interaction.options.getString('message').trim())
    if (msg == "") return
    let embed = embedSend({
      title: `Uwuified sentence`,
      response: `${msg} UwU`
    })
		await interaction.reply(({embeds: [embed]}))
	},
}
export{comm}


