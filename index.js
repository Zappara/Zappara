const {
    stripIndents,
    oneLine
} = require('common-tags');
const Discord = require("discord.js");
const bot = new Discord.Client();
const http = require('http');
const moment = require("moment-timezone");
moment.tz.setDefault("Europe/Istanbul");
const Jimp = require('jimp');
const GIFEncoder = require('gifencoder');
const db = require('quick.db')
const tools = require('./functions.js');
const weather = require('weather-js');
const arraySort = require('array-sort');
const table = require('table');
const figlet = require('figlet');
const moment2 = require('moment');
require('moment-duration-format');
const Canvas = require('canvas');
const Cleverbot = require("cleverbot-node");
const clbot = new Cleverbot;
const fs = require("fs");
const ms = require('ms');
const chalk = require('chalk')
const { Command } = require('discord.js-commando');
const path = require('path');
const request = require('request-promise');
const { promisifyAll } = require('tsubaki');
const snekfetch = require('snekfetch');
let points = JSON.parse(fs.readFileSync('./xp.json', 'utf8'));
const dbaapi = require('discord-bots-api');
const dba = new dbaapi(process.env.DBLToken)
const DBL = require("dblapi.js");
const dbl = new DBL(`${process.env.DBLToken}`, bot);

//Bot Sahipleri
let enesonurata = "274551537139712001";
let owner = enesonurata;
let talha = enesonurata;

let prefix = "*";

bot.on("ready", () => {
  bot.user.setGame(`${prefix}yardım | ${prefix}davet`, "https://www.twitch.tv/enesonurata")
  console.log("Bot Basariyla Baslatildi")
});


bot.on('message', async msg => {
  if (msg.content.toLowerCase() === '${prefix}eval client.token' || msg.content.toLowerCase() === '${prefix}eval bot.token') {
    msg.channel.send("```Bi tek sen akıllısın amk keli```")
  }
});

bot.on('message', async msg => {
  if (msg.content.toLowerCase() === 'yarrak') {
    msg.react("😡")
    msg.channel.send("**Bir yerine sok, niye küfür ediyorsun koçum?**")
  }
});

/*bot.on('message', async message => {
   let embed = new Discord.RichEmbed()
   .setTitle('')
   .setColor("RANDOM")
   .setImage(("https://cdn.boobbot.us/4k/4k"+ Math.floor(Math.random() * 1460)+".jpg"))
    setInterval(function() {
   bot.channels.get("474402113577943041").send(embed)
    }, 2 * 10000);
});*/

bot.on('guildCreate', async guild => {
		const girismesaj = [
		  '**Zappara sunucunuza eklendi!**',
		  '**Zappara** sunucunuzdaki insanlara ve size kolaylıklar sağlar.',
		  'Bot `EnesOnurAta` tarafından geliştirilmektedir.',
		  'Botumuzun özelliklerini görmek için z!yardım komutunu kullanabilirsiniz.',
		  '',
		  `**Zappara Resmi Discord Sunucusu** https://discord.gg/YNPRRQd`
		]
		guild.owner.send(girismesaj)
});

/*bot.on("message", async message => {
    if (message.content == "?giriş") {
				const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184528148725780/guildAdd.png");
				const userimg = await Jimp.read(message.author.avatarURL);
				var font;
				if (message.author.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
				else if (message.author.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
				else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
				await bg.print(font, 430, 170, message.author.tag);
				await userimg.resize(362, 362);
        await bg.composite(userimg, 43, 26).write("./img/"+ message.author.id + ".png");
				  setTimeout(function () {
						message.channel.send(new Discord.Attachment("./img/" + message.author.id + ".png"));
				  }, 1000);
				  setTimeout(function () {
					fs.unlink("./img/" + message.author.id + ".png");
				  }, 10000);
    }
});*/

bot.on('message', async msg => {
  if (msg.content.toLowerCase() === 'adamsın') {
    await msg.react('🇦');
    await msg.react('🇩');
    await msg.react('🅰');
    await msg.react('🇲');
  }

  if (msg.content.toLowerCase() === 'süper' || msg.content.toLowerCase() === 'Süper' || msg.content.toLowerCase() === 'Super' || msg.content.toLowerCase() === 'super') {
    msg.reply("Efendim canım?")
  }

  if (msg.content.toLowerCase() === 'super adamdır' || msg.content.toLowerCase() === 'super bot adamdır' || msg.content.toLowerCase() === 'Super Adamdır.' || msg.content.toLowerCase() === 'Super Bot Adamdır.') {
    msg.reply("eyw birader.")
  }
  });

bot.on('message', async msg => {
  if (msg.content.toLowerCase() === `<@${bot.user.id}>`) {
    let prefixFetched = await db.fetch(`prefix_${msg.guild.id}`);
    if (prefixFetched == null) prefixFetched = '?'
    msg.channel.send(`<:NOTECHwow:464900244715470878> Sunucunun Prefixi: ` + "`" + `${prefixFetched}` + "`")
  }
  });

var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
};
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

const yt = require('ytdl-core');

let queue = {};

const commands = {
	'çal': (msg) => {
		if (queue[msg.guild.id] === undefined) return msg.channel.send(`**İlk önce şarkı eklemelisin. Örneğin: ${prefix}ekle YOUTUBELİNKİ**`);
		if (!msg.guild.voiceConnection) return commands.join(msg).then(() => commands.play(msg));
		if (queue[msg.guild.id].playing) return msg.channel.send('**Zaten aynı şarkı çalınıyor.**');
		let dispatcher;
		queue[msg.guild.id].playing = true;

		console.log(queue);
		(function play(song) {
			console.log(song);
			if (song === undefined) return msg.channel.send('**Sıradaki şarkılar bitti**').then(() => {
				queue[msg.guild.id].playing = false;
				msg.member.voiceChannel.leave();
			});
			msg.channel.send(`♪ Çalınan: **${song.title}** Ekleyen: **${song.requester}**`);
			dispatcher = msg.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : "1" });
			let collector = msg.channel.createCollector(m => m);
			collector.on('message', m => {
				if (m.content.startsWith(prefix + 'durdur')) {
					msg.channel.send('♪ **Durduruldu.**').then(() => {dispatcher.pause();});
				} else if (m.content.startsWith(prefix + 'devam')){
					msg.channel.send('♪ **Devam ediyor.**').then(() => {dispatcher.resume();});
				} else if (m.content.startsWith(prefix + 'geç')){
					msg.channel.send('♪ **Geçildi.**').then(() => {dispatcher.end();});
				} else if (m.content.startsWith(prefix + 'ses+')){
					if (Math.round(dispatcher.volume*50) >= 100) return msg.channel.send(`♪ **Ses: ${Math.round(dispatcher.volume*50)}%**`);
					dispatcher.setVolume(Math.min((dispatcher.volume*50 + (2*(m.content.split('+').length-1)))/50,2));
					msg.channel.send(`♪ **Ses: ${Math.round(dispatcher.volume*50)}%**`);
				} else if (m.content.startsWith(prefix + 'ses-')){
					if (Math.round(dispatcher.volume*50) <= 0) return msg.channel.send(`**♪ Ses: ${Math.round(dispatcher.volume*50)}%**`);
					dispatcher.setVolume(Math.max((dispatcher.volume*50 - (2*(m.content.split('-').length-1)))/50,0));
					msg.channel.send(`♪ **Ses: ${Math.round(dispatcher.volume*50)}%**`);
				} else if (m.content.startsWith(prefix + 'zaman')){
					msg.channel.send(`♪ **Geçen zaman: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}**`);
				}
			});
			dispatcher.on('end', () => {
				collector.stop();
				play(queue[msg.guild.id].songs.shift());
			});
			dispatcher.on('error', (err) => {
				return msg.channel.send('error: ' + err).then(() => {
					collector.stop();
					play(queue[msg.guild.id].songs.shift());
				});
			});
		})(queue[msg.guild.id].songs.shift());
	},
	'gir': (msg) => {
		return new Promise((resolve, reject) => {
			const voiceChannel = msg.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('**İlk önce sesli kanala girmelisin.**');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
      msg.channel.send('**Sesli kanala giriş yaptım.**');
		});
	},
	'çık': (msg) => {
		return new Promise((resolve, reject) => {
			const voiceChannel = msg.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('**İlk önce sesli kanalda olmalısın.**');
			voiceChannel.leave().then(connection => resolve(connection)).catch(err => reject(err));
      msg.channel.send('**Sesli kanaldan çıkış yaptım.**');
		});
	},
	'ekle': (msg) => {
		let url = msg.content.split(' ')[1];
		if (url == '' || url === undefined) return msg.channel.send(`**Youtube linki koymalısın. Örneğin: ${prefix}ekle YOUTUBELİNKİ**`);
		yt.getInfo(url, (err, info) => {
			if(err) return msg.channel.send('**Link geçersiz:** ' + err);
			if (!queue.hasOwnProperty(msg.guild.id)) queue[msg.guild.id] = {}, queue[msg.guild.id].playing = false, queue[msg.guild.id].songs = [];
			queue[msg.guild.id].songs.push({url: url, title: info.title, requester: msg.author.username});
			msg.channel.send(`♪ **${info.title}** adlı şarkı sıraya eklenmiştir.`);
		});
	},
	'sıra': (msg) => {
		if (queue[msg.guild.id] === undefined) return msg.channel.send(`Sunucunun eklenmiş şarkısı bulunmuyor. Eklemek için: ${prefix}ekle YOUTUBELİNKİ`);
		let tosend = [];
		queue[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Ekleyen: ${song.requester}`);});
		msg.channel.send(`♪ **${msg.guild.name} adlı sunucunun müzik kuyruğu:** Şu anda **${tosend.length}** adet şarkı var. ${(tosend.length > 15 ? '*[15 tanesi gösteriliyor]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
	},
	'müzik': (msg) => {
		let tosend = ['```xl', prefix + 'gir : "Sesli kanalınıza girer."', prefix + 'çık : "Sesli kanalınızdan çıkar."',	prefix + 'ekle : "Yazdığınız Youtube linkini sıraya ekler."', prefix + 'sıra : "Sunucudaki müzik sırasını gösterir."', prefix + 'çal : "Sıradaki şarkıları çalar."', '', 'diğer komutlar:'.toUpperCase(), prefix + 'durdur : "Çalan şarkıyı durdurur."',	prefix + 'devam : "Durdurulan şarkıyı devam ettirir."', prefix + 'geç : "Çalınan şarkıyı sıradaki şarkıya geçer."', prefix + 'bilgi : "Çalan şarkı hakkında bilgiler verir."',	prefix + 'ses+(+++) : "Şarkı sesini yükseltir."',	prefix + 'ses-(---) : "Şarkı sesini azaltır."',	'```'];
		msg.channel.send(tosend.join('\n'));
	},
	'müzikapi': (msg) => {
      msg.channel.send(`♪ Müzik çalınan sunucu sayısı: **${bot.voiceConnections.size}**`)
	}
}

bot.on('message', msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
	if (!msg.content.startsWith(prefix)) return;
	if (commands.hasOwnProperty(msg.content.toLowerCase().slice(prefix.length).split(' ')[0])) commands[msg.content.toLowerCase().slice(prefix.length).split(' ')[0]](msg);
});

bot.on("message", async message => {
    const prefixMention = new RegExp(`^<@!?${bot.user.id}>`);
    if (message.channel.type === "dm") return;

  if (message.author.bot) return;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  if (!points[user.id]) points[user.id] = {
    points: 0,
    level: 0,
  };

  let userData = points[user.id];
  userData.points++;

  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    userData.level = curLevel;
        var user = message.mentions.users.first() || message.author;
				const bg = await Jimp.read("https://cdn.discordapp.com/attachments/458732340491845633/473603413243068437/fs.png");
				const userimg = await Jimp.read(user.avatarURL);
				var font;
				if (user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else if (user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_632_BLACK);
				else font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				var font2;
				if (user.tag.length < 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				else if (user.tag.length > 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				else font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				await bg.print(font2, 17, 50, `LEVEL`);
				await bg.print(font, 27, 70, `${userData.level}`);
				await userimg.resize(35, 35);
				await (!userimg.resize(35, 35));
        await bg.composite(userimg, 25, 15).write("./img/level/" + bot.user.id + "-" + user.id + ".png");
				  setTimeout(function () {
message.channel.send(`:up: **| ${user.username} level atladı!**`)
						message.channel.send(new Discord.Attachment("./img/level/" + bot.user.id + "-" + user.id + ".png"));
				  }, 1000);
				  setTimeout(function () {
					fs.unlink("./img/level/" + bot.user.id + "-" + user.id + ".png");
				  }, 10000);
    }

fs.writeFile('./xp.json', JSON.stringify(points), (err) => {
    if (err) console.error(err)
  })

    let i = await db.fetch(`prefix_${message.guild.id}`)
    let prefix;
    if (i) {
        prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] + " " : i;
    } else {
        prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] + " " : "?";
    }

    if (message.author.bot) return;
    if (message.author.id === bot.user.id) return;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    console.log(`${message.author.tag} : ${message.content.toString()}`);

/*  if (command === 'profil' || command === 'profile') {
        let memberID = await db.fetch(`memberID_${user.id}`);
        if (memberID == null) memberID = 'Biyografi mesajı ayarlanmamış.'
        let membername = await db.fetch(`membername_${user.id}`);
        if (membername == null) membername = `${user.tag}`
        let memberBadge = await db.fetch(`memberBadge_${user.id}`);
        if (memberBadge == null) memberBadge = `Alınmamış`
        let memberBadge2 = await db.fetch(`memberBadge2_${user.id}`);
        if (memberBadge2 == null) memberBadge2 = ` `
        let memberBadge3 = await db.fetch(`memberBadge3_${user.id}`);
        if (memberBadge3 == null) memberBadge3 = ` `
        let memberBadge4 = await db.fetch(`memberBadge4_${user.id}`);
        if (memberBadge4 == null) memberBadge4 = ` `
const anembed = new Discord.RichEmbed().setTitle(`${membername}`).setDescription(`**Seviye:** ${userData.level}\n**GP:** ${userData.points}\n**Biyografi:** ${memberID}\n**Rozetler:** ${memberBadge} ${memberBadge2} ${memberBadge3} ${memberBadge4}`).setColor("#ffff00").setFooter(``).setThumbnail(user.avatarURL)
message.channel.send(`:pencil: **| ${user.username} adlı kullanıcının profil kartı**`)
message.channel.send(anembed)
  }*/
  
    if (command === 'profil' || command === 'profile') {
      message.channel.startTyping()
        var user = message.mentions.users.first() || message.author;
        let memberID = await db.fetch(`memberID_${user.id}`);
        if (memberID == null) memberID = 'Biyografi mesaji ayarlanmamis.'
        let membername = await db.fetch(`membername_${user.id}`);
        if (membername == null) membername = `${user.tag}`
        let memberBadge = await db.fetch(`memberBadge_${user.id}`);
        if (memberBadge == null) memberBadge = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
        let memberBadge2 = await db.fetch(`memberBadge2_${user.id}`);
        if (memberBadge2 == null) memberBadge2 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
        let memberBadge3 = await db.fetch(`memberBadge3_${user.id}`);
        if (memberBadge3 == null) memberBadge3 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
        let memberBadge4 = await db.fetch(`memberBadge4_${user.id}`);
        if (memberBadge4 == null) memberBadge4 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
        let memberBadge5 = await db.fetch(`memberBadge5_${user.id}`);
        if (memberBadge5 == null) memberBadge5 = `https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png`
				const bg = await Jimp.read("https://cdn.discordapp.com/attachments/458732340491845633/480827958445998110/dwadwadawdawd.png");
				const userimg = await Jimp.read(user.avatarURL);
				const onay = await Jimp.read(`${memberBadge}`);
				const ekip = await Jimp.read(`${memberBadge2}`);
				const destek = await Jimp.read(`${memberBadge3}`);
				const mod = await Jimp.read(`${memberBadge4}`);
				const partner = await Jimp.read(`${memberBadge5}`);
				var font;
				if (membername.length < 12) font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else if (membername.length > 12) font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				var font2;
				if (user.tag.length < 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else if (user.tag.length > 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				var font3;
				if (user.tag.length < 34) font3 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else if (user.tag.length > 34) font3 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				else font3 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				var font4;
				if (user.tag.length < 15) font4 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else if (user.tag.length > 15) font4 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else font4 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				await bg.print(font, 270, 70, `${membername}`);
				await bg.print(font4, 40, 300, `Level: ${userData.level}`);
				await bg.print(font2, 40, 340, `GP: ${userData.points}`);
				await bg.print(font3, 40, 380, `Biyografi: ${memberID}`);
				await userimg.resize(200, 200);
				await (!userimg.resize(210, 210));
				await onay.resize(32, 32);
				await ekip.resize(32, 32);
				await destek.resize(32, 32);
				await mod.resize(32, 32);
				await partner.resize(32, 32);
        await bg.composite(onay, 270, 120).write("./img/onay/" + bot.user.id + "-" + user.id + ".png");
        await bg.composite(ekip, 310, 120).write("./img/ekip/" + bot.user.id + "-" + user.id + ".png");
        await bg.composite(destek, 350, 120).write("./img/destek/" + bot.user.id + "-" + user.id + ".png");
        await bg.composite(mod, 390, 120).write("./img/mod/" + bot.user.id + "-" + user.id + ".png");
        await bg.composite(partner, 430, 120).write("./img/mod/" + bot.user.id + "-" + user.id + ".png");
        await bg.composite(userimg, 40, 40).write("./img/userimg/" + bot.user.id + "-" + user.id + ".png");
				  setTimeout(function () {
message.channel.send(`:pencil: **| ${user.username} adlı kullanıcının profil kartı**`)
						message.channel.send(new Discord.Attachment("./img/userimg/" + bot.user.id + "-" + user.id + ".png"));
				  }, 1000);
				  setTimeout(function () {
					fs.unlink("./img/userimg/" + bot.user.id + "-" + user.id + ".png");
				  }, 10000);
      message.channel.stopTyping()
    }
  
    if (command === 'rütbe' || command === 'rank') {
      message.channel.startTyping()
        var user = message.mentions.users.first() || message.author;
        let membername = await db.fetch(`membername_${user.id}`);
        if (membername == null) membername = `${user.tag}`
				const bg = await Jimp.read("https://cdn.discordapp.com/attachments/458732340491845633/482242581040988160/fadawdawdawd.png");
				const userimg = await Jimp.read(user.avatarURL);
				var font;
				if (user.tag.length < 12) font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				else if (user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				else font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
				var font2;
				if (user.tag.length < 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				else if (user.tag.length > 15) font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				else font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
				await bg.print(font2, 100, 75, `GP: ${userData.points}`);
				await bg.print(font2, 100, 55, `Level: ${userData.level}`);
				await bg.print(font, 103, 10, membername);
				await userimg.resize(90, 90);
				await (!userimg.resize(90, 90));
        await bg.composite(userimg, 5, 5).write("./img/rank/" + bot.user.id + "-" + user.id + ".png");
				  setTimeout(function () {
message.channel.send(`:pencil: **| ${user.username} adlı kullanıcının rütbe kartı**`)
						message.channel.send(new Discord.Attachment("./img/rank/" + bot.user.id + "-" + user.id + ".png"));
				  }, 1000);
				  setTimeout(function () {
					fs.unlink("./img/rank/" + bot.user.id + "-" + user.id + ".png");
				  }, 10000);
      message.channel.stopTyping()
    }
        
    if (command === "rozetler" || command === "rozet" || command === "badge" || command === "badges" || command === "rozetlerim") {
        let memberBadge = await db.fetch(`memberBadge_${user.id}`);
        if (memberBadge == null) memberBadge = `Alınmamış`
        let memberBadge2 = await db.fetch(`memberBadge2_${user.id}`);
        if (memberBadge2 == null) memberBadge2 = `Alınmamış`
        let memberBadge3 = await db.fetch(`memberBadge3_${user.id}`);
        if (memberBadge3 == null) memberBadge3 = `Alınmamış`
        let memberBadge4 = await db.fetch(`memberBadge4_${user.id}`);
        if (memberBadge4 == null) memberBadge4 = `Alınmamış`
const anembeds2 = new Discord.RichEmbed().addField(`${user.tag} Rozetleri`, `**Onay Rozeti:** ${memberBadge} \n**Ekip Rozeti:** ${memberBadge2} \n**Destekçi Rozeti:** ${memberBadge3} \n**Moderator Rozeti:** ${memberBadge4}`).setColor("#ffff00").setFooter(``).setThumbnail(user.avatarURL)
      message.channel.send(anembeds2)
    }
  
    if (command === "bioayarla" || command === "biyografi") {
        if (args.join(' ').length > 35) return message.channel.send(`${process.env.basarisiz} En fazla 35 karakter girebilirsiniz.`)
        if (!args.join(" ") && args.join(" ").toLowerCase() === `none`)
            return message.channel.send(`Uyarı: Geçerli bir yazı yazmalısın.\nDoğru kullanım: ${prefix}biyografi Notech bot adamdır.`)
        let newMessage;
        if (args.join(" ").toLowerCase() === `none`) newMessage = '';
        else newMessage = args.join(" ").trim();
        db.set(`memberID_${message.author.id}`, newMessage).then(i => {
            return message.channel.send(`${process.env.basarili} Yeni biyografin ayarlandı.`)
        })
    }
  
    if (command === "isim" || command === "isimayarla") {
        if (args.join(' ').length > 15) return message.channel.send(`${process.env.basarisiz} En fazla 15 karakter girebilirsiniz.`)
        if (!args.join(" ") && args.join(" ").toLowerCase() === `none`)
            return message.channel.send(`Uyarı: Geçerli bir yazı yazmalısın.\nDoğru kullanım: ${prefix}isim Notech`)
        let newMessage;
        if (args.join(" ").toLowerCase() === `none`) newMessage = '';
        else newMessage = args.join(" ").trim();
        db.set(`membername_${message.author.id}`, newMessage).then(i => {
            return message.channel.send(`${process.env.basarili} Yeni ismin ayarlandı.`)
        })
    }
  
    if (command === "onayla") {
        if (message.author.id !== `${owner}` && message.author.id !== `${talha}`) return message.channek.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`);
        db.set(`memberBadge_${user.id}`, "https://cdn.discordapp.com/attachments/474685686075621376/480845736347435015/401725450470031362.png").then(i => {
            return message.channel.send(`${process.env.basarili} Kullanıcıya onay rozeti verilmiştir.`)
        })
    }
  
    if (command === "konay" || command === "konayla") {
        if (message.author.id !== `${owner}` && message.author.id !== `${talha}`) return message.channel.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`);
        db.set(`memberBadge_${user.id}`, "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png").then(i => {
            return message.channel.send(`${process.env.basarili} Kullanıcıdan onay rozeti alınmıştır.`)
        })
    }
  
    if (command === "yetkili" || command === "ekip") {
        if (message.author.id !== `${owner}` && message.author.id !== `${talha}`) return message.channel.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`);
        db.set(`memberBadge2_${user.id}`, "https://cdn.discordapp.com/attachments/474685686075621376/480845736347435009/401723658491527168.png").then(i => {
            return message.channel.send(`${process.env.basarili} Kullanıcıya ekip rozeti verilmiştir.`)
        })
    }
  
    if (command === "kyetkili" || command === "kekip") {
        if (message.author.id !== `${owner}` && message.author.id !== `${talha}`) return message.channel.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`);
        db.set(`memberBadge2_${user.id}`, "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png").then(i => {
            return message.channel.send(`${process.env.basarili} Kullanıcıdan ekip rozeti alınmıştır.`)
        })
    }
  
    if (command === "destekci" || command === "destekçi") {
        if (message.author.id !== `${owner}` && message.author.id !== `${talha}`) return message.channel.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`);
        db.set(`memberBadge3_${user.id}`, "https://cdn.discordapp.com/attachments/474685686075621376/480845737006202881/401725034453925889.png").then(i => {
            return message.channel.send(`${process.env.basarili} Kullanıcıya destekçi rozeti verilmiştir.`)
        })
    }
  
    if (command === "kdestekci" || command === "kdestekçi") {
        if (message.author.id !== `${owner}` && message.author.id !== `${talha}`) return message.channel.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`);
        db.set(`memberBadge3_${user.id}`, "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png").then(i => {
            return message.channel.send(`${process.env.basarili} Kullanıcıdan destekçi rozeti alınmıştır.`)
        })
    }
  
    if (command === "mod" || command === "moderator") {
        if (message.author.id !== `${owner}` && message.author.id !== `${talha}`) return message.channel.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`);
        db.set(`memberBadge4_${user.id}`, "https://cdn.discordapp.com/attachments/474685686075621376/480845735647117312/401724520806875139.png").then(i => {
            return message.channel.send(`${process.env.basarili} Kullanıcıya moderator rozeti verilmiştir.`)
        })
    }
  
    if (command === "kmod" || command === "kmoderator") {
        if (message.author.id !== `${owner}` && message.author.id !== `${talha}`) return message.channel.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`);
        db.set(`memberBadge4_${user.id}`, "https://cdn.discordapp.com/attachments/461622592688619520/472923575049781268/profile.png").then(i => {
            return message.channel.send(`${process.env.basarili} Kullanıcıdan moderator rozeti alınmıştır.`)
        })
    }
  
      if (command === "nsfw") {
 if(message.channel.nsfw || message.channel.type === 'dm'){
   let embed = new Discord.RichEmbed()
   .setTitle('Sanırım sapık birisi var?')
   .setColor(0x00AE86)
   .setImage(("https://cdn.boobbot.us/4k/4k"+ Math.floor(Math.random() * 1460)+".jpg"))
   message.channel.send(embed)
}
 else{
       message.channel.send({embed: {
color: Math.floor(Math.random() * (0xFFFFAD + 2)),
description: ('Bu kanal NSFW kanalı değil!')
 }})
 }
}
  
    if (command === "ascii") {

        if (args.join(' ').length > 14) return message.channel.send(`${process.env.basarisiz} En fazla 14 karakter girebilirsiniz.`)
        if (!args.join(' ')) return message.channel.send('Lütfen ASCII olacak yazıyı giriniz! Kullanım: ascii <yazı>').then(msg => msg.delete({
            timeout: 30000
        }));
        figlet(args.join(' '), (err, data) => {
            message.channel.send('```' + data + '```')
        })
    };
    if (command === "ters") { // eslint-disable-line no-unused-vars
        const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>¿@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
        // Start with the character '!'
        const OFFSET = '!'.charCodeAt(0);
        if (args.length < 1) {
            message.channel.send(`${process.env.basarisiz} Ters yazılacak yazıyı yazmalısınız.`);
        }

        message.channel.send(
            args.join(' ').split('')
            .map(c => c.charCodeAt(0) - OFFSET)
            .map(c => mapping[c] || ' ')
            .reverse().join('')
        )
    }
  
  if (command === 'kick') {
    if (message.author.id !== `${enesonurata}` && message.author.id !== `${enesonurata}`) {
    } else {
      		message.delete()
        var member= message.mentions.members.first();
        member.kick().then((member) => {
            message.channel.send(" " + member.tag + ", EnesOnurAta tarafından uzaklaştırıldı.");
        }).catch(() => {
            message.channel.send("Bir hata tespit edildi.");
    })
   }
  }

  if (command === 'ban') {
    if (message.author.id !== `${enesonurata}` && message.author.id !== `${talha}`) {
    } else {
      		message.delete()
        var member= message.mentions.members.first();
        member.ban().then((member) => {
            message.channel.send("" + member.tag + ", EnesOnurAta tarafından yasaklandı.");
        }).catch(() => {
            message.channel.send("Bir hata tespit edildi.");
    })
   }
  }
  
      if (command === "vaporwave") { // eslint-disable-line no-unused-vars
        const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>¿@ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ[/]^_`ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ{|}~';
        // Start with the character '!'
        const OFFSET = '!'.charCodeAt(0);
        if (args.length < 1) {
            message.channel.send(`${process.env.basarisiz} Estetik yazılacak yazıyı yazmalısınız.`);
        }

        message.channel.send(
            args.join(' ').split('')
            .map(a => a.charCodeAt(0) - OFFSET)
            .map(a => mapping[a] || ' ')
            .join('')
        )
    }
  
  if (command === "wasted") {
      message.channel.startTyping();
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2F1.png?1529363616039", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${bot.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/wasted/${bot.user.id}-${user.id}.png`));
                }, 1000);
          message.channel.stopTyping();
            });
        });
    }
  
    if (command === "kullanıcı" || command === "kullanıcıbilgi" || command === "kullanıcı-bilgi") {
		const Durum = user.presence.status;
		const Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
		const durm = (Durum == "online" ? ("Çevrimiçi") : (Durum == "offline" ? ("Çevrimdışı") : (Durum == "idle" ? ("Boşta") : (Durum == "dnd" ? ("Rahatsız Etmeyin") : ("Bilinmiyor/bulunamadı.")))))
      const embed = new Discord.RichEmbed()
      .setColor(Durm)
      .addField("İsim ve ID", `${user.tag}, (${user.id})`, false)
      .addField("Kayıt Tarihi", `${user.createdAt}`, false)
      .addField("Durum", `${durm}`, false)
      .addField("Oynadığı Oyun", `${user.presence.game ? user.presence.game.name : 'Oynamıyor'}`, false)
      .addField("Bot mu?", `${user.bot ? '\n Evet' : 'Hayır'}`, false)
      .setThumbnail(user.avatarURL)
      message.channel.send(embed)
    }

  
    if (command === "atatürk") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("İşleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(3000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            Jimp.read("https://cdn.discordapp.com/attachments/468850238409539636/468917003445600258/indir_2.png", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${bot.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/wasted/${bot.user.id}-${user.id}.png`));
                }, 1000);
            });
        });
    }

    if (command === "dyanındayım" || command === "devlet" || command === "devletiminyanındayım") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("İşleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(3000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            Jimp.read("https://cdn.discordapp.com/attachments/468850238409539636/468917002019274798/indir_1.png", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${bot.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/wasted/${bot.user.id}-${user.id}.png`));
                }, 1000);
            });
        });
    }
  
    if (command === "thuglife") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("İşleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(3000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            Jimp.read("https://cdn.discordapp.com/attachments/468850238409539636/468918311342833667/indir_3.png", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${bot.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/wasted/${bot.user.id}-${user.id}.png`));
                }, 1000);
            });
        });
    }
  
    if (command === "hanımcı") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("İşleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(3000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            Jimp.read("https://cdn.discordapp.com/attachments/468845638688440323/468869160924086272/S.png", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${bot.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/wasted/${bot.user.id}-${user.id}.png`));
                }, 1000);
            });
        });
    }
  
    if (command === "hacker" || command === "hemçkır") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("İşleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(3000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/468845638688440323/468848900829085716/neblm.png", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${bot.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/wasted/${bot.user.id}-${user.id}.png`));
                }, 1000);
            });
        });
    }
  
    if (command === "destek") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("Desteğiniz yükleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(3000));
        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            Jimp.read("https://cdn.discordapp.com/attachments/468845638688440323/468895636083965962/Adsz.png", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${bot.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/wasted/${bot.user.id}-${user.id}.png`));
                }, 1000);
              message.channel.send("Bu fotoğrafı profilinize koyarak destek çıkabilirsiniz.")
            });
        });
    }
  
    if (command === "azerbaijan" || command === "azerbeycan") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("İşleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(3000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            Jimp.read("https://cdn.discordapp.com/attachments/468845638688440323/468879057862524929/asdas.png", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${bot.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/wasted/${bot.user.id}-${user.id}.png`));
                }, 1000);
            });
        });
    }
  
    if (command === "oç") {
        if (message.author.id !== `${owner}` && message.author.id !== `${talha}`) {
        } else {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("İşleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(3000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            Jimp.read("https://cdn.discordapp.com/attachments/468845638688440323/468881255912570890/ANAN.png", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${bot.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/wasted/${bot.user.id}-${user.id}.png`));
                }, 1000);
            });
        });
    }
    }

 if(command === "blok") {
        var letters = args.join("").toLowerCase().split("");
        var is = 0;
        var output = "";
        while(is < letters.length) {
            output = output + ":regional_indicator_" + letters[is] + ":";
            is++
        }
	message.delete()
        message.channel.send(output);
    }
  
    if (command === "sniper") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("İşleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(310, 325)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2FPNGPIX-COM-Crosshair-PNG-Transparent-Image.png?1529363625811", (err, avatar) => {
                avatar.resize(310, 325)
                image.composite(avatar, 2, 0).write(`./img/snip/${bot.user.id}-${bot.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${bot.user.id}-${bot.id}.png`));
                }, 1000);
            });

        });
    }
  
if(command === "discrim") {
        const discrim = args[0] || message.author.discriminator;
        const users = bot.users.filter(user => user.discriminator === discrim).map(user => user.tag);
        
        if (users < 1) {
const embed2 = new Discord.RichEmbed()
.setColor(3447003)
.setDescription(`${discrim} bulunamadı!`)
            return message.channel.send({embed2});
        } else {
           message.channel.send(`${users.join('\n')}`, { split: true })
        }
    }

    if (command === "temizle" || command === "purge" || command === "sil") {
        const user = message.mentions.users.first();
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Üzgünüm, mesajları silecek veya temizleyecek yetkin yok!')
            .then(msg => msg.delete({
                timeout: 10000
            }));
        const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
        if (!amount) return message.channel.send('Silinecek veya temizlenecek mesaj sayısını giriniz!')
            .then(msg => msg.delete({
                timeout: 10000
            }));
        if (!amount && !user) return message.channel.send('Bir kullanıcı ve mesaj sayısı giriniz, ya da sadece silinecek mesaj sayısı!')
            .then(msg => msg.delete({
                timeout: 10000
            }));
        message.channel.fetchMessages({
                limit: amount,
            })
            .then((messages) => {
                if (user) {
                    const filterBy = user ? user.id : bot.user.id;
                    messages = messages.filter(m => m.author.id === filterBy)
                        .array()
                        .slice(0, amount);
                }
                message.channel.bulkDelete(messages)
                    .catch(error => console.log(error.stack));
            });
    }
  
    if (command === "davet-skor" || command === "davetler") {

        let invites = await message.guild.fetchInvites().catch(error => {
            return message.channel.send(`${process.env.basarisiz} Davetleri görüntülemek için yetkim bulunmuyor.`);
        })
        invites = invites.array();
        arraySort(invites, 'uses', {
            reverse: true
        }); 
        let possibleInvites = [
            ['Kullanıcı', 'Kullanım']
        ]; 
        invites.forEach(function(invite) {
            possibleInvites.push([invite.inviter.username, invite.uses]);
        })
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .addField('Oluşturulma Sıralaması', `\`\`\`${table.table(possibleInvites)}\`\`\``);
        message.channel.send(embed)
    }

    if (command === "hava" || command === "havadurumu" || command === "hava-durumu") {
        weather.find({
            search: args.join(" "),
            degreeType: 'C'
        }, function(err, result) {
            if (err) message.channel.send(process.env.basarisiz + "Bir hata ile karşılaştım.\n`" + err + "`");
            if (result === undefined || result.length === 0) {
                const embed = new Discord.RichEmbed()
                    .setDescription(`${process.env.basarisiz} Geçersiz konum girdiniz.`)
                    .setColor("RANDOM")
                message.channel.send(embed)
                return;
            }
            var current = result[0].current;
            var location = result[0].location;
            const embed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor("RANDOM")
                .addField('Zaman dilimi', `UTC${location.timezone}`, true)
                .addField('Derece tipi', location.degreetype, true)
                .addField('Sıcaklık', `${current.temperature} Degrees`, true)
                .addField('Hissedilen', `${current.feelslike} Degrees`, true)
                .addField('Rüzgar', current.winddisplay, true)
                .addField('Nem', `${current.humidity}%`, true)
            message.channel.send({
                embed
            });
        })
    }

    if (command === "panel") {
        let memberIDFetched = await db.fetch(`memberChannel_${message.guild.id}`);
        if (memberIDFetched == null) memberIDFetched = 'Belirlenmemiş'
        let memberIDFetched2 = await db.fetch(`membermodChannel_${message.guild.id}`);
        if (memberIDFetched2 == null) memberIDFetched2 = 'Belirlenmemiş'
        let prefixFetched = await db.fetch(`prefix_${message.guild.id}`);
        if (prefixFetched == null) prefixFetched = '?'
        let autoRoleFetched = await db.fetch(`autoRole_${message.guild.id}`);
        if (autoRoleFetched == null) autoRoleFetched = 'Belirlenmemiş'
        let prefüx = await db.fetch(`prefix_${message.guild.id}`);
        if (!prefüx) prefüx = "?"
        const ayarlar = new Discord.RichEmbed().setTitle("Sunucu Paneli").setDescription(`**Prefix:** ${prefixFetched}\n**Log:** <#${memberIDFetched}> \n**Mod-Log:** <#${memberIDFetched2}>\n**Oto rol:** ${autoRoleFetched}`).setFooter(`Yardım almak için ${prefüx}panelyardım`).setThumbnail(message.guild.iconURL)
        message.channel.send(ayarlar)
    }

    if (command === "giriş-rolü-ayarla" || command === "oto-rol-ayarla" || command === "otorolayarla" || command === "otorol") {
        if (!message.member.hasPermission("MANAGE_GUILD"))
            return message.channel.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`)
        if (!args.join(" ") && args.join(" ").toLowerCase() === `none`)
            return message.channel.send(`Geçerli bir rol girmelisin.\nDoğru kullanım: ${prefix}otorolayarla [Rol Adı]`)
        let autoRole;
        if (args.join(" ").toLowerCase() === `none`) autoRole = '';
        else autoRole = args.join(" ").trim();
        db.set(`autoRole_${message.guild.id}`, autoRole).then(i => {
            return message.channel.send(`${process.env.basarili} Otomatik rol ${i} olarak seçilmiştir.`)
        })
    }

    if (command === "log-ayarla" || command === "logayarla") {
        if (!message.member.hasPermission("MANAGE_GUILD"))
            return message.channel.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`)
        if (!message.mentions.channels.first() && args.join(" ").toLowerCase() === `none`)
            return message.channel.send("Geçerli bir kanal etiketlemelisin.\nDoğru kullanım: ${prefix}log-ayarla [#kanal]")
        let newChannel;
        if (args.join(" ").toLowerCase() === `none`) newChannel = '';
        else newChannel = message.mentions.channels.first().id;
        db.set(`memberChannel_${message.guild.id}`, newChannel).then(i => {
            const ayarlar2 = new Discord.RichEmbed().setFooter(`${process.env.basarili} Log kanalı ${message.mentions.channels.first()} olarak seçilmiştir.`)
            return message.channel.send(`${process.env.basarili} Log kanalı ${message.mentions.channels.first()} olarak seçilmiştir.`)
        })
    }
  
    if (command === 'döviz') {
var request = require('request');
request('https://www.doviz.com/api/v1/currencies/USD/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
        var info = JSON.parse(body);
request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error); 
    else if (!error) { 
        var euro = JSON.parse(body);
      message.channel.send(`${process.env.dolar} Dolar satış: ${info.selling}TL \n${process.env.dolar} Dolar alış: ${info.buying}TL \n\n${process.env.euro} Euro satış: ${euro.selling}TL \n${process.env.euro} Euro alış: ${euro.buying}TL`)    }
})
    }
})
    }

    if (command === "mod-log-ayarla" || command === "modlogayarla" || command === "mod-logayarla" || command === "modlog") {
        if (!message.member.hasPermission("MANAGE_GUILD"))
            return message.channel.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`)
        if (!message.mentions.channels.first() && args.join(" ").toLowerCase() === `none`)
            return message.channel.send("Geçerli bir kanal etiketlemelisin.\nDoğru kullanım: ${prefix}mod-log-ayarla [#kanal]")
        let newChannel;
        if (args.join(" ").toLowerCase() === `none`) newChannel = '';
        else newChannel = message.mentions.channels.first().id;
        db.set(`membermodChannel_${message.guild.id}`, newChannel).then(i => {
            const ayarlar2 = new Discord.RichEmbed().setFooter(`${process.env.basarili} Mod-Log kanalı ${message.mentions.channels.first()} olarak seçilmiştir.`)
            return message.channel.send(`${process.env.basarili} Mod-Log kanalı ${message.mentions.channels.first()} olarak seçilmiştir.`)
        })
    }	
	
    if (command === "trigger") {
        const options = {
            size: 256,
          
            frames: 16
        }

        message.channel.send("İşleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(1000));

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const args = message.content.split(' ').slice(1);
        let member = message.mentions.users.first()
        if (args[0] === undefined) member = message.author;
        let avatarurl = member.avatarURL;
        if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
            avatarurl = args.join(' ').replace(/gif|webp/g, 'png');
        }
        const base = new Jimp(options.size, options.size);
        const avatar = await Jimp.read(avatarurl);
        const text = await Jimp.read('https://cdn.glitch.com/a7d3b6b8-9b7a-4aab-9ee4-1db0c07ef1eb%2Ftriggered.png?1526842782410');
        const tint = await Jimp.read('https://cdn.glitch.com/5fed2789-b430-43c5-bf1b-a8dd32d46b97%2Fred.png?1527082445373');
        avatar.resize(320, 320);
        tint.scaleToFit(base.bitmap.width, base.bitmap.height);
        tint.opacity(0.2);
        text.scaleToFit(280, 60);
        const frames = [];
        const buffers = [];
        const encoder = new GIFEncoder(options.size, options.size);
        const stream = encoder.createReadStream();
        let temp;
        stream.on('data', async buffer => await buffers.push(buffer));
        stream.on('end', async () => {
            return await message.channel.send({
                files: [{
                    name: 'notechtriggered.gif',
                    attachment: Buffer.concat(buffers)
                }]
            });
        });
        for (let i = 0; i < options.frames; i++) {
            temp = base.clone();
            if (i === 0) {
                temp.composite(avatar, -16, -16);
            } else {
                temp.composite(avatar, -32 + getRandomInt(-16, 16), -32 + getRandomInt(-16, 16));
            }
            temp.composite(tint, 0, 0);
            if (i === 0) temp.composite(text, -10, 200);
            else temp.composite(text, -12 + getRandomInt(-8, 8), 200 + getRandomInt(-0, 12));
            frames.push(temp.bitmap.data);
        }
        encoder.start();
        encoder.setRepeat(0);
        encoder.setDelay(20);
        for (const frame of frames) {
            encoder.addFrame(frame);
        }
        encoder.finish();
    }

    if (command === "eval") {
        if (message.author.id !== `${owner}` && message.author.id !== `${talha}`) return;
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), {
                code: "xl"
            });
        } catch (err) {
            message.channel.send(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }

    if (command === "sunucuresmi") {
        message.channel.send(new Discord.RichEmbed()
            .setDescription(`Sunucu Resmi:`)
            .setImage(`${message.guild.iconURL} `)
            .setColor("RANDOM"));
    }

    if (command === "prefix" || command === "prefix-ayarla") {
        const embed1 = new Discord.RichEmbed().setFooter("Uyarı: Üzgünüm bu komutu kullanabilecek yetkin yok.").setColor(0xc25b5b)
        const embed2 = new Discord.RichEmbed().setFooter(`Uyarı: Geçerli bir prefix girmelisin.\nDoğru kullanım: ${prefix}prefix [Yeni prefix]`).setColor(0xc25b5b)
        if (!message.member.hasPermission("MANAGE_GUILD"))
            return message.channel.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`)
        if (!args[0])
            return message.channel.send(`${process.env.basarisiz} Prefix girmelisiniz.`)
        db.set(`prefix_${message.guild.id}`, args.join('  ')).then(ü => {
            message.channel.send(`${process.env.basarili} Prefix ${ü} olarak seçilmiştir.`)
        })
    }
    if (command === "parti" || command === "disko") {
        message.channel.send(new Discord.RichEmbed()
            .setDescription(`<a:parti:467099432983461918> <a:parti:467099432983461918> <a:parti:467099432983461918> <a:parti:467099432983461918> <a:parti:467099432983461918> <a:parti:467099432983461918> <a:parti:467099432983461918> <a:parti:467099432983461918> <a:parti:467099432983461918> <a:parti:467099432983461918> `)
            .setColor("RANDOM"));
    }
  
   if (command === "mcavatar") {
                  const embed = new Discord.RichEmbed()
                      .setTitle(`**${args}** adlı kullanıcının avatarı:`)
                      .setImage(`https://cravatar.eu/avatar/${args}/100.png`)
                      .setFooter(`${message.author.tag} tarafından istendi.`, message.author.avatarURL)
                      .setColor('RANDOM');
                  message.channel.send(embed)
   }
  
   if (command === "mcskin") {
                       var embed = new Discord.RichEmbed()
                      .setTitle(`**${args}** adlı kullanıcının skini:`)
                      .setImage(`https://minotar.net/armor/body/${args}/300.png`)
                      .setFooter(`${message.author.tag} tarafından istendi.`, message.author.avatarURL)
                      .setColor('RANDOM');
                  return message.channel.send(embed)
   }

    if (command === "sor") {
        const replies = ["Evet",
            "Belki",
            "Hayır",
            "Ben nereden bileyim?",
            "Nö nö nö",
            "Evet evet aynen ondan"
        ];
        message.replytext = Math.floor((Math.random() * replies.length) + 0);
        return message.reply(replies[message.replytext]);
    }

    if (command === "yardım") {
        await message.react('🇹');
        message.react('🇲');
        let prefüx = await db.fetch(`prefix_${message.guild.id}`);
        if (!prefüx) prefüx = "?"
        const embed = new Discord.RichEmbed()
            .setTitle("")
            .setDescription('')
            .setColor("RANDOM")
            .addField("Komutlar", `**${prefüx}anakomutlar** - Botu kullanmak için gerekli komutlar \n**${prefüx}eğlence** - Eğlence arayanlara özel komutlar \n**${prefüx}moderasyon** - Yetkililer için moderatör komutları \n**${prefüx}kişisel** - Sunucu üyeleri için hazırlanan komutlar \n**${prefüx}şarkı** - Sunucuda şarkı çalmak için komutlar`)
            .addField("Bağlantılar", `[Sunucuna Ekle](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&permissions=2146958527&scope=bot) | [Destek Sunucusu](https://discord.gg/3FKUR6z)`)
            .setThumbnail(`${message.author.avatarURL}`)

        return message.channel.send(embed)
    }

    if (command === "davet") {
        const embed = new Discord.RichEmbed()
            .setDescription(`Davet linkim için [üzerime tıkla.](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&permissions=2146958527&scope=bot)`)
        return message.channel.send(embed);
    }

    if (command === 'yenile') {
        if (message.author.id !== `${owner}` && message.author.id !== `${talha}`) {
            message.channel.send(`${process.env.basarisiz} Bu komutu kullanabilmek için yetkin bulunmuyor.`)
        } else {
            message.channel.send(`${process.env.basarili} Talebiniz alındı. Yeniden başlıyorum..`).then(msg => {
                console.log(`Yeniden başlıyorum..`);
                process.exit(0);
            })
        }
    }

    if (command === "sunucubilgi") {
var konum = ''
        if(message.guild.region === "russia") {
            var konum = ':flag_ru: Rusya'
        }
        if(message.guild.region === "us-west") {
            var konum = ':flag_us: Batı Amerika'
        }
        if(message.guild.region === "us-south") {
            var konum = ':flag_us: Güney Amerika'
        }
        if(message.guild.region === "us-east") {
            var konum = ':flag_us: Doğu Amerika'
        }
        if(message.guild.region === "us-central") {
            var konum = ':flag_us: Amerika'
        }
        if(message.guild.region === "brazil") {
            var konum = ':flag_br: Brezilya'
        }
        if(message.guild.region === "singapore") {
            var konum = ':flag_sg: Singapur'
        }
        if(message.guild.region === "sydney") {
            var konum = ':flag_au: Sidney'
        }
        if(message.guild.region === "eu-west") {
            var konum = ':flag_eu: Batı Avrupa'
        }
        if(message.guild.region === "eu-south") {
            var konum = 'Güney Avrupa'
        }
        if(message.guild.region === "eu-east") {
            var konum = 'Doğu Avrupa'
        }
        if(message.guild.region === "eu-central") {
            var konum = ':flag_eu: Avrupa'
        }
        if(message.guild.region === "hongkong") {
            var konum = ':flag_hk: Hong Kong'
        }
        if(message.guild.region === "japan") {
            var konum = ':flag_jp: Japonya'
        }
      
        let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
        let day = message.guild.createdAt.getDate()
        let month = 1 + message.guild.createdAt.getMonth()
        let year = message.guild.createdAt.getFullYear()
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
            .setAuthor(message.guild.name, sicon)
            .setColor("#7289DA")
            .setThumbnail(sicon)
            .addField("ID", message.guild.id, true)
            .addField("İsim", message.guild.name, true)
            .addField("Kurucu", message.guild.owner.user.tag, true)
            .addField("Bölge", konum, true)
            .addField("Kanallar", message.guild.channels.size, true)
            .addField("Üye", message.guild.memberCount, true)
            .addField("İnsanlar", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
            .addField("Botlar", message.guild.members.filter(m => m.user.bot).size, true)
            .addField("Çevrimiçi", online.size, true)
            .addField("Roller", message.guild.roles.size, true)
            .addField("Oluşturulma tarihi", `${day}.${month}.${year}`, true);
        message.channel.send(serverembed);

    }
    if (command === "botbilgi") {
        const embed = new Discord.RichEmbed()
            .addField("Geliştirici", `**[**${bot.users.get(talha).tag}**]**`)
            .addField("Notech Version", "2.0.6", true)
            .addField("Toplam Sunucu Sayısı", bot.guilds.size, true)
            .addField("Toplam Kullanıcı Sayısı", bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
            .addField("Toplam Kanal Sayısı", bot.channels.size, true)
            .addField("İşletim Sistemi", "Linux", true)
            .addField("Kitaplık Türü", "discord.js", true)
            .addField("Discord.js Sürüm", `v${Discord.version}`, true)
            .addField("Node Sürüm", `${process.version}`, true)
            .setThumbnail(`${bot.user.avatarURL}`)
            .setColor("RANDOM")
        return message.channel.send(embed)
    }
  
    if (command === "anakomutlar") {
        let prefüx = await db.fetch(`prefix_${message.guild.id}`);
        if (!prefüx) prefüx = "?"
        const embed = new Discord.RichEmbed()
            .setTitle("")
            .setDescription('')
            .setColor("RANDOM")
            .addField("Notech Ana Komutları", `**${prefüx}panel** - Sunucu için ayarlanmış paneli gösterir. \n**${prefüx}profil** - Seviye kartınızı gösterir. \n**${prefüx}panelyardım** - Panelin komutlarını gösterir. \n**${prefüx}uptime** - Botun çalışma süresini gösterir. \n**${prefüx}nsfw** - +18 fotoğraflar gönderir. \n**${prefüx}davetler** - Sunucudaki davetleri ve kullanımları gösterir. \n**${prefüx}discrim** - Kendi discriminizi aratır. \n**${prefüx}bug** - Yazdığınız bugu destek sunucusuna gönderir. \n**${prefüx}hava** - Belirttiğiniz şehrin hava durumunu gösterir. \n**${prefüx}istatistik** - Botun istatistiğini gösterir. \n**${prefüx}ping** - Botun pingini ölçer. \n**${prefüx}sunucubilgi** - Sunucu hakkkında detaylı bilgi verir. \n**${prefüx}sunucuresmi** - Sunucunun resmini gönderir. \n**${prefüx}yardım** - Botun bütün komutlarını size gösterir. \n**${prefüx}botbilgi** - Bot hakkında bilgi verir. \n**${prefüx}tavsiye** - Yazdığınız tavsiyeyi destek sunucusuna gönderir. \n**${prefüx}davet** - Botun davet linkini atar.`)
            .setFooter('')

        return message.channel.send(embed)
    }
  
      if (command === "premium") {
        const embed = new Discord.RichEmbed()
            .setDescription(`Botu kiralamak için [üzerime tıkla.](https://discord.gg/3FKUR6z)`)
        return message.channel.send(embed)
    }

     if (command === "bağışyap" || command === "bağış") {
       message.channel.send(`<:ininal1:469578757003542528> Bağış yapmak için İninal barkodu: ` + "`" + "0000045216688" + "`")
    }
  
    if (command === "kişisel") {
        let prefüx = await db.fetch(`prefix_${message.guild.id}`);
        if (!prefüx) prefüx = "?"
        const embed = new Discord.RichEmbed()
            .setTitle("")
            .setDescription('')
            .setColor("RANDOM")
            .addField("Notech Kişisel Komutları", `**${prefüx}avatar** - Bot sizin veya etiketlediğiniz kişinin avatarını gösterir. \n**${prefüx}discrim** - Kendi discriminizi aratır. \n**${prefüx}bug** - Yazdığınız bugu destek sunucusuna gönderir. \n**${prefüx}profil** - Seviye kartınızı oluşturur. \n**${prefüx}nsfw** - +18 fotoğraflar gönderir. \n**${prefüx}sor** - Sorduğunuz soruya kısa cevaplar verir. \n**${prefüx}yaz** - Yazdığınız mesajı bota yazdırır. \n**${prefüx}çekiliş** - Sunucudan rastgele birisini seçer. \n**${prefüx}hava** - Belirttiğiniz şehrin hava durumunu gösterir.`)
            .setFooter('')

        return message.channel.send(embed)
    }

    if (command === "eğlence") {
        let prefüx = await db.fetch(`prefix_${message.guild.id}`);
        if (!prefüx) prefüx = "?"
        const embed = new Discord.RichEmbed()
            .setTitle("")
            .setDescription('')
            .setColor("RANDOM")
            .addField("Notech Eğlence Komutları", `**${prefüx}ascii** - Yazdığınız mesajı ascii olarak ayarlar. \n**${prefüx}avatar** - Bot sizin veya etiketlediğiniz kişinin avatarını gösterir. \n**${prefüx}ters** - Yazdığınız mesajı tersten yazar. \n**${prefüx}vaporwave** - Yazdığınız mesajı estetik yazar. \n**${prefüx}espriyap** - Bot espri yapar. \n**${prefüx}zekam** - Zeka puanınızı gösterir. \n**${prefüx}matematik** - Matematik işlemi yapar. \n**${prefüx}sigara** - Bot sigara içer. \n**${prefüx}kurabiye** - Size kurabiye verir.`)
            .setFooter('')

        return message.channel.send(embed)
    }

    if (command === "şarkı") {
        let prefüx = await db.fetch(`prefix_${message.guild.id}`);
        if (!prefüx) prefüx = "?"
        const embed = new Discord.RichEmbed()
            .setTitle("")
            .setDescription('')
            .setColor("RANDOM")
            .addField("Notech Müzik Komutları", `**${prefüx}gir** - Bulunduğunuz sesli kanala girer. \n**${prefüx}çık** - Bulunduğunuz sesli kanaldan çıkar. \n**${prefüx}ekle** - Yazdığınız Youtube linkini sıraya ekler. \n**${prefüx}çal** - Sunucunun şarkı sırasında olan şarkıları sırayla çalar. \n**${prefüx}sıra** - Sunucudaki şarkı sırasını gösterir. \n**${prefüx}durdur** - Çalan şarkıyı durdurur. \n**${prefüx}devam** - Durdurulan şarkıyı devam ettirir. \n**${prefüx}geç** - Çalan şarkıyı geçer. \n**${prefüx}ses+** - Şarkının ses seviyesini ayarlar örn: ?ses+++ \n**${prefüx}ses-** - Şarkının ses seviyesini ayarlar örn: ?ses---`)
            .setFooter('')

        return message.channel.send(embed)
    }

    if (command === "moderasyon") {
        let prefüx = await db.fetch(`prefix_${message.guild.id}`);
        if (!prefüx) prefüx = "?"
        const embed = new Discord.RichEmbed()
            .setTitle("")
            .setDescription('')
            .setColor("RANDOM")
            .addField("Notech Moderasyon Komutları", `**${prefüx}panel** - Sunucu için ayarlanmış paneli gösterir. \n**${prefüx}bug** - Yazdığınız bugu destek sunucusuna gönderir. \n**${prefüx}ping** - Botun pingini ölçer. \n**${prefüx}at** - Etiketlenen kişiyi sunucudan atar. \n**${prefüx}sustur** - Etiketlenen kişiyi susturur. \n**${prefüx}yasakla** - Etiketlenen kişiyi sunucudan banlar. \n**${prefüx}temizle** - Bot belirttiğiniz kadar mesaj siler. \n**${prefüx}tavsiye** - Yazdığınız tavsiyeyi destek sunucusuna gönderir. \n**${prefüx}yenile** - Botu yeniden başlatır.`)
            .setFooter('')

        return message.channel.send(embed)
    }

    if (command === "matematik") {
        let prefüx = await db.fetch(`prefix_${message.guild.id}`);
        if (!prefüx) prefüx = "?"
        const embed = new Discord.RichEmbed()
            .setTitle("")
            .setDescription('')
            .setColor("RANDOM")
            .addField("Notech Matematik Komutları", `**${prefüx}topla** - Yazdığınız iki sayıyı toplar. \n**${prefüx}çıkar** - Yazdığınız iki sayıyı çıkarır. \n**${prefüx}çarp** - Yazdığınız iki sayıyı çarpar. \n**${prefüx}böl** - Yazdığınız iki sayıyı böler.`)
            .setFooter(`Kullanım: ${prefüx}topla 1 1`)

        return message.channel.send(embed)
    }
  
    if (command === "minecraft") {
        let prefüx = await db.fetch(`prefix_${message.guild.id}`);
        if (!prefüx) prefüx = "?"
        const embed = new Discord.RichEmbed()
            .setTitle("")
            .setDescription('')
            .setColor("RANDOM")
            .addField("Notech Minecraft Komutları", `**${prefüx}mcskin** - Yazdığınız kullanıcı adının skinini gönderir. \n**${prefüx}mcavatar** - Yazdığınız kullanıcı adının avatarını gönderir.`)
            .setFooter('')

        return message.channel.send(embed)
    }
  
    if (command === "resimler") {
        let prefüx = await db.fetch(`prefix_${message.guild.id}`);
        if (!prefüx) prefüx = "?"
        const embed = new Discord.RichEmbed()
            .setTitle("")
            .setDescription('')
            .setColor("RANDOM")
            .addField("Notech Resim Komutları", `**${prefüx}wasted** - Profilinize wasted efekti ekler.  \n**${prefüx}atatürk** - Profilinize atatürk efekti ekler. \n**${prefüx}devlet** - Profilinize devletimin yanındayım efekti ekler. \n**${prefüx}thuglife** - Profilinize thuglife efekti ekler. \n**${prefüx}hanımcı** - Profilinize hanımcı efekti ekler. \n**${prefüx}hacker** - Profilinize hacker efekti ekler. \n**${prefüx}destek** - Profilinize Notech botun destek efekti ekler. \n**${prefüx}azerbeycan** - Profilinize azerbeycan efekti ekler. \n**${prefüx}sniper** - Profilinize sniper efekti ekler. \n**${prefüx}trigger** - Profilinize trigger efekti ekler.`)
            .setFooter('')

        return message.channel.send(embed)
    }
  
    if (command === "profilyardım") {
        let prefüx = await db.fetch(`prefix_${message.guild.id}`);
        if (!prefüx) prefüx = "?"
        const embed = new Discord.RichEmbed()
            .setTitle("")
            .setDescription('')
            .setColor("RANDOM")
            .addField("Notech Profil Komutları", `**${prefüx}profil** - Profil kartınızı gösterir. \n**${prefüx}rank** - Rütbe kartınızı gösterir.  \n**${prefüx}isim** - Profilinizdeki ismi değiştir. \n**${prefüx}biyografi** - Profilinizdeki biyografiyi değiştirir. \n**${prefüx}rozetyardım** - Profilinize rozetler hakkında bilgi verir.`)
            .setThumbnail(`${message.author.avatarURL}`)
            .setFooter('')

        return message.channel.send(embed)
    }
  
    if (command === "rozetyardım") {
        let prefüx = await db.fetch(`prefix_${message.guild.id}`);
        if (!prefüx) prefüx = "?"
        const embed = new Discord.RichEmbed()
            .setTitle("")
            .setDescription('')
            .setColor("RANDOM")
            .addField("Notech Rozet Komutları", `**${prefüx}başvur** Profilinizi onaylamamamız için bilgiyi gönderirsiniz. [ör: ${prefüx}başvur Notech adamdır beni onaylayın xd.] \n**${prefüx}oyverdim** - Destekçi rozetini ve Notech destek sunucusunda özel rol alırsınız.\nDiğer bütün rozet bilgileri için ${bot.users.get(talha).tag} ile iletişime geçebilirsiniz.`)
            .setThumbnail(`${message.author.avatarURL}`)
            .setFooter('')

        return message.channel.send(embed)
    }

    if (command === "panelyardım") {
        let prefüx = await db.fetch(`prefix_${message.guild.id}`);
        if (!prefüx) prefüx = "?"
        const embed = new Discord.RichEmbed()
            .setTitle("")
            .setDescription('')
            .setColor("RANDOM")
            .addField("Panel Ayarlama Komutları", `**${prefüx}log-ayarla** - Belirttiğiniz kanalı log kanalı olarak ayarlar. \n**${prefüx}mod-logayarla** - Belirttiğiniz kanalı modlog olarak ayarlar. \n**${prefüx}otorol** - Belirttiğiniz rolü otorol olarak ayarlar. \n**${prefüx}prefix** - Sunucunuz için özel prefix ayarlar.`)
            /*.addField("Panel Kapatma Komutları [BAKIMDA]", `**${prefüx}log-kapat** - Belirttiğiniz log kanalını kapatır. \n**${prefüx}mod-logkapat** - Belirttiğiniz modlog kanalını kapatır. \n**${prefüx}girişkapat** - Log kanalındaki giriş mesajını kapatır.\n**${prefüx}çıkışkapat** - Log kanalındaki çıkış mesajını kapatır. \n**${prefüx}girişdmkapat** - Sunucuya girildiğinde özel mesajı kapatır. \n**${prefüx}otorolkapat** - Ayarlanmış olan otorolü kapatır.  \n**${prefüx}prefixkapat** - Botun kendi prefixini kullanırsınız. (**?**)`)*/
            .setFooter(`Yaptığınız değişikliklere bakmak için ${prefüx}panel`)

        return message.channel.send(embed)
    }
  
    if (command === "istatistik" || command === "i") {
        let prefüx = await db.fetch(`prefix_${message.guild.id}`);
        if (!prefüx) prefüx = "?"
        const embed = new Discord.RichEmbed()
            .setTitle("Notech istatistik")
            .setDescription('')
            .setThumbnail(`${bot.user.avatarURL}`)
            .setColor("RANDOM")
            .addField("Shard", "1/1", true)
            .addField("Sunucu Sayısı", bot.guilds.size.toLocaleString(), true)
            .addField("Kanal Sayısı", bot.channels.size.toLocaleString(), true)
            .addField("Müzik çalınan sunucular", bot.voiceConnections.size, true)
            .addField("Kullanıcı Sayısı", bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
            .addField("Bellek Kullanımı", Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ` MB`, true)
            .addField("Discord.js versiyon", "v" + Discord.version, true)
            .addField("Node versiyon", process.version, true)
            .addField("Çalışma Süresi", moment.duration(bot.uptime).format('D [gün], H [saat], m [dakika], s [saniye]'), true)
            .addField("İşletim Sistemi", "Linux", true)

        return message.channel.send(embed)
    }

    if (command === "kurabiye") {
        message.channel.send(`Canım gel buraya sana kurabiye vereceğim! <@${message.author.id}>`)
        message.react("🍪")
    }
  
    if (command === "uptime") {
        message.channel.send(`${moment.duration(bot.uptime).format('D [gün], H [saat], m [dakika], s [saniyedir aktif haldeyim.]')}`)
        message.react("🕦")
    }
  
    if (command === "yaz") {
        let mesaj = message.content.substring(2 + 3);
        message.delete();
        message.channel.send(`**${message.author.tag}**: ` + mesaj);
    }

    if (command === 'espri' || command === 'espriyap') {
var request = require('request');

request('https://api.eggsybot.xyz/espri', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var info = JSON.parse(body);
      message.channel.send(info.soz)
    }
})
    }
  
if (command === 'oyverdim') {
    const DBL = require("dblapi.js");
    const dbl = new DBL(process.env.DBLToken, bot);

    dbl.hasVoted(message.author.id).then(voted => {
        if (voted){
            message.channel.send("Destekçi rolün verildi. <:NOTECHwow:464900244715470878>");
        bot.guilds.get("450009854044536832").members.get(`${message.author.id}`).addRole(bot.guilds.get("450009854044536832").roles.find('name', "Destekçi"))
        db.set(`memberBadge3_${user.id}`, "https://cdn.discordapp.com/attachments/450009854044536834/482317460964638731/401725034453925889.png")
        }
        else if (!voted) return message.reply("Bu komutu kullanabilmek için DBL üzerinden oy vermen gerekiyor.(Eğer oy verdiyseniz bi kaç dakika bekleyin .s) \nOy vermek için: https://discordbots.org/bot/475361686899916800/vote")
    });
}
  
    if (command === 'neko') {
var request = require('request');
request('https://nekos.life/api/neko', function (error, response, body) {
    if (error) return console.log('Hata:', error); // Hata olursa, konsola göndersin,
    else if (!error) { // Eğer hata yoksa;
        var info = JSON.parse(body); // info değişkeninin içerisine JSON'ı ayrıştırsın,
      let embed = new Discord.RichEmbed()
      .setImage(info.neko)
      message.channel.send(embed)
    }
})
    }
  
    if (command === 'oydurumu') {
var request = require('request');
request(`https://discordbots.org/api/bots/475361686899916800?/stats`, function (error, response, body) {
    if (error) return console.log('Hata:', error); // Hata olursa, konsola göndersin,
    else if (!error) { // Eğer hata yoksa;
        var info = JSON.parse(body); // info değişkeninin içerisine JSON'ı ayrıştırsın,
      message.channel.send(`${info.monthlyPoints} adet oylarım bulunuyor.`)
    }
})
    }
  
    if (command === 'altın') {
var request = require('request');
request('http://gulubot.xyz/api/public.php?bilmemne=altin', function (error, response, body) {
    if (error) return console.log('Hata:', error); // Hata olursa, konsola göndersin,
    else if (!error) { // Eğer hata yoksa;
        var info = JSON.parse(body); // info değişkeninin içerisine JSON'ı ayrıştırsın,
      message.channel.send(`Gram alış: ${info.gramalis}TL \nGram satış: ${info.gramsatis}TL \nAyar bilezik gram alış: ${info.ayarbilezikgramalis}TL \nAyar bilezik gram satış: ${info.ayarbilezikgramsatis}TL \nCumhuriyet alış: ${info.cumhuriyetalis}TL \nCumhuriyet satış: ${info.cumhuriyetsatis}TL \nYarım altın alış: ${info.yarimaltinalis}TL \nYarım altın satış: ${info.yarimaltinsatis}TL \nÇeyrek altın alış: ${info.ceyrekaltinalis}TL\nÇeyrek altın satış: ${info.ceyrekaltinsatis}TL \nAta altını alış: ${info.ataaltinalis}TL \nAta altını satış: ${info.ataaltinsatis}TL`)
    }
})
    }
  
    if (command === 'atam') {
var request = require('request');

request('https://api.eggsybot.xyz/ataturk', function (error, response, body) {
    if (error) return console.log('Hata:', error); // Hata olursa, konsola göndersin,
    else if (!error) { // Eğer hata yoksa;
        var info = JSON.parse(body); // info değişkeninin içerisine JSON'ı ayrıştırsın,
  const foto = new Discord.RichEmbed()
  .setImage(info.link)
      message.channel.send(foto)
    }
})
    }
  
    if (command === 'kedi') {
var request = require('request');

request('http://aws.random.cat/meow', function (error, response, body) {
    if (error) return console.log('Hata:', error); // Hata olursa, konsola göndersin,
    else if (!error) { // Eğer hata yoksa;
        var info = JSON.parse(body); // info değişkeninin içerisine JSON'ı ayrıştırsın,
  const foto = new Discord.RichEmbed()
  .setImage(info.file)
      message.channel.send(foto)
    }
})
    }
  
    if (command === 'köpek') {
var request = require('request');

request('https://random.dog/woof.json', function (error, response, body) {
    if (error) return console.log('Hata:', error); // Hata olursa, konsola göndersin,
    else if (!error) { // Eğer hata yoksa;
        var info = JSON.parse(body); // info değişkeninin içerisine JSON'ı ayrıştırsın,
  const foto = new Discord.RichEmbed()
  .setImage(info.url)
      message.channel.send(foto)
    }
})
    }

    if (command === "çekiliş") {
        message.channel.send(`Çekilişi Kazanan: **${message.guild.members.random().displayName}**`);
    }

    if (command === "zekam") {
        var sans = ["11", "15", "20", "24", "28", "31", "39", "45", "49", "54", "58", "63", "67", "77", "73", "84", "80", "83", "96", "94", "99", "Albert Einstein mısın krdşm"];
        var sonuc = sans[Math.floor((Math.random() * sans.length))];
        const embed = new Discord.RichEmbed()
            .addField(`***___Zekan___***`, `${sonuc}`)
        return message.channel.send(embed);
    }

    if (command === "sigara") {
        message.channel.send(':smoking: :cloud::cloud::cloud:')
            .then(nmsg => nmsg.edit(':smoking: :cloud::cloud::cloud:'))
            .then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
            .then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
            .then(nmsg => nmsg.edit(':smoking: :cloud:'))
            .then(nmsg => nmsg.edit(':smoking: :cloud:'))
            .then(nmsg => nmsg.edit('**Sigaram bitti** | **Sigara İçmeyiniz.** :no_smoking: **Sigara Sağlığa Zararlıdır**'));
    }

    if (command === 'topla') {
        let numArray = args.map(n => parseInt(n));
        let total = numArray.reduce((p, c) => p + c);
        message.channel.send(`${total}`);
    }

    if (command === 'çıkar') {
        let numArray = args.map(n => parseInt(n));
        let total = numArray.reduce((p, c) => p - c);
        message.channel.send(`${total}`);
    }

    if (command === 'çarp') {
        let numArray = args.map(n => parseInt(n));
        let total = numArray.reduce((p, c) => p * c);
        message.channel.send(`${total}`);
    }

    if (command === 'böl') {
        let numArray = args.map(n => parseInt(n));
        let total = numArray.reduce((p, c) => p / c);
        message.channel.send(`${total}`);
    }
  
    if (command === 'bug') {
    let channel = bot.channels.get("464863278779203594")
    let mesaj = message.content.substring(2 + 3);
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Bug geldiii!!`)
        .setThumbnail(message.author.avatarURL)
        .addField("Bildiren Kişi", `${message.author.tag} \n(${message.author.id})`, true)
        .addField("Bildirdiği Sunucu", `${message.guild.name} \n(${message.guild.id})`, true)
        .addField("Bug", `${mesaj}`, true)
    channel.send(embed);
      message.delete()
      message.channel.send(`${process.env.basarili} Bildirinizi sunucuya gönderdim.`)
}
  
    if (command === 'başvur') {
    let channel = bot.channels.get("473198881031585793")
    let mesaj = message.content.substring(2 + 3);
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Balvuru geldi!`)
        .setThumbnail(message.author.avatarURL)
        .addField("Onaylanacak Kişi", `${message.author.tag} \n(${message.author.id})`, true)
        .addField("Biyografi", `${mesaj}`, true)
    channel.send(embed);
      message.channel.send(`${process.env.basarili} Başvurunuzu gönderdim. En yakın zamanda yanıt verilecektir.`)
}
  
      if (command === 'tavsiye') {
    let channel = bot.channels.get("464863318507782144")
    let mesaj = message.content.substring(3 + 6);
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Tavsiye geldiii!!`)
        .setThumbnail(message.author.avatarURL)
        .addField("Bildiren Kişi", `${message.author.tag} \n(${message.author.id})`, true)
        .addField("Bildirdiği Sunucu", `${message.guild.name} \n(${message.guild.id})`, true)
        .addField("Tavsiye", `${mesaj}`, true)
    channel.send(embed);
        message.delete()
        message.channel.send(`${process.env.basarili} Bildirinizi sunucuya gönderdim.`)
}
  
    if (command === "avatar") {
        let member = message.mentions.members.first()
        let embed = new Discord.RichEmbed()
            .setImage(message.author.avatarURL)
        if (!member)
            return message.channel.send(embed)
        let second = new Discord.RichEmbed()
            .setImage(member.user.avatarURL)
        message.channel.send(second)
    }
 
  if(command === "yasakla") {
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(`${process.env.basarisiz} Bu komutu kullanabilmek için yetkin bulunmuyor.`)
    let member = message.mentions.members.first();
    if(!member)
      return message.channel.send(`${process.env.basarisiz} Sunucudan yasaklayacağım kişiyi etiketlemelisin.`);
    if(!member.bannable) 
      return message.channel.send(`${process.env.basarisiz} Sunucudan yasaklayamadım. Yoksa bana sunucudan atma yetkisi vermedin mi? veya bana yetkiliyi mi yasaklamaya çalıştırdın?`);

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Açıklama yok.";
    
    await member.ban(reason)
      .catch(error => message.channel.send(`${process.env.basarisiz} Üzgünüm sunucudan yasaklayamadım. HATA: ${error}`));
    message.channel.send(`**${message.author.tag}** sunucudan **${member.user.tag}** kişisini yasakladı. \n**Açıklama:** ${reason}`);
  }

   if(command === "at") {
     if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.channel.send(`${process.env.basarisiz} Bu komutu kullanabilmek için yetkin bulunmuyor.`)
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.channel.send(`${process.env.basarisiz} Sunucudan yasaklayacağım kişiyi etiketlemelisin.`);
    if(!member.kickable) 
      return message.channel.send(`${process.env.basarisiz} Sunucudan atamadım. Yoksa bana sunucudan atma yetkisi vermedin mi? veya bana yetkiliyi mi attırmaya çalıştırdın?`);
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Açıklama yok.";
    
    await member.kick(reason)
      .catch(error => message.channel.send(`${process.env.basarisiz} Üzgünüm sunucudan atamadım. HATA: ${error}`));
    message.channel.send(`**${message.author.tag}** sunucudan **${member.user.tag}** kişisini attı. \n**Açıklama:** ${reason}`);

  }
  
    if (command === "ping") {
        const m = await message.channel.send("Pong!");
        m.edit(`Pong! ` + "`" + `${m.createdTimestamp - message.createdTimestamp}ms` + "`")
    }
});

bot.on('guildCreate', guild => {
    let channel = bot.channels.get("464863390016339969")
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Giriş ${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Kurucu", guild.owner.user.tag)
        .addField("Sunucu ID", guild.id, true)
        .addField("Toplam Kullanıcı", guild.memberCount, true)
        .addField("Toplam Kanal", guild.channels.size, true)
    channel.send(embed);
});
bot.on('guildDelete', guild => {
    let channel = bot.channels.get("464863390016339969")
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Çıkış ${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Kurucu", guild.owner.user.tag)
        .addField("Sunucu ID", guild.id, true)
        .addField("Toplam Kullanıcı", guild.memberCount, true)
        .addField("Toplam Kanal", guild.channels.size, true)
    channel.send(embed);
});

bot.on("message", message => {
    const dmchannel = bot.channels.get("464863461109792768");
    if (message.channel.type === "dm") {
        if (message.author.id === bot.user.id) return;
        dmchannel.send("", {
            embed: {
                color: 0x000007,
                title: `Yazan: ${message.author.tag} ID: ${message.author.id}`,
                description: `${message.content}`
            }
        })
    }
    if (message.channel.bot) return;
});

bot.on('messageDelete', async message => {
      if (message.author.bot) {
        return false;
    }

    if (!message.guild) {
        return false;
    }

  let embedds7 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Mesaj Silindi!`)
        .setThumbnail(message.author.avatarURL)
        .addField("Gönderen", message.author.tag, true)
        .addField("Mesaj", message.content, true)
        .addField("Kanal", message.channel.name, true)
    let membermodChannel = await db.fetch(`membermodChannel_${message.guild.id}`)
    if (!message.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else message.guild.channels.get(membermodChannel).send(embedds7)
})

bot.on('guildBanRemove', async (guild, member) => {
  let embedds6 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Yasak Kaldırıldı!`)
        .setThumbnail(member.avatarURL)
        .setDescription(`'${member.tag}' adlı kişinin yasağı kaldırıldı.`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${guild.id}`)
    if (!guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else guild.channels.get(membermodChannel).send(embedds6)
})

bot.on('guildBanAdd', async (guild, member) => {
  let embedds5 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Üye Yasaklandı!`)
        .setThumbnail(member.avatarURL)
        .setDescription(`'${member.tag}' adlı kişi sunucudan yasaklandı.`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${guild.id}`)
    if (!guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else guild.channels.get(membermodChannel).send(embedds5)
})


bot.on('messageUpdate', async (oldMessage, newMessage) => {
      if (oldMessage.author.bot) {
        return false;
    }

    if (!oldMessage.guild) {
        return false;
    }

    if (oldMessage.content == newMessage.content) {
        return false;
    }

    if (!oldMessage || !oldMessage.id || !oldMessage.content || !oldMessage.guild) return;
  let embedds4 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Mesaj Güncellendi!`)
        .setThumbnail(oldMessage.author.avatarURL)
        .addField("Gönderen", oldMessage.author.tag, true)
        .addField("Önceki Mesaj", oldMessage.content, true)
        .addField("Şimdiki Mesaj", newMessage.content, true)
        .addField("Kanal", newMessage.channel.name, true)
    let membermodChannel = await db.fetch(`membermodChannel_${oldMessage.guild.id}`)
    if (!oldMessage.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else oldMessage.guild.channels.get(membermodChannel).send(embedds4)
})

bot.on('channelDelete', async channel => {
  let embedds3 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Kanal Silindi!`)
        .setThumbnail(channel.guild.iconURL)
        .setDescription(`'${channel.name}' adlı kanal silindi!`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else channel.guild.channels.get(membermodChannel).send(embedds3)
})

bot.on('channelCreate', async channel => {
  let embedds2 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Kanal Oluşturuldu!`)
        .setThumbnail(channel.guild.iconURL)
        .setDescription(`'${channel.name}' adlı kanal oluşturuldu!`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else channel.guild.channels.get(membermodChannel).send(embedds2)
})

bot.on('emojiCreate', async emoji => {
  let embedds9 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Emoji Oluşturuldu!`)
        .setThumbnail(emoji.guild.iconURL)
        .setDescription(`<:${emoji.name}:${emoji.id}> - ${emoji.name} adlı emoji oluşturuldu!`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${emoji.guild.id}`)
    if (!emoji.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else emoji.guild.channels.get(membermodChannel).send(embedds9)
})

bot.on('emojiDelete', async emoji => {
  let embedds0 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Emoji Silindi!`)
        .setThumbnail(emoji.guild.iconURL)
        .setDescription(`':${emoji.name}:' adlı emoji silindi!`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${emoji.guild.id}`)
    if (!emoji.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else emoji.guild.channels.get(membermodChannel).send(embedds0)
})

bot.on('roleCreate', async role => {
  let embedds0 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Rol Oluşturuldu!`)
        .setThumbnail(role.guild.iconURL)
        .setDescription(`'${role.name}' adlı rol oluşturuldu.`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${role.guild.id}`)
    if (!role.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else role.guild.channels.get(membermodChannel).send(embedds0)
})

bot.on('roleDelete', async role => {
  let embedds0 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Rol Silindi!`)
        .setThumbnail(role.guild.iconURL)
        .setDescription(`'${role.name}' adlı rol silindi.`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${role.guild.id}`)
    if (!role.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else role.guild.channels.get(membermodChannel).send(embedds0)
})

bot.on('guildMemberAdd', async member => {
  if (member.id !== `${owner}` && member.id !== `${talha}`) {
  }else{
  member.guild.owner.send(`<:NOTECHwow:464900244715470878> İşe bak! Kurucum sunucunuza katıldı.`)
  }
  });
bot.on('guildMemberAdd', async member => {

    let autoRole = await db.fetch(`autoRole_${member.guild.id}`)
    let memberChannel = await db.fetch(`memberChannel_${member.guild.id}`)
    let membermodChannel = await db.fetch(`membermodChannel_${member.guild.id}`)
    if (!autoRole || autoRole.toLowerCase() === 'none') console.log("autoRole")
    else {
        try {
            member.addRole(member.guild.roles.find('name', autoRole))
        } catch (e) {
            console.log("A guild tried to auto-role an invalid role to someone.")
        }
    }
    if (!member.guild.channels.get(memberChannel)) return console.log('memberChannel')
})

/*bot.on('guildMemberRemove', async member => {
    let memberChannel = await db.fetch(`memberChannel_${member.guild.id}`)
    if (!member.guild.channels.get(memberChannel)) return console.log('memberChannel')
				const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184528148725780/guildAdd.png");
				const userimg = await Jimp.read(member.avatarURL);
				var font;
				if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
				else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
				else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
				await bg.print(font, 430, 170, member.user.tag);
        await userimg.resize(362, 362);
        await bg.composite(userimg, 43, 26).write("./img/remove/"+ member.user.id + ".png");
				  setTimeout(function () {
						member.guild.channels.get(memberChannel).send(new Discord.Attachment("./img/remove/" + member.user.id + ".png"));
				  }, 1000);
				  setTimeout(function () {
					fs.unlink("./img/remove/" + member.id + ".png");
				  }, 10000);
})*/

 bot.on("guildMemberAdd", async member => {
    let memberChannel = await db.fetch(`memberChannel_${member.guild.id}`)
    if (!member.guild.channels.get(memberChannel)) return console.log('memberChannel')
		let username = member.user.username;
		if (member.guild.channels.get(memberChannel) === undefined || member.guild.channels.get(memberChannel) === null) return;
		if (member.guild.channels.get(memberChannel).type === "text") {
			const bg = await Jimp.read("https://cdn.discordapp.com/attachments/458732340491845633/473591102172168192/guildAdd.png");
			const userimg = await Jimp.read(member.user.avatarURL);
			var font;
			if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
			else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
			else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
			await bg.print(font, 430, 170, member.user.tag);
			await userimg.resize(362, 362);
			await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
			  setTimeout(function () {
					member.guild.channels.get(memberChannel).send(new Discord.Attachment("./img/" + member.id + ".png"));
			  }, 1000);
			  setTimeout(function () {
				fs.unlink("./img/" + member.id + ".png");
			  }, 10000);
		}
	})

  bot.on("guildMemberRemove", async member => {
    let memberChannel = await db.fetch(`memberChannel_${member.guild.id}`)
    if (!member.guild.channels.get(memberChannel)) return console.log('memberChannel')
		let username = member.user.username;
		if (member.guild.channels.get(memberChannel) === undefined || member.guild.channels.get(memberChannel) === null) return;
		if (member.guild.channels.get(memberChannel).type === "text") {
			const bg = await Jimp.read("https://cdn.discordapp.com/attachments/458732340491845633/473591115526701056/guildRemove.png");
			const userimg = await Jimp.read(member.user.avatarURL);
			var font;
			if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
			else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
			else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
			await bg.print(font, 430, 170, member.user.tag);
			await userimg.resize(362, 362);
			await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
			  setTimeout(function () {
					member.guild.channels.get(memberChannel).send(new Discord.Attachment("./img/" + member.id + ".png"));
			  }, 1000);
			  setTimeout(function () {
				fs.unlink("./img/" + member.id + ".png");
			  }, 10000);
		}
	})

bot.login(process.env.YARRAK);
/*
// EMRE
// Sqlite Modülü
const SQLite = require( "better-sqlite3" );
const sql = new SQLite( './data3.sqlite' );
// Ayarlar
  let minXP = 1;
  let maxXP = 1;
  let minPara = 50;
  let maxPara = 50;
  let levelZorluk = 10;
  let dailyTime = 1000 * 60 * 60 * 23; // ms * sec * min * hour (23 saatte bir)
// BOT ilk çalıştığında
bot.on( "ready", () => {
  
  // Tabloyu Çek
  const table = sql.prepare( "SELECT count(*) FROM sqlite_master WHERE type = 'table' AND name = 'database';" ).get();
  
  // Tablo Boş ise
  if ( !table[ 'count(*)' ] ) {
	
	  // Tabloyu oluştur
    sql.prepare( "CREATE TABLE database ( id TEXT PRIMARY KEY, level INTEGER, xp INTEGER, para INTEGER, daily_last INTEGER );" ).run();
    
    // Id index yap
    sql.prepare( "CREATE UNIQUE INDEX index_id ON database (id);" ).run();
    
	  // Senkronize Çalıştır
    sql.pragma( "synchronous = 1" );
    sql.pragma( "journal_mode = wal" );
    
  }
  // Getter Setter ları ayarla
  bot.getData = sql.prepare( "SELECT * FROM database WHERE id = ?" );
  bot.setData = sql.prepare( "INSERT OR REPLACE INTO database ( id, level, xp, para, daily_last ) VALUES ( @id, @level, @xp, @para, @daily_last );" );
  
} );
bot.on("message", message => {
  // Bot ve DM Kontrolü
  if ( message.author.bot ) return;
  if ( message.content.type === "DM" ) return;
  
  // Kullanıcı ve Sunucu
  let user = message.author;
  let guild = message.guild;
  // Şuanki Zaman (ms) (Zamanla ilgili bişi yaparsan lazım olur belki)
  let currTime = new Date().getTime();
  
  // Normal Mesaj
  
    // Kullanıcı verisini çek
    let data = bot.getData.get( user.id );
    // Kullanıcı verisi boş ise
    if ( !data ) {
      // Başlangıç verilerini yerleştir
      data = {
        id: user.id,
        level: 0,
        xp: 0,
        para: 0,
        daily_last: 0
      }
    }
    // Rasgele Gelir Üret
    let earnXP = getRandomInt( minXP, maxXP );
    // Geliri Kaydet
    data.xp = data.xp + earnXP;
     // Seviye Kontrolü
    let nextLevel = Math.floor( Math.sqrt( data.xp ) / levelZorluk );
    if (nextLevel > data.level) {
      data.level = nextLevel;
      message.channel.send(`:up: | Tebrikler, ${user}! **Seviye ${data.level}** oldunuz!`);
    } else {
      data.level = nextLevel;
    }
  
    // Güncelle
    bot.setData.run( data );
  
  // ---
  
  // KOMUTLAR
  if ( message.content.indexOf( prefix ) !== 0 ) return;
  
  // Argümanlar
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // PROFİL
  if ( command === "profil2" ) {
    
    // MESAJI SİL
    message.delete();
    
    // Mention atılmış ise
    if ( message.mentions.users.first() && !message.mentions.users.first().bot ) {
      user = message.mentions.users.first();
      data = bot.getData.get( user.id );
      if ( !data ) return;
    }
    
    // Tecrübe Barı Oluşturma
    let leftXP = ( ( (data.level+1) * levelZorluk ) * ( (data.level+1) * levelZorluk ) ) - data.xp;
    let nextXP = ( ( (data.level+1) * levelZorluk ) * ( (data.level+1) * levelZorluk ) ) - ( ( (data.level) * levelZorluk ) * ( (data.level) * levelZorluk ) );
    let currXP = nextXP - leftXP;
    
    // Kalan günlük süre
    let kalan = Math.floor( ( (data.daily_last + dailyTime) - currTime ) );
    
    // Günlük alınabilir mi
    if ( kalan <= 0 ) {
      kalan = `Günlük Ödül Alınabilir`;
    } else {
      kalan = `**${msToTime(kalan)}** sonra günlük ödül alınabilir.`;
    }
    
    // Profil Kartı Oluşturma
    const profile = new Discord.RichEmbed()
      .setTitle( "" )
      .setAuthor( user.username +  ` | PROFİL`, user.avatarURL )
      .setDescription( ``
                      +`**LEVEL:** ${data.level} \n`
                      +`**TOTAL XP:** ${data.xp} \n`
                      +`**PARA:** ${data.para} \n\n`
                      +`**XP:** ${currXP}/${nextXP} \n\n`
                      +`${kalan}\n` )
      .setColor( 0x00AE86 );
    
    // Profil Kartını Gönder
    return message.channel.send( profile );
    
  }
  // ---
  
  // SIRALAMA
  if ( command === "sıralama" ) {
    // Hepsini seç levele göre sırala ilk 10'u seç
    const top10 = sql.prepare("SELECT * FROM database ORDER BY level DESC LIMIT 10;").all();
    // Sıralama Tablosu Oluşturma
    const ranking = new Discord.RichEmbed()
      .setTitle( "Sıralama")
      .setAuthor( "SIRALAMA", bot.user.avatarURL )
      .setDescription( "" )
      .setColor( 0x00AE86 );
    // Sıralama Tablosuna Kullanıcıları Ekle
    let i = 0;
    for ( const forData of top10 ) {
      i++;
      ranking.addField( `${i}. ` + bot.users.get( forData.id ).username, `Seviye: ${forData.level}` );
    }
    // Sıralama Tablosunu Gönder
    return message.channel.send( ranking );
  }
  // ---
  
  // GÜNLÜK GELİR
  if ( command === "günlük" ) {
    
    // Son Günlük alma zamanı kontrolü
    if ( data.daily_last + dailyTime < currTime ) {
       // Son günlük alma süresini ayarla
      data.daily_last = currTime;
      
      // Rasgele Para Üret
      let earnPara = getRandomInt( minPara, maxPara );
      
      // Parayı kaydet
      data.para = data.para + earnPara;
      
      // Güncelle
      bot.setData.run( data );
      
      // Bildirim Gönder
      return message.channel.send( `${user} günlük ödülünüz **${earnPara} TL**!` );
      
    } else {
      
      // Kalan süre hesapla
      let kalan = Math.floor( ( (data.daily_last + dailyTime) - currTime ) );
      
      // Bildirim Gönder
      return message.channel.send( `${user} günlük ödülünüze kalan süre **${msToTime(kalan)}**!` );
      
    }
    
  }
  // ---
  
} );
function getRandomInt( min, max ) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}
function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  return hours + " saat " + minutes + " dakika";
}
*/
