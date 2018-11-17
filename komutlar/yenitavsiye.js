const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);
  const davetlinki = bot.channels.get(message.channel.id).createInvite({ maxAge: 0})
  if (command === 'tavsiyeni-gönder' || command === 'tavsiye') {
    let str = '<@274551537139712001>';//@silmeyin!
    let id = str.replace(/[<@!>]/g, '');
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor("RED").setDescription(':no_entry_sign: :pencil: Tavsiye için bana birşey yazman gerek!'));
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Tavsiye Bilgileri')
    .addField('Tavsiye:', mesaj, true)
    .addField('Kullanıcı Adı:', message.author.tag, true)
    .addField('Kullanıcı Kimliği:', message.author.id, true)
    .addField('Sunucu Adı:', message.guild.name, true)
    .addField('Sunucu Kimliği:', message.guild.id, true)
    .addField('Sunucu Daveti:', davetlinki.url)
    client.fetchUser(id)
    .then(user => {user.send({embed})})
  }
});


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
