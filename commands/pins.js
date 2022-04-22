import {SlashCommandBuilder} from'@discordjs/builders'
import {embedSend} from '../__commands__.js'
const comm = {
	data: new SlashCommandBuilder()
		.setName('pins')
		.setDescription('Check the pins!!'),
	async execute(interaction) {
    let embed = embedSend({
      title: `Pins`,
      response: `Check the pins!`,
      image:{url:`https://c.tenor.com/9Tt2qNCOWB8AAAAC/check-the-pins-kowalski.gif`}
    })
		await interaction.reply(({embeds: [embed]}))
	},
}
export{comm}