import {SlashCommandBuilder} from'@discordjs/builders'
import {embedSend,getTime,rnd} from '../__commands__.js'
const comm = {
	data: new SlashCommandBuilder()
		.setName('dox')
		.setDescription('Shows you a user\'s *personal info* (discord info plus randomly generated "IP address")')
    .addUserOption((option) => {
      option.setName("target")
      .setDescription("The person you want to dox >:)")
      return option
    }),
	async execute(interaction) {
    /*
    var memb = interaction.member
    if (interaction.options.getUser('target') != undefined){
      memb = interaction.options.getUser('target').member
    }
    */
    const args = interaction.options.get('target')
    var memb = interaction.member
    if (args != undefined){
      memb = args.member
    }
    const msg = `
    User: **${memb.user.tag}**
    ID: **${memb.id}**
    Joined server at: **${getTime(memb.joinedAt)}**
    created account at: **${getTime(memb.user.createdAt)}**
    Defining role: **${memb.roles.hoist}**
    IP address (random): **${rnd(100,999)}.${rnd(100,999)}.${rnd(100,999)}.${rnd(100,999)}**
    `
    let embed = embedSend({
      title: `${memb.displayName}'s dox`,
      response: msg,
      image: {
        url:memb.displayAvatarURL()
      }
    })
		await interaction.reply(({content: `${memb}`, embeds: [embed]}))
	},
}
export{comm}