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
		if (memb.bannerURL()){
			const imgurl = memb.user.bannerURL(true)
			const pfpurl = memb.displayAvatarURL()
		}
		else{
			const imgurl = memb.displayAvatarURL()
			const pfpurl = undefined
		}
		let embed = embedSend({
			title: `${memb.displayName}'s dox`,
			thumbnail: {
				url:pfpurl
			},
			author: {
				name: interaction.member.displayName,
				icon_url: interaction.member.displayAvatarURL(),
			},
			response: msg,
			image: {
				url:imgurl
			}
		})
		await interaction.reply(({content: `${memb}`, embeds: [embed]}))
	},
}
export{comm}