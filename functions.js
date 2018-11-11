module.exports = {
  
    embed: function(channel, title, authorname, authoravatar, color, thumbnail, timer) {
      var colour = color || 0xdbafc6; 
      channel = channel.channel || channel;
      channel.send({embed:{
        title: title,
        author : { "name" : `${authorname}`, "icon_url" : `${authoravatar}}`},
        thumbnail: { "url": thumbnail },
        color: colour
      }}).then(msg => {
        if (!isNaN(timer)) {msg.delete({timeout: timer})};
      })
    }
  
}
