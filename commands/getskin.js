import {SlashCommandBuilder} from '@discordjs/builders'
import {embedSend} from '../__commands__.js'
import mcp from "minecraft-player"
const comm = {
	data: new SlashCommandBuilder()
		.setName('getskin')
		.setDescription('view anyone\'s Minecraft skin!')
    .addStringOption((option) => {
      option.setName("ign")
      .setRequired(true)
      .setDescription("The IGN (In-game Name) of the player whose skin you want")
      return option
    })
    .addStringOption((option) => {
      option.setName("render")
      .setDescription("Select which render you want!")
      .addChoices([["head","true"],["body","false"]])
      return option
    }),
	async execute(interaction) {
    let ign = interaction.options.get('ign').value.toString()
    var type = "body"
    if (interaction.options.get('render')?.value == "true"){
      type = "head"
    }
    const {uuid} = await mcp(ign)
    let embed = embedSend({
      title: `Minecraft Skins`,
      response: `Current Minecraft skin of ${ign}`,
      image:{
        url:`https://crafatar.com/renders/${type}/${uuid}?overlay=true`
      }
    })
    interaction.reply(({embeds: [embed]}))
  }
}
export{comm}