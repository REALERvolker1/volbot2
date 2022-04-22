import {SlashCommandBuilder} from'@discordjs/builders'
import {embedSend,rnd} from '../__commands__.js'
const comm = {
	data: new SlashCommandBuilder()
		.setName('iq')
		.setDescription('Shows you the (randomly generated) derived iq of a user!')
    .addUserOption((option) => {
      option.setName("target")
      .setDescription("The person whose IQ you want to find")
      return option
    }),
	async execute(interaction) {
    const args = interaction.options.get('target')
    var memb = interaction.member
    if (args != undefined){
      memb = args.member
    }
    let embed = embedSend({
      title: `Approximate IQ of ${memb.displayName}`,
      response: rnd(70,150),
    })
		await interaction.reply(({content: `${memb}`, embeds: [embed]}))
	},
}
export{comm}