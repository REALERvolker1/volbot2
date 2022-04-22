import {SlashCommandBuilder} from'@discordjs/builders'
import {embedSend,rnd} from '../__commands__.js'
import {readFile} from 'fs'
var cowarr
readFile('./cow.txt',(err,data)=>{
	if (err) console.log(err)
	cowarr = data.toString().replace(/\n$/, '').replace("`","´").replace("\"","“").replace("'","‘").split('\n\n\n')
})
const comm = {
	data: new SlashCommandBuilder()
		.setName('cow')
		.setDescription('generate a cute cow :3'),
	async execute(interaction) {
    let embed = embedSend({
      title: `Generated a cow!`,
      response: `\`\`\`\n${cowarr[rnd(0,cowarr.length)]}\n\`\`\``
    })
		await interaction.reply(({embeds: [embed]}))
	},
}
export{comm}