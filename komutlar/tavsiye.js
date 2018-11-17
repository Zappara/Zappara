const Discord = require('discord.js');
const davetlinki = bot.channels.get(message.channel.id).createInvite({ maxAge: 0})
/*let TavsiyeKanalı = bot.guilds.get("511144954836549658").channels.get("513347194477346826");*/

exports.run = (bot, message, args) => {
if (!message.guild) {
const ozelmesajuyari = new Discord.RichEmbed()
  .setColor("#ffffff")
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField('`tavsiye` komutu sunucularda kullanılabilir!')
return message.author.sendEmbed(ozelmesajuyari); }
let guild = message.guild
let mesaj = args.slice(0).join(' ');
  if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor("RANDOM").setDescription(':no_entry_sign: :pencil: Tavsiye için bana birşey yazman gerek!'));
  const tavsiye1 = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(message.author.username + ', :basarili:  Tavsiyeniz bildirildi! Tavsiyenizi bildirdiğiniz için teşekkür ederiz!')
  message.channel.send(tavsiye1);
const tavsiye = new Discord.RichEmbed()
  .setThumbnail("http://tavsiyelazim.com/wp-content/uploads/2015/08/logo.png")
  .setColor('RANDOM')
  .setTitle('Tavsiye Bilgileri')
  .addField('Tavsiye:', mesaj, true)
  .addField('✭ Kullanıcı Adı:', message.author.tag, true)
  .addField('✭ Kullanıcı Kimliği:', message.author.id, true)
  .addField('✭ Sunucu Adı:', message.guild.name, true)
  .addField('✭ Sunucu Kimliği:', message.guild.id, true)
  .addField('✭ Sunucu Daveti:', davetlinki.url)
return bot.channels.get("419428992752549909").send(tavsiye);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tavsiye',
  description: 'Bota eklenmesini istediğiniz şeyi tavsiye etmenizi sağlar',
  usage: 'tavsiye [tavsiye]'
};
