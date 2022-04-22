import {SlashCommandBuilder} from'@discordjs/builders'
import {embedSend,rgbToHex,rnd} from '../__commands__.js'
const comm = {
	data: new SlashCommandBuilder()
		.setName('color')
		.setDescription('Sends you a random color!'),
	async execute(interaction) {
    let col = rgbToHex(rnd(0,255),rnd(0,255),rnd(0,255))
    let embed = embedSend({
      title: `Color returned`,
      response: `color: ${col.replace("0x","#")}`,
      image: {
        url: `https://singlecolorimage.com/get/${col.replace("0x","")}/100x100`,
      },
    })
		await interaction.reply(({embeds: [embed]}))
	},
}
export{comm}