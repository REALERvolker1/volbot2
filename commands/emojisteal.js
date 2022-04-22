import {SlashCommandBuilder} from'@discordjs/builders'
import {embedSend} from '../__commands__.js'
//import {uwuify} from 'uwu.js'
const comm = {
	data: new SlashCommandBuilder()
		.setName('emojisteal')
		.setDescription('Steals a specified emoji from any server! (admin only)')
    .addStringOption((option) => {
      option.setName("emoji")
      .setRequired(true)
      .setDescription("Select which emoji you want to steal!")
      return option
    }),
	async execute(interaction) {
		if (interaction.member.permissions.has(`MANAGE_EMOJIS_AND_STICKERS`)){
      let arg = interaction.options.get('emoji').value
      console.log(arg)
      const emoji = arg.slice(arg.search(/</)+1,arg.search(/>/)).split(/:/)
      var wrk = `https://cdn.discordapp.com/emojis/${emoji[2]}`
      if (emoji[0] == "a"){
        wrk += '.gif'
      }
      wrk += `?size=4096&quality=lossless`
      await interaction.guild.emojis.create(wrk,emoji[1])
      let embed = embedSend({
        title: `Emoji Stolen`,
        response: emoji[1],
        image:{
          url:wrk
        }
      })
      await interaction.reply(({embeds: [embed]}))
    }
    else{
      let embed = embedSend({
        title: `ERROR`,
        response: `Please make sure you have perms to add emojis!`,
      })
      await interaction.reply(({embeds: [embed]}))
    }
	},
}
export{comm}