const Discord = require('discord.js');

exports.run = (client, message, args) => {
if (!message.guild) {
const ozelmesajuyari = new Discord.RichEmbed()
  .setColor("#ffffff")
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField('`tavsiye` komutu sunucularda kullanılabilir!')
return message.author.sendEmbed(ozelmesajuyari); }
let guild = message.guild
let mesaj = args.slice(0).join(' ');
  if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor("RED").setDescription(':no_entry_sign: :pencil: Tavsiye için bana birşey yazman gerek!'));
  const tavsiye1 = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(message.author.username + ', :white_check_mark: Tavsiyeniz bildirildi! Tavsiyenizi bildirdiğiniz için teşekkür ederiz!')
  message.channel.send(tavsiye1);
/*let TavsiyeKanalı = bot.guilds.get("511144954836549658").channels.get("513347194477346826");*/
const tavsiye = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setThumbnail(message.author.avatarURL)
  .setDescription(':newspaper2: **' + message.author.tag + '** adlı kullanıcının önerisi;')
  .addField(':envelope: Kullanıcı Bilgileri', '✭ ID: ' + message.author.id + '\n✭ Adı: ' + message.author.username + '\n✭ Tagı: ' + message.author.discriminator + '')
  .addField(':pencil: Tavsiye', mesaj)
return bot.channels.get("274551537139712001").send(tavsiye);
  const Davet = bot.channels.get(message.channel.id).createInvite({ maxAge: 0})
  bot.channels.get("274551537139712001").send(Davet.url)
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
