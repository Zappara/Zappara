const Discord = require('discord.js');
const bot = new Discord.Client();
const Manager = new Discord.ShardingManager('./index.js');
Manager.spawn(3);

Manager.on('launch', function(shard) {
	console.log(`SHARD ${shard.id}: Aktif.`);
});

const express = require('express');
const app = express();

app.get('/status', async (req, res) => {
  return res.end('OK');
});

app.listen(1000);
