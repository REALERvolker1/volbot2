import {SlashCommandBuilder} from '@discordjs/builders'
import {embedSend} from '../__commands__.js'
const comm = {
	data: new SlashCommandBuilder()
		.setName('kek')
		.setDescription('use this command if something slightly comical happens'),
	async execute(interaction) {
    let embed = embedSend({
      title: `kek`,
      response: `idfk why I made this a command`,
      image:{
        url:`https://c.tenor.com/Ow2L8IP50uYAAAAd/champoy-el-risitas.gif`
      }
    })
		await interaction.reply(({embeds: [embed]}))
	},
}
export{comm}