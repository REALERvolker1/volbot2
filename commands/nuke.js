import {SlashCommandBuilder} from'@discordjs/builders'
import {embedSend} from '../__commands__.js'
import {giphyToken} from '../private/secret.mjs'
import giphyApi from 'giphy-api'
const giphy = giphyApi(giphyToken)
const comm = {
	data: new SlashCommandBuilder()
		.setName('nuke')
		.setDescription('Nuke anyone!')
		.addUserOption((option) => {
			option.setName("target")
			.setDescription("The person you want to nuke")
			return option
		}),
	async execute(interaction) {
		const args = interaction.options.get('target')
		var memb = interaction.member
		if (args != undefined){
			memb = args.member
		}
		giphy.search({
			q: `nuke`,
			limit: 1,
			offset: Math.floor(Math.random() * 50)
			},(err,resp)=>{
			if (err) console.log(err)
			let embed = embedSend({
				author: {
					name: interaction.member.displayName,
					icon_url: interaction.member.displayAvatarURL(),
				},
				title: `Nuke`,
				response: `Nuke dropped on ${memb.displayName}!`,
				image:{
					url:resp.data[0].images.original.url
				}
			})
			interaction.reply(({content: `${memb}`, embeds: [embed]}))
		})
	},
}
export{comm}