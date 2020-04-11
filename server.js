const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://hyperbot-x.glitch.me/`);
}, 280000);

const { Client, RichEmbed } = require("discord.js");
var { Util } = require("discord.js");
const db = require("quick.db");
const { TOKEN, YT_API_KEY, prefix, devs } = require("./config.js");
const client = new Client({ disableEveryone: true });
const ytdl = require("ytdl-core");
const Enmap = require("enmap");
const canvas = require("canvas");
const convert = require("hh-mm-ss");
const fetchVideoInfo = require("youtube-info");
const dbg = new Enmap({ name: "MeKing" });
const botversion = require("./package.json").version;
const simpleytapi = require("simple-youtube-api");
const moment = require("moment");
const fs = require("fs");
const util = require("util");
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const r1 = require("snekfetch");
const jimp = require("jimp");
const { get } = require("snekfetch");
const guild = require("guild");
const dateFormat = require("dateformat"); //npm i dateformat
const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyC-cxrwR4E2lizvODfupRtCIFht7taB_FM");
const hastebins = require("hastebin-gen");
const getYoutubeID = require("get-youtube-id");
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const pretty = require("pretty-ms");
client.login(TOKEN);
const queue = new Map();
var table = require("table").table;
const Discord = require("discord.js");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`Channels! [ " ${client.channels.size} " ]`);
  console.log(`Prefix! [ " ${prefix}" ]`);
  console.log(`Language! [ " JavaScript " ]`);
  console.log(
    `Ram Usage! [ " ${(process.memoryUsage().rss / 1048576).toFixed()}MB " ]`
  );

  client.user.setActivity(`$help`, { type: "Playing" });
});

client.on("message", m => {
  if (m.content === "$help") {
    let Commands = "https://ermex-bot.glitch.me/commands.html";
    var addserver =
      "https://discordapp.com/api/oauth2/authorize?client_id=693168679059456000&permissions=8&scope=bot";
    var SUPPORT = "https://discord.gg/DmuwRDj";
    let embed = new Discord.RichEmbed().setTitle(` HyperBot `)
.setColor(`#ffff`)
      .setDescription(`                      
If you use the bot in the wrong things that are not correct,
 then we will not hesitate to remove the bot from your server
 and your ban is final from using the bot.

                                                                                         
**[Add To Your Server ](${addserver})**    
**[Commands](${Commands})**
**[ Server Support](${SUPPORT})**`);
    m.react("✨");
    m.author.send(embed);
  }
});

client.on("message", async message => {
  var prefix = "$";
  if (message.content.startsWith(prefix + "help")) {
    let helper = new Discord.RichEmbed()
      .setColor("#ffff")

      .setThumbnail(message.author.avatarURL)
      .setDescription(
        "**Public \n `credits` `daily` `avatar` `invites` `report`  `new` `ping` \n\n Modaretion \n `ban` `kick` `unban` `clear` `say` `close` `role`  `mute` `unmute`\n\n Music \n `play` `skip` `stop` `vol` `np` `queue` `pause` `resume` \n\n Protection \n `antihack` `antispam`\n\n Special \n `Soon` \n\n Music Moderator Commands \n `Soon` **"
      );

    message.channel.sendEmbed(helper);
  }
});



client.on('message', function(message) {
    if(!message.channel.guild) return;
    if (message.author.bot) return;
    if (message.author.id === client.user.id) return;
    if (message.author.equals(client.user)) return;
    if (!message.content.startsWith(prefix)) return;
    
    var args = message.content.substring(prefix.length).split(' ');
    switch (args[0].toLocaleLowerCase()) {
    case "clear" :
    message.delete()
    if(!message.channel.guild) return
    if(message.member.hasPermission(0x2000)){ if (!args[1]) {
    message.channel.fetchMessages()
    .then(messages => {
    message.channel.bulkDelete(messages);
    var messagesDeleted = messages.array().length;
    message.channel.sendMessage(' '+ "```javascript\n" + messagesDeleted + " " +  'messages have been deleted.' + "```").then(m => m.delete(5000));
    })
    } else {
    let messagecount = parseInt(args[1]);
    message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
    message.channel.sendMessage(' '+ "```javascript\n" + args[1] + " " +  'messages have been deleted.' + "```").then(m => m.delete(5000));
    message.delete(60000);
    }
    } else {
    var manage = new Discord.RichEmbed()
    .setDescription('You Do Not Have Permission MANAGE_MESSAGES')
    .setColor("#ffff")
    message.channel.sendEmbed(manage)
    return;
    }
    }
    });


client.on("message", message => {
  var prefix = "$";
  if (message.content.startsWith(prefix + "servers")) {
    let msg = client.guilds
      .map(guild => `**${guild.name}** Members Count : ${guild.memberCount} `)
      .join("\n");
    let embed = new Discord.RichEmbed()
      .setTitle(` Servers ${client.guilds.size}  `)
      .setDescription(`${msg}`)
      .setColor("RANDOM");
    message.channel.send(embed);
  }
});



client.on("guildMemberAdd", member => {
  var role = member.guild.roles.find("name", "Members");
  member.addRole(role);
});

client["on"]("message", message => {
  if (message["author"]["bot"]) return undefined;
  let args = message["content"]["split"]("$kick");
  if (message["content"]["startsWith"](prefix + "kick")) {
    if (!message["member"]["hasPermission"]("MANAGE_GUILD"))
      return message["channel"].send(
        `**<a:X1:688734748276817929> Error | You Not Have Permission**`
      );
    let user = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[1])
    );
    if (!user)
      return message["channel"]["send"](
        "<a:X1:688734748276817929>** Error | $kick ID-Member or Mention Member**"
      );
    let Reason = message["content"]
      ["split"](" ")
      .slice(2)
      .join(" ");
    if (!Reason)
      return message["channel"]["send"](
        `**Type The reason <a:X1:688734748276817929>**`
      );
    message.guild.member(user).kick(Reason);
    message["channel"]["send"](
      `**<a:Check:695325205488336927> Has Been Kicked <@${user.id}> Reason: \${Reason}\**`
    );
  }
});

client["on"]("message", message => {
  var prefix = "$";
  if (message["author"]["bot"]) return undefined;
  let args = message["content"]["split"](" ");
  if (message["content"]["startsWith"](prefix + "ban")) {
    if (!message["member"]["hasPermission"]("MANAGE_GUILD"))
      return message["channel"].send(
        `**<a:X1:688734748276817929>| You Not Have Permission**`
      );
    let user = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[1])
    );
    if (!user)
      return message["channel"]["send"](
        `**<a:X1:688734748276817929> Error | ${prefix}ban ID-Member or Mention Member**`
      );
    let Reason = message["content"]
      ["split"](" ")
      .slice(2)
      .join(" ");
    if (!Reason)
      return message["channel"]["send"](
        `**Type The reason <a:X1:688734748276817929>**`
      );
    message.guild.member(user).ban(Reason);
    message["channel"]["send"](
      `**<a:Check:695325205488336927> Has Been Banned<@${user.id}> Reason: \`${Reason}\`**`
    );
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content === prefix + "Emojis") {
    message.channel.sendMessage(`
<a:overify:688707812225712152>              <a:bc:688710946981806104>              <a:no:688711030364176486>              <a:yes:688710968821547010>
<a:Really:688728781522993218>              <a:nitro:688728775801962518>              <a:wtf:688728780776538164>              <a:yeee:688728778356162628>
<a:RinCaT:688728778289315853>              <a:wow:688728778175676437>              <a:Rainbow:688728776519057468>              <a:Orangejust:688728776162541640>
<a:cryr:688728772589125731>              <a:dumb:688728773084053554>              <a:craft:688728772639195290>              <a:heartss:689024205584728095>
<a:FortSteve:688728775185137666>              <a:Gun:688728774103400674>              <a:eate:688728774099075169>              <a:Dance1:688728774174310569>
<a:shet:688728780436668540>              <a:Pin:688728775789379705>              <a:gifwin:688728774245744677>              <a:mad:688728775181336587> 
<a:left:688728774904250570>              <a:X1:688734748276817929>              <a:Check:688734712294015082>              <a:warn:688734871660527753>
<a:ofu:688790982375899157>              <a:need:688791009706115077>              <a:LOL:688791083337252930>              <a:heartr:689024243991969872>`);
  }
});

client.on("message", async msg => {
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;
  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);
  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);
  if (command === `play`) {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.send(
        "**<a:X1:688734748276817929> Error |Your Must Be In Voice Channel**"
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send(
        "*im Not Have a Permissions <a:X1:688734748276817929>**"
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.send(
        "**im Not Have a Permissions <a:X1:688734748276817929>**"
      );
    }

    if (!permissions.has("EMBED_LINKS")) {
      return msg.channel.sendMessage(
        "**EMBED LINKS Must be Permissions <a:X1:688734748276817929>**"
      );
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();

      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, msg, voiceChannel, true);
      }
      return msg.channel.send(
        `**${playlist.title}** Added in The list <a:Check:695325205488336927>**`
      );
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 3);
          let index = 0;
          const embed1 = new Discord.RichEmbed()
            .setDescription(
              `**YouTube-Searchs!  <a:warn:695325207698866177>**${videos
                .map(video2 => `[**${++index}**]\`${video2.title}\``)
                .join("\n")}`
            )

            .setFooter("ErmexBot");
          msg.channel.sendEmbed(embed1).then(message => {
            message.delete(20000);
          });

          try {
            var response = await msg.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                maxMatches: 1,
                time: 15000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return msg.channel.send("**No track was selected**");
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.send(
            "**<a:X1:688734748276817929> No search results available** "
          );
        }
      }

      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === `skip`) {
    if (!msg.member.voiceChannel)
      return msg.channel.send("**You are not an VoiceChannel**.");
    if (!serverQueue)
      return msg.channel.send("**There is no clip to skip it**");
    serverQueue.connection.dispatcher.end(
      "Skpied <a:Check:695325205488336927>"
    );
    return undefined;
  } else if (command === `stop`) {
    if (!msg.member.voiceChannel)
      return msg.channel.send("You are not an VoiceChannel .");
    if (!serverQueue) return msg.channel.send("**No clip to stop**");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end(
      "تم إيقاف المقطع <a:Check:695325205488336927>"
    );
    return undefined;
  } else if (command === `vol`) {
    if (!msg.member.voiceChannel)
      return msg.channel.send(
        "**You are not an VoiceChannel <a:X1:688734748276817929>**."
      );
    if (!serverQueue)
      return msg.channel.send(
        "**There is nothing operational. <a:X1:688734748276817929>**"
      );
    if (!args[1])
      return msg.channel.send(
        `:loud_sound: **Sound level** **${serverQueue.volume}**`
      );
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);
    return msg.channel.send(
      `:speaker: <a:overify:688707812225712152> **${args[1]}**`
    );
  } else if (command === `np`) {
    if (!serverQueue)
      return msg.channel.send(
        "**There is nothing current to do. <a:X1:688734748276817929>**"
      );
    const embedNP = new Discord.RichEmbed().setDescription(
      `:notes: الان يتم تشغيل : **${serverQueue.songs[0].title}**`
    );
    return msg.channel.sendEmbed(embedNP);
  } else if (command === `queue`) {
    if (!serverQueue)
      return msg.channel.send(
        "**There is nothing current to do**. <a:X1:688734748276817929>"
      );
    let index = 0;

    const embedqu = new Discord.RichEmbed().setDescription(`**Songs Queue**
${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join("\n")}
**الان يتم تشغيل** ${serverQueue.songs[0].title}`);
    return msg.channel.sendEmbed(embedqu);
  } else if (command === `pause`) {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.send("**Stoped The Song :notes:**!");
    }
    return msg.channel.send("**There is nothing current to do**");
  } else if (command === "resume") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.send("**Music resumed for you!**");
    }
    return msg.channel.send("**There is nothing current to do**");
  }

  return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  console.log(video);

  //	console.log('yao: ' + Util.escapeMarkdown(video.thumbnailUrl));
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`i Can't Join This Voice Channel: ${error}`);
      queue.delete(msg.guild.id);
      return msg.channel.send(`**I can't Join**${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    else
      return msg.channel.send(
        ` **${song.title}****Added in The Song list <a:Check:695325205488336927>**`
      );
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", reason => {
      if (reason === "Stream is not generating quickly enough.")
        console.log("Song Has Been Ended.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.send(`Start :notes: : **${song.title}**`);
}
const adminprefix = "$";

client.on("message", message => {
  var argresult = message.content
    .split(` `)
    .slice(1)
    .join(" ");
  if (!devs.includes(message.author.id)) return;

  if (message.content.startsWith(adminprefix + "setname")) {
    client.user.setUsername(argresult).then;
    message.channel.sendMessage(
      `**${argresult}** :<a:overify:688707812225712152> تم تغيير أسم البوت إلى`
    );
    return message.reply(
      "**لا يمكنك تغيير الاسم يجب عليك الانتظآر لمدة ساعتين **"
    );
  } else if (message.content.startsWith(adminprefix + "setavatar")) {
    client.user.setAvatar(argresult);
    message.channel.sendMessage(
      `**${argresult}** : <a:overify:688707812225712152>تم تغير صورة البوت`
    );
  }
});

client.on("message", async message => {
  var prefix = "$";
  if (!message.guild || message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(prefix + "bc")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    message.channel
      .send(
        " **[A] All Members <a:bc:688710946981806104>  \n[B] Online Members <a:bc:688710946981806104>  \n[C] For Roles <a:bc:688710946981806104>  \n[X] Closed  :lock:**"
      )
      .then(m => {
        message.channel
          .awaitMessages(msg => msg.author.id === message.author.id, {
            max: 1,
            time: 1000 * 60 * 2,
            errors: ["time"]
          })
          .then(c => {
            if (c.first().content === "A") {
              message.guild.members.forEach(m => {
                m.send(`${args}\n`).catch(err => {
                  if (err) throw err;
                });
              });
              c.first().delete();
              m.delete();
              message.channel.send(
                "**Successfuly Shared <a:Check:688734712294015082> **"
              );
            }
            if (c.first().content === "B") {
              message.guild.members
                .filter(m => m.presence.status !== "offline")
                .forEach(m => {
                  m.send(`${args}\n`).catch(err => {
                    if (err) throw err;
                  });
                });
              c.first().delete();
              m.delete();
              message.channel.send(
                "**Successfuly Shared <a:Check:688734712294015082> **"
              );
            }
            if (c.first().content == "X") {
              c.first().delete();
              m.delete();
              message.channel.send(
                "**Successfuly Shared <a:Check:688734712294015082> **"
              );
            }
            if (c.first().content === "X") {
              m.edit("**Type The Role Name**").then(ms => {
                message.channel
                  .awaitMessages(msg => msg.author.id === message.author.id, {
                    max: 1,
                    time: 1000 * 60 * 2,
                    errors: ["time"]
                  })
                  .then(c => {
                    let role = message.guild.roles.find(
                      role => role.name === c.first().content
                    );
                    if (!role)
                      return message.channel
                        .send(
                          "**<a:X1:688734748276817929> Can't Find Role <a:X1:688734748276817929>**"
                        )
                        .then(() => {
                          ms.delete();
                          c.first().delete();
                        });
                    let roleID = role.id;
                    message.guild.roles.get(roleID).members.forEach(m => {
                      m.send(`${args}\n`).catch(err => {
                        if (err) throw err;
                      });
                    });
                    c.first().delete();
                    m.delete();
                    message.channel.send(
                      "**Successfuly Shared <a:Check:688734712294015082> **"
                    );
                  });
              });
            }
          })
          .catch(() => m.delete());
      });
  } else if (message.content.startsWith(prefix + "setname")) {
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.author.id === "") return;
    client.user.setUsername(args);
    message.channel.send(`Successfuly Changeed To..**${args}** `);
  } else if (message.content.startsWith(prefix + "setavatar")) {
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.author.id === "") return;
    client.user.setAvatar(args).catch(err => message.reply("send a valid url"));
    message.channel.send(`**Successfuly Changeed To ${args}** `);
  }
});

const Canvas = require("canvas");
const credits = JSON.parse(fs.readFileSync("./credits.json"));
var time = require("./time.json");
client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  let args = message.content.split(" ");
  let author = message.author.id;
  if (!credits[author])
    credits[author] = {
      credits: 0
    };
  fs.writeFileSync("./credits.json", JSON.stringify(credits, null, 4));
  if (
    args[0].toLowerCase() == `$credits` ||
    args[0].toLowerCase() == `$فلوس` ||
    args[0].toLowerCase() == `فلوس` ||
    args[0].toLowerCase() === `c`
  ) {
    const mention = message.mentions.users.first() || message.author;
    const mentionn = message.mentions.users.first();
    if (!args[2]) {
      message.channel.send(
        `**:bank: | ${mention.username}, your account balance is \`$${credits[mention.id].credits}\`**`
      );
    } else if (mentionn && args[2]) {
      if (isNaN(args[2]))
        return message.channel.send(
          `** :interrobang: | ${message.author.username}, i can't find it!**`
        );
      if (args[2] < 1)
        return message.channel.send(
          `** :interrobang: | ${message.author.username}, type the credit you need to transfer!**`
        );
      if (mention.bot)
        return message.channel.send(
          `**:thinking: | ${message.author.username}, bots do not have credits**`
        );
      if (mentionn.id === message.author.id)
        return message.channel.send(
          `**:interrobang: | ${message.author.username}, I can't find User **`
        );
      if (args[2] > credits[author].credits)
        return message.channel.send(
          `**:thinking: | ${message.author.username}, Your balance is not enough for that!**`
        );
      if (args[2].includes("$"))
        return message.channel.send(
          `**:interrobang: | ${message.author.username}, type the credit you need to transfer!**`
        );
      let tax = Math.floor(args[2] * (0 / 100));
      let first = Math.floor(Math.random() * 10);
      let second = Math.floor(Math.random() * 10);
      let third = Math.floor(Math.random() * 10);
      let fourth = Math.floor(Math.random() * 10);
      let num = `${first}${second}${third}${fourth}`;
      let canvas = Canvas.createCanvas(100, 50);
      let ctx = canvas.getContext("2d");
      let Price = message.content.split(" ")[2];
      let resulting = Math.floor(Price - Price * (0 / 100));
      const background = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/365219235288317962/656362038884565014/captcha.png"
      );
      ctx.drawImage(background, 6, 3, canvas.width, canvas.height);
      ctx.font = "25px Tahoma";
      ctx.fontSize = "10px";
      ctx.fillStyle = "White";
      message.delete();
      message.channel
        .send(
          `**${message.author.username}, Transfer Fees \`${tax}\`, Amount :\`${resulting}\` **
   type these numbers to confirm : `
        )
        .then(m => {
          ctx.fillText(num, canvas.width / 4.8, canvas.height / 1.5);
          message.channel.sendFile(canvas.toBuffer()).then(s => {
            message.channel
              .awaitMessages(r => r.author.id === message.author.id, {
                max: 1,
                time: 20000,
                errors: ["time"]
              })

              .then(collected => {
                if (collected.first().content === num) {
                  message.channel.send(
                    `**:moneybag: | ${message.author.username}, has transferred \`$${resulting}\` to ${mentionn}**`
                  );
                  m.delete();
                  s.delete();
                  mention.send(
                    `**:atm: | Transfer Receipt**\`\`\`You Have Received \$${resulting}\ From User ${message.author.username}; (ID ${message.author.id})\`\`\``
                  );
                  m.delete();
                  s.delete();

                  credits[author].credits += Math.floor(-resulting);
                  credits[mentionn.id].credits += Math.floor(+resulting);
                  fs.writeFileSync(
                    "./credits.json",
                    JSON.stringify(credits, null, 4)
                  );
                } else {
                  m.delete();
                }
              });
          });
        });
    }
  }

  if (
    args[0].toLowerCase() === `${prefix}daily` ||
    args[0].toLowerCase() === `d`
  ) {
    let cooldown = 8.64e7;
    let Daily = time[message.author.id];
    if (Daily !== null && cooldown - (Date.now() - Daily) > 0) {
      let times = cooldown - (Date.now() - Daily);
      message.channel.send(
        `**:rolling_eyes: | ${
          message.author.username
        }, your daily credits refreshes in ${pretty(times, {
          verbose: true
        })}.**`
      );
      fs.writeFile("./time.json", JSON.stringify(time), function(e) {
        if (e) throw e;
      });
    } else {
      let ammount = (2000, 1004, 842, 395, 305, 471, 1743, 583, 540, 492);
      credits[author].credits += ammount;
      time[message.author.id] = Date.now();
      message.channel.send(
        `**:moneybag: ${message.author.username}, You got :dollar: ${ammount} daily credits!**`
      );
      fs.writeFile("./credits.json", JSON.stringify(credits), function(e) {
        if (e) throw e;
      });
    }
  }
});

const antihack = JSON.parse(fs.readFileSync("./hack.json", "utf8"));
client.on("message", message => {
  if (message.content.startsWith(prefix + "antihack")) {
    if (!message.channel.guild)
      return message.reply(
        "**This Command Only For Servers <a:X1:688734748276817929>**"
      );
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!antihack[message.guild.id])
      antihack[message.guild.id] = {
        onoff: "Off"
      };
    if (antihack[message.guild.id].onoff === "Off")
      return [
        message.channel.send(`**AntiHack On <a:yes:688710968821547010>**`),
        (antihack[message.guild.id].onoff = "On")
      ];
    if (antihack[message.guild.id].onoff === "On")
      return [
        message.channel.send(`**AntiHack Off <a:no:688711030364176486>**`),
        (antihack[message.guild.id].onoff = "Off")
      ];
    fs.writeFile("./hack.json", JSON.stringify(antihack), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});

let banse = new Set();
let bane = JSON.parse(fs.readFileSync("./protection.json", "utf8"));
client.on("guildBanAdd", function(guild) {
  guild.fetchAuditLogs().then(logs => {
    const ser = logs.entries.first().executor;
    if (!bane[ser.id + guild.id])
      bane[ser.id + guild.id] = {
        bans: 2
      };
    if (antihack[guild.guild.id].onoff === "Off") return;
    let boner = bane[ser.id + guild.id];
    banse.add(ser.id);
    boner.bans = Math.floor(boner.bans + 1);

    setTimeout(() => {
      boner.bans = 2;
      banse.delete(ser.id);
    }, 8000);

    if (boner.bans > 2) {
      let roles = guild.members.get(ser.id).roles.array();
      guild.members.get(ser.id).removeRoles(roles);
    }
  });
  fs.writeFile("./protection.json", JSON.stringify(bane), err => {
    if (err) console.error(err);
  });
});
client.on("guildMemberRemove", u => {
  u.guild.fetchAuditLogs().then(s => {
    var ss = s.entries.first();
    if (ss.action == `MEMBER_KICK`) {
      if (!data[ss.executor.id]) {
        data[ss.executor.id] = {
          time: 1
        };
        if (antihack[u.guild.id].onoff === "Off") return;
      } else {
        data[ss.executor.id].time += 1;
      }
      if (antihack[u.guild.id].onoff === "Off") return;
      data[ss.executor.id].time = 0;
      u.guild.members.get(ss.executor.id).roles.forEach(r => {
        r.edit({
          permissions: []
        });
        data[ss.executor.id].time = 0;
      });
      setTimeout(function() {
        if (data[ss.executor.id].time <= 3) {
          data[ss.executor.id].time = 0;
        }
      });
    }
  });
  const data = require("./protection2.json");
});
client.on("roleDelete", u => {
  u.guild.fetchAuditLogs().then(s => {
    var ss = s.entries.first();
    if (ss.action == `ROLE_DELETE`) {
      if (!data[ss.executor.id]) {
        data[ss.executor.id] = {
          time: 1
        };
        if (antihack[u.guild.id].onoff === "Off") return;
      } else {
        data[ss.executor.id].time += 1;
      }
      if (antihack[u.guild.id].onoff === "Off") return;

      data[ss.executor.id].time = 0;
      u.guild.members.get(ss.executor.id).roles.forEach(r => {
        r.edit({
          permissions: []
        });
        data[ss.executor.id].time = 0;
      });
      setTimeout(function() {
        if (data[ss.executor.id].time <= 3) {
          data[ss.executor.id].time = 0;
        }
      }, 60000);
    }
  });
  const data = require("./protection2.json");
});
client.on("channelDelete", u => {
  u.guild.fetchAuditLogs().then(s => {
    var ss = s.entries.first();
    if (ss.action == `CHANNEL_DELETE`) {
      if (!data[ss.executor.id]) {
        data[ss.executor.id] = {
          time: 1
        };
        if (antihack[u.guild.id].onoff === "Off") return;
      } else {
        data[ss.executor.id].time += 1;
      }
      if (antihack[u.guild.id].onoff === "Off") return;
      data[ss.executor.id].time = 0;
      u.guild.members.get(ss.executor.id).roles.forEach(r => {
        r.edit({
          permissions: []
        });
        data[ss.executor.id].time = 0;
      });
      setTimeout(function() {
        if (data[ss.executor.id].time <= 3) {
          data[ss.executor.id].time = 0;
        }
      });
    }
  });
  const data = require("./protection2.json");
});

client.on("message", async message => {
  var prefix = "$";
  if (message.content == prefix + "invites") {
    let oi = message.mentions.users.first()
      ? message.mentions.users.first().id
      : message.author.id;
    let Tag = message.mentions.users.first()
      ? message.mentions.users.first().tag
      : message.author.tag;
    let Username = message.mentions.users.first()
      ? message.mentions.users.first().username
      : message.author.username;
    let Avatar = message.mentions.users.first()
      ? message.mentions.users.first().avatarURL
      : message.author.avatarURL;

    message.guild.fetchInvites().then(invs => {
      let member = client.guilds.get(message.guild.id).members.get(oi);
      let personalInvites = invs.filter(i => i.inviter.id === oi);
      let urll = invs.filter(i => i.inviter.id === oi);
      let link = urll.reduce(
        (p, v) => v.url + ` , Total invitations ${v.uses}.\n` + p,
        `\nServidor: ${message.guild.name} \n `
      );
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
      let inviteCode = personalInvites.reduce((p, v) => v.code);
      let possibleInvites = [["Total invitations:"]];
      possibleInvites.push([inviteCount, inviteCode]);
      let user = message.mentions.users.first() || message.author;
      let mem = message.guild.member(user);
      let millisJoined = new Date().getTime() - mem.joinedAt.getTime();
      let daysJoined = millisJoined / 1000 / 60 / 60 / 24;

      var inviteInfo = new Discord.RichEmbed()
        .setTitle(`invites-info [ ${user.tag} ]`)
        .setThumbnail(client.user.avatarURL)
        .setDescription(
          `** Total your invites [ **${Number(inviteCount)}** ]
          } **`
        )
        .setFooter(Tag, Avatar);

      message.channel.send(inviteInfo);
    });
  }
});

const antispam = JSON.parse(fs.readFileSync("./antispam.json", "utf8"));

client.on("message", async message => {
  var prefix = "$";
  if (antispam[message.author.id] == undefined) {
    antispam[message.author.id] = {
      lastmessage: "none"
    };
    fs.writeFile("./antispam.json", JSON.stringify(antispam), function(err) {
      if (err) throw err;
    });
  } else if (antispam[message.guild.id] == undefined) {
    antispam[message.guild.id] = {
      onoff: "off"
    };
    fs.writeFile("./antispam.json", JSON.stringify(antispam), function(err) {
      if (err) throw err;
    });
  }
  let args = message.content.split(" ");
  let command = args[0];
  if (command === prefix + "antispam") {
    if (args[1] === "on") {
      antispam[message.guild.id].onoff = "on";
      fs.writeFile("./antispam.json", JSON.stringify(antispam), function(err) {
        if (err) throw err;
      });
      message.channel.send("**AntiSpam On <a:yes:688710968821547010>**");
    } else if (args[1] === "off") {
      antispam[message.guild.id].onoff = "off";
      fs.writeFile("./antispam.json", JSON.stringify(antispam), function(err) {
        if (err) throw err;
      });
      message.channel.send("**AntiSpam Off <a:no:688711030364176486>**");
    }
  }
});

client.on("message", async message => {
  if (antispam[message.author.id] == undefined) {
    antispam[message.author.id] = {
      lastmessage: "none"
    };
    fs.writeFile("./antispam.json", JSON.stringify(antispam), function(err) {
      if (err) throw err;
    });
  } else if (antispam[message.guild.id] == undefined) {
    antispam[message.guild.id] = {
      onoff: "off"
    };
    fs.writeFile("./antispam.json", JSON.stringify(antispam), function(err) {
      if (err) throw err;
    });
  } else if (antispam[message.author.id].lastmessage === "none") {
    return;
  } else if (antispam[message.author.id].lastmessage === message.content) {
    return message.delete();
  }

  antispam[message.author.id].lastmessage = message.content;
  fs.writeFile("./antispam.json", JSON.stringify(antispam), function(err) {
    if (err) throw err;
  });
});

client.on("message", message => {
  if (message.content.toLowerCase().startsWith(`discord.gg`)) {
    message.member.addRole(message.guild.roles.find("name", "Muted"));
    var embed = new Discord.RichEmbed().setDescription(
      `You Has Been Muted \n Reason: Shared Links <a:2_:695326337354825758>`
    );
    message.delete();
    message.channel.send(`<@${message.author.id}>`);
    message.channel.send({ embed });
  }
});

client.on("message", message => {
  if (message.content.toLowerCase().startsWith(`.gg`)) {
    message.member.addRole(message.guild.roles.find("name", "Muted"));
    var embed = new Discord.RichEmbed().setDescription(
      `You Has Been Muted \n Reason: Shared Links <a:2_:695326337354825758>`
    );
    message.delete();
    message.channel.send(`<@${message.author.id}>`);
    message.channel.send({ embed });
  }
});

client.on("message", message => {
  if (message.content.toLowerCase().startsWith(`http`)) {
    message.member.addRole(message.guild.roles.find("name", "Muted"));
    var embed = new Discord.RichEmbed().setDescription(
      `You Has Been Muted \n Reason: Shared Links <a:2_:695326337354825758>`
    );
    message.delete();
    message.channel.send(`<@${message.author.id}>`);
    message.channel.send({ embed });
  }
});

client.on("message", message => {
  if (message.content.toLowerCase().startsWith(`https`)) {
    message.member.addRole(message.guild.roles.find("name", "Muted"));
    var embed = new Discord.RichEmbed().setDescription(
      `You Has Been Muted \n Reason: Shared Links <a:2_:695326337354825758>`
    );
    message.delete();
    message.channel.send(`<@${message.author.id}>`);
    message.channel.send({ embed });
  }
});

client.on("message", message => {
  if (message.content.toLowerCase().startsWith(`.org`)) {
    message.member.addRole(message.guild.roles.find("name", "Muted"));
    var embed = new Discord.RichEmbed().setDescription(
      `You Has Been Muted \n Reason: Shared Links <a:2_:695326337354825758>`
    );
    message.delete();
    message.channel.send(`<@${message.author.id}>`);
    message.channel.send({ embed });
  }
});

client.on("message", message => {
  if (message.content.toLowerCase().startsWith(`.com`)) {
    message.member.addRole(message.guild.roles.find("name", "Muted"));
    var embed = new Discord.RichEmbed().setDescription(
      `You Has Been Muted \n Reason: Shared Links <a:2_:695326337354825758>`
    );
    message.delete();
    message.channel.send(`<@${message.author.id}>`);
    message.channel.send({ embed });
  }
});

const bannedwords = [
  "Fuck",
  "sex",
  "nga",
  "fuck you",
  "كسمك",
  "كس امك",
  "كس ابوك",
  "كس اهلك",
  "قحبة",
  "قحبه",
  "يا قحبة",
  "يا قحبه",
  "ولد ال",
  "بنت ال",
  "خنيث",
  "قواد",
  "نيك",
  "انيكك",
  "شرموطة",
  "مخنث",
  "ديوث",
  "كس"
];

client.on("message", message => {
  if (bannedwords.some(word => message.content.includes(word))) {
    message.delete();
    message.reply("ممنوع السب + احترم نفسك").then(msg => {
      msg.delete(5000);
    });
  }
});

var stopReacord = true;
var reactionRoles = [];
var definedReactionRole = null;

client.on("message", async message => {
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  if (command == "recrole") {
    if (!message.channel.guild)
      return message.reply(`**This Command Only In Servers**`);
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("Can't");
    if (!args[0] || args[1])
      return message.channel.send(`Error ${prefix}recrole Role`);
    var role = message.guild.roles.find(role => {
      return role.name == args[0];
    });
    if (!role)
      return message.channel.send(
        `no role with name ${definedRoleName} found, make sure you entered correct name`
      );
    if (definedReactionRole != null || !stopReacord)
      return message.channel.send("......");
    message.channel.send(
      `**Please Add Reaction For Your Message To Members Get The Role ${role.name}**`
    );
    definedReactionRole = role;
    stopReacord = false;
  }
});
client.on("raw", raw => {
  if (!["MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE"].includes(raw.t))
    return;
  var channel = client.channels.get(raw.d.channel_id);
  if (channel.messages.has(raw.d.message_id)) return;
  channel.fetchMessage(raw.d.message_id).then(message => {
    var reaction = message.reactions.get(
      raw.d.emoji.id
        ? `${raw.d.emoji.name}:${raw.d.emoji.id}`
        : raw.d.emoji.name
    );
    if (raw.t === "MESSAGE_REACTION_ADD")
      return client.emit(
        "messageReactionAdd",
        reaction,
        client.users.get(raw.d.user_id)
      );
    if (raw.t === "MESSAGE_REACTION_REMOVE")
      return client.emit(
        "messageReactionRemove",
        reaction,
        client.users.get(raw.d.user_id)
      );
  });
});
client.on("messageReactionAdd", (reaction, user) => {
  if (user.id == client.user.id) return;
  if (!stopReacord) {
    var done = false;
    reactionRoles[reaction.message.id] = {
      role: definedReactionRole,
      message_id: reaction.message.id,
      emoji: reaction.emoji
    };
    stopReacord = true;
    definedReactionRole = null;
    reaction.message.react(reaction.emoji.name).catch(err => {
      done = true;
      reaction.message.channel.send(
        `sorry i can't use this emoji but the reaction role done! anyone react will get the role!`
      );
    });
    if (done) reaction.remove(user);
  } else {
    var request = reactionRoles[reaction.message.id];
    if (!request) return;
    if (request.emoji.name != reaction.emoji.name) return reaction.remove(user);
    reaction.message.guild.members.get(user.id).addRole(request.role);
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  if (user.id == client.user.id) return;
  if (!stopReacord) return;
  let request = reactionRoles[reaction.message.id];
  if (!request) return;
  reaction.message.guild.members.get(user.id).removeRole(request.role);
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.type === "dm") return;

  var command = message.content.toLowerCase().split(" ")[0];
  var args = message.content.split(" ");

  var userID = args[1];

  if (command == prefix + "unban") {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("Your Don't Have Permission <a:X1:688734748276817929>");
    if (!userID) return message.channel.send("**ID Member <a:X1:688734748276817929>**");
    if (isNaN(userID)) return message.reply("**Must be numbers <a:X1:688734748276817929>**");
    if (userID.length < 16) return message.reply("**Invalid This Is not id <a:X1:688734748276817929>**");
    message.guild.fetchBans().then(bans => {
      var Found = bans.find(m => m.id === userID);
      if (!Found) return message.reply("**This Member Has Not Banned <a:X1:688734748276817929>**");
      message.guild.unban(userID);
      message.channel.send(
        `<a:Check:688734712294015082> <@${userID}> **Successufly UnBanned **`
      );
    });
  }
});
client.on("message", message => {
  if (message.content === "$FF") {
    message.channel.send(`**HyperBot Is Offline Now Due to a new update and modification, and will coming again to normal condition soon, <a:no:695325209795887125>**`);
  }
});

client.on("message", message => {
  if (message.content === "$OO") {
    message.channel.send(`**HyperBot Is Online Now without updates, <a:yes:695325209712001135>**`);
  }
});


client.on("message", message => {
  if (message.content === "$avatar") {
    message.channel.send(`**Please Mention AnyOne Or yourself <a:X1:688734748276817929>**`);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(prefix + "avatar")) {
    const mention = message.mentions.users.first();

    if (!mention) return console.log("");
    let embed = new Discord.RichEmbed()
      .setColor("#ffff")
      .setAuthor(
        `${mention.username}#${mention.discriminator}`,
        `${mention.avatarURL}`
      )
      .setTitle("Avatar Link")
      .setURL(`${mention.avatarURL}`)
      .setImage(`${mention.avatarURL}`)
      .setFooter(
        `Requested By ${message.author.tag}`,
        `${message.author.avatarURL}`
      );
    message.channel.send(embed);
  }
});

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(prefix + `ping`)) {
    message.channel.send(`Loading......`).then(m => {
      m.edit(
        `:ping_pong: **The Ping! \n  **` +
          (m.createdTimestamp - message.createdTimestamp) +
          ` Discord-AP I` +
          Math.round(client.ping) +
          `ms.`
      );
    });
  }

  if (message.content.toLowerCase().startsWith(prefix + `ticket`)) {
    const reason = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.guild.roles.exists("name", "Technical Support"))
      return message.channel.send(`This Server Has Not Have Support`);
    if (message.guild.channels.exists("name", "ticket" + message.author.id))
      return message.channel.send(`You Already Have Ticket`);
    message.guild
      .createChannel(`ticket-${message.author.id}`, "text")
      .then(c => {
        let role = message.guild.roles.find("name", "Technical Support");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        message.channel.send(
          `**Your Ticket Has Been Created <a:overify:688707812225712152>  ${c.name}**`
        );

        const embed = new Discord.RichEmbed()
          .setColor("#ffff")
          .addField(
            `Hey ${message.author.username}!`,
            `**Please Wait For Support**`
          )
          .setTimestamp();
        c.send({ embed: embed });
      })
      .catch(console.error);
  }
  if (message.content.toLowerCase().startsWith(prefix + `off`)) {
    if (!message.channel.name.startsWith(`ticket-`))
      return message.channel.send(
        `**Your Can Use This Command In Ticket For Closed <a:X1:688734748276817929>**`
      );

    message.channel
      .send("**Your Have 10s For close The Ticket Type The `$off2` **")
      .then(m => {
        message.channel
          .awaitMessages(response => response.content === "off2", {
            max: 1,
            time: 10000,
            errors: ["time"]
          })
          .then(collected => {
            message.channel.delete();
          })
          .catch(() => {
            m.edit("Ticket close timed out, the ticket was not closed.").then(
              m2 => {
                m2.delete();
              },
              3000
            );
          });
      });
  }
});

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(prefix + `Ping`)) {
    message.channel.send(`Hoold on!`).then(m => {
      m.edit(
        `:ping_pong: Wew, made it over the :waves: ! **Pong!**\nMessage edit time is ` +
          (m.createdTimestamp - message.createdTimestamp) +
          `ms, Discord API heartbeat is ` +
          Math.round(client.ping) +
          `ms.`
      );
    });
  }

  if (message.content.toLowerCase().startsWith(prefix + `new`)) {
    const reason = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.guild.roles.exists("name", "Support"))
      return message.channel.send(`This Server Has Not Have Support`);
    if (message.guild.channels.exists("name", "ticket" + message.author.id))
      return message.channel.send(`You Already Have Ticket`);
    message.guild
      .createChannel(`ticket-${message.author.id}`, "text")
      .then(c => {
        let role = message.guild.roles.find("name", "Support");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        message.channel.send(
          `<a:Check:688734712294015082> Your ticket has been Created #${c.name}.`
        );
        const embed = new Discord.RichEmbed()
          .setColor("#000000")
          .setColor("#36393e")
          .addField(
            `Hey ${message.author.username}!`,
            `Please wait For Support`
          )
          .setTimestamp();
        c.send({ embed: embed });
      })
      .catch(console.error);
  }
  if (message.content.toLowerCase().startsWith(prefix + `close`)) {
    if (!message.channel.name.startsWith(`ticket-`))
      return message.channel.send(
        `You can't use the close command outside of a ticket channel.`
      );

    message.channel
      .send("**Your Have 10s For close The Ticket Type The `$close2` **")
      .then(m => {
        message.channel
          .awaitMessages(response => response.content === "close2", {
            max: 1,
            time: 10000,
            errors: ["time"]
          })
          .then(collected => {
            message.channel.delete();
          })
          .catch(() => {
            m.edit("Ticket close timed out, the ticket was not closed.").then(
              m2 => {
                m2.delete();
              },
              3000
            );
          });
      });
  }
});

client.on("message", async Message => {
  if (!Message.guild || Message.author.bot) return false;
  if (Message.content.startsWith(prefix + "role")) {
    if (!Message.member.hasPermission("MANAGE_ROLES"))
      return Message.reply(
        "**| You dont have MANAGE_ROLES Permissions <a:X1:688734748276817929>**"
      );
    var user = Message.mentions.members.first();
    if (!user)
      return Message.reply(
        "**I can't find this member <a:X1:688734748276817929>**"
      );
    var men =
      Message.mentions.roles.first() ||
      Message.guild.roles.find(r =>
        r.name.startsWith(
          Message.content
            .split(" ")
            .slice(2)
            .join(" ")
        )
      );
    if (!men) return Message.reply("**I can't find this role.**");

    if (user.roles.get(men.id)) {
      user
        .removeRole(men)
        .then(() => {
          return Message.reply(
            `**Successfully Removed Role From <a:Check:688734712294015082>**`
          );
        })
        .catch(err =>
          err.code == 50013
            ? Message.channel.send("**This role is above my role.**")
            : Message.channel.send(err.message)
        );
    } else {
      user
        .addRole(men)
        .then(() => {
          Message.reply(
            `**Successfully Added Role <a:Check:688734712294015082>**`
          );
        })
        .catch(err =>
          err.code == 50013
            ? Message.channel.send("**This role is above my role.**")
            : Message.channel.send(err.message)
        );
    }
  }
});

client.on("message", function(message) {
  if (message.content.startsWith(prefix + "roll")) {
    let args = message.content.split(" ").slice(1);

    if (!args[0]) {
      message.channel.send("Type AnyNumber");

      return;
    }

    message.channel.send(Math.floor(Math.random() * args.join(" ")));

    if (!args[0]) {
      message.edit("1");

      return;
    }
  }
});

client.on("message", async message => {
  let args = message.content.split(" ");
var prefix = "$";
  if (message.content.startsWith(prefix + "mute")) {
    if (!message.member.hasPermission("MUTE_MEMBERS"))
      return message.channel.send("").then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });

    if (!message.guild.member(client.user).hasPermission("MUTE_MEMBERS"))
      return message.channel.send("").then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });

    let mention = message.mentions.members.first();
    if (!mention)
      return message.channel.send("").then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });

    if (mention.id === message.author.id)
      return message.channel
        .send("**<a:X1:688734748276817929> Your Cant Give Your Self Mute **")
        .then(msg => {
          msg.delete(3500);
          message.delete(3500);
        });

    if (mention.hasPermission("ADMINISTRATOR"))
      return message.channel.send("**Your Can't Give Mute To `ADMINISTRATOR` Permission**");

    if (message.guild.member(mention).roles.find("name", "Muted"))
      return message.channel.send(
        `**:information_source: ${mention.user.username} Already Muted**`
      );

    if (mention.position >= message.guild.member(message.author).positon)
      return message.channel
        .send("You Dont Have Permission <a:X1:688734748276817929>")
        .then(msg => {
          msg.delete(3500);
          message.delete(3500);
        });

    if (mention.positon >= message.guild.member(client.user).positon)
      return message.channel
        .send("I Dont Have Permission <a:X1:688734748276817929>")
        .then(msg => {
          msg.delete(3500);
          message.delete(3500);
        });

    let duration = args[2];
    if (!duration)
      message.channel.send(`**${prefix}Mute @user Time Reason**`).then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });

    if (isNaN(duration))
      message.channel.send("").then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });

    let reason = message.content
      .split(" ")
      .slice(3)
      .join(" ");
    if (!reason) reason = "Type The Reason";

    let thisEmbed = new Discord.RichEmbed()
      .setAuthor(mention.user.username, mention.user.avatarURL)
      .setTitle("Give Mute <a:Check:688734712294015082>")
      .addField("Server", [message.guild.name])
      .addField("By", [message.author])
      .addField("Reason", reason)
      .addField("Mute Time", duration);
    let role =
      message.guild.roles.find("name", "Muted") ||
      message.guild.roles.get(r => r.name === "Muted");
    if (!role)
      try {
        message.guild
          .createRole({
            name: "Muted",
            permissions: 0
          })
          .then(r => {
            message.guild.channels.forEach(c => {
              c.overwritePermissions(r, {
                SEND_MESSAGES: false,
                READ_MESSAGES_HISTORY: false,
                ADD_REACTIONS: false
              });
            });
          });
      } catch (e) {
        console.log(e.stack);
      }
    mention.addRole(role).then(() => {
      mention.send(thisEmbed);
      message.channel.send(
        `**${mention.user.username} Successfully Muted <a:Check:688734712294015082>  **  `
      );
      mention.setMute(true);
    });
    setTimeout(() => {
      if (duration === 0) return;
      mention.setMute(false);
      mention.removeRole(role);
    }, duration * 60000);
  }
});

client.on("message", async message => {
  let mention = message.mentions.members.first();
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = message.content.split(" ").slice(1);
  if (command === `unmute`) {
    2;
    if (!message.member.hasPermission("MUTE_MEMBERS"))
      return message.channel
        .sendMessage("**You Dont Have Permission <a:X1:688734748276817929>**")
        .then(m => m.delete(5000));
    if (!message.guild.member(client.user).hasPermission("MUTE_MEMBERS"))
      return message.channel.send("**I Dont Have Permission <a:X1:688734748276817929>**")
        .then(msg => msg.delete(6000));

    let Node =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);
    if (!Node)
      return message.channel.send("").then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });

    let role = message.guild.roles.find(r => r.name === "Muted");

    if (!role || !Node.roles.has(role.id))
      return message.channel.sendMessage(
        `**:information_source:${mention.user.username} لقد تم فك الميوت عنه مسبقا**`
      );

    await Node.removeRole(role);
    message.channel.sendMessage(
      `**${mention.user.username} Successfully Unmuted <a:Check:688734712294015082> **`
    );

    return;
  }
});

client.on("message", message => {
  if (!message.guild || message.author.bot) return;
  if (message.content == "$colors" || message.content == "الوان") {
    var fsn = require("fs-nextra");
    fs.readdir("./colors", async (err, files) => {
      var f = files[Math.floor(Math.random() * files.length)];
      var { Canvas } = require("canvas-constructor");
      var x = 0;
      var y = 0;
      if (message.guild.roles.filter(role => !isNaN(role.name)).size <= 0)
        return;
      message.guild.roles
        .filter(role => !isNaN(role.name))
        .sort((b1, b2) => b1.name - b2.name)
        .forEach(() => {
          x += 100;
          if (x > 100 * 12) {
            x = 100;
            y += 80;
          }
        });
      var image = await fsn.readFile(`./colors/${f}`);
      var xd = new Canvas(100 * 11, y + 350)
        .addBeveledImage(image, 0, 0, 100 * 11, y + 260, 25)
        .setTextBaseline("middle")
        .setColor("#ffff")
        .setTextSize(80)
        .addText(`Color List`, 375, 75);
      x = 0;
      y = 150;
      message.guild.roles
        .filter(role => !isNaN(role.name))
        .sort((b1, b2) => b1.name - b2.name)
        .forEach(role => {
          x += 75;
          if (x > 100 * 10) {
            x = 75;
            y += 80;
          }
          xd.setTextBaseline("middle")
            .setTextAlign("center")
            .setColor(role.hexColor)
            .addBeveledRect(x, y, 60, 60, 15)
            .setColor("white");
          if (`${role.name}`.length > 2) {
            xd.setTextSize(30);
          } else if (`${role.name}`.length > 1) {
            xd.setTextSize(40);
          } else {
            xd.setTextSize(50);
          }
          xd.addText(role.name, x + 30, y + 30);
        });
      message.channel.sendFile(xd.toBuffer());
    });
  }
});

client.on("message", message => {
  let args = message.content.split(" ").slice(1);
  if (
    message.content.split(" ")[0] == "$color" ||
    message.content.split(" ")[0] == "لون"
  ) {
    const embedd = new Discord.RichEmbed()
      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription(
        `**No Color With This Number ** <a:X1:688734748276817929> `
      )
      .setColor(`#ffff`);

    if (!isNaN(args) && args.length > 0)
      if (!message.guild.roles.find("name", `${args}`))
        return message.channel.sendEmbed(embedd);

    var a = message.guild.roles.find("name", `${args}`);
    if (!a) return;
    const embed = new Discord.RichEmbed()

      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription(
        `**Done  Your Colors Has Been Added  <a:Check:688734712294015082> **`
      )

      .setColor(`${a.hexColor}`);
    message.channel.sendEmbed(embed);
    if (!args) return;
    setInterval(function() {});
    let count = 0;
    let ecount = 0;
    for (let x = 1; x < 201; x++) {
      message.member.removeRole(message.guild.roles.find("name", `${x}`));
    }
    message.member.addRole(message.guild.roles.find("name", `${args}`));
  }
});

client.on("message", message => {
  if (message.content === prefix + "createcolors") {
    if (!message.channel.guild) return;
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel
        .send("**You Dont Have ADMINISTRATOR**")
        .then(msg => msg.delete(6000));
    message.guild.createRole({
      name: "1",
      color: "#000001",
      permissions: []
    });
    message.guild.createRole({
      name: "2",
      color: "#0a0a0a",
      permissions: []
    });
    message.guild.createRole({
      name: "3",
      color: "#131313",
      permissions: []
    });
    message.guild.createRole({
      name: "4",
      color: "#1f1f1f",
      permissions: []
    });
    message.guild.createRole({
      name: "5",
      color: "#242424",
      permissions: []
    });
    message.guild.createRole({
      name: "6",
      color: "#333333",
      permissions: []
    });
    message.guild.createRole({
      name: "7",
      color: "#5c5c5c",
      permissions: []
    });
    message.guild.createRole({
      name: "8",
      color: "#797979 ",
      permissions: []
    });
    message.guild.createRole({
      name: "9",
      color: "#a0a0a0",
      permissions: []
    });
    message.guild.createRole({
      name: "10",
      color: "#cecece",
      permissions: []
    });
    message.guild.createRole({
      name: "11",
      color: "#ffffff",
      permissions: []
    });
    message.guild.createRole({
      name: "12",
      color: "#110000",
      permissions: []
    });

    message.guild.createRole({
      name: "13",
      color: "#2c0000",
      permissions: []
    }); //master killer

    message.guild.createRole({
      name: "14",
      color: "#380401",
      permissions: []
    });

    message.guild.createRole({
      name: "15",
      color: "#4b0101",
      permissions: []
    });

    message.guild.createRole({
      name: "16",
      color: "#520000",
      permissions: []
    });

    message.guild.createRole({
      name: "17",
      color: "#580000",
      permissions: []
    });

    message.guild.createRole({
      name: "18",
      color: "#810000",
      permissions: []
    });

    message.guild.createRole({
      name: "19",
      color: "#a00000",
      permissions: []
    });

    message.guild.createRole({
      name: "20",
      color: "#c90000",
      permissions: []
    });

    message.guild.createRole({
      name: "21",
      color: "#f10000",
      permissions: []
    });

    message.guild.createRole({
      name: "22",
      color: "#ff0000",
      permissions: []
    });
    message.guild.createRole({
      name: "23",
      color: "#310d00",
      permissions: []
    });
    message.guild.createRole({
      name: "24",
      color: "#471d00",
      permissions: []
    });

    message.guild.createRole({
      name: "25",
      color: "#632500",
      permissions: []
    });

    message.guild.createRole({
      name: "26",
      color: "#702900",
      permissions: []
    });

    message.guild.createRole({
      name: "27",
      color: "#743300",
      permissions: []
    });

    message.guild.createRole({
      name: "28",
      color: "#793600",
      permissions: []
    });
    message.guild.createRole({
      name: "29",
      color: "#8a4600",
      permissions: []
    });

    message.guild.createRole({
      name: "30",
      color: "#b34700",
      permissions: []
    });

    message.guild.createRole({
      name: "31",
      color: "#d86300",
      permissions: []
    });

    message.guild.createRole({
      name: "32",
      color: "#ee6900",
      permissions: []
    });

    message.guild.createRole({
      name: "33",
      color: "#ff8100",
      permissions: []
    });

    message.guild.createRole({
      name: "34",
      color: "#02001a",
      permissions: []
    });

    message.guild.createRole({
      name: "35",
      color: "#040027",
      permissions: []
    });
    message.guild.createRole({
      name: "36",
      color: "#000250",
      permissions: []
    });

    message.guild.createRole({
      name: "37",
      color: "#00006b",
      permissions: []
    });

    message.guild.createRole({
      name: "38",
      color: "#09008b ",
      permissions: []
    });

    message.guild.createRole({
      name: "39",
      color: "#020094",
      permissions: []
    });

    message.guild.createRole({
      name: "40",
      color: "#0005b9",
      permissions: []
    });
    message.guild.createRole({
      name: "41",
      color: "#0f00db",
      permissions: []
    });
    message.guild.createRole({
      name: "42",
      color: "#0300f7",
      permissions: []
    });
    message.guild.createRole({
      name: "43",
      color: "#002bff",
      permissions: []
    });
    message.guild.createRole({
      name: "44",
      color: "#0047ff",
      permissions: []
    });

    message.guild.createRole({
      name: "45",
      color: "#001601",
      permissions: []
    });

    message.guild.createRole({
      name: "46",
      color: "#002501",
      permissions: []
    });

    message.guild.createRole({
      name: "47",
      color: "#052900",
      permissions: []
    });

    message.guild.createRole({
      name: "48",
      color: "#003b03",
      permissions: []
    });

    message.guild.createRole({
      name: "49",
      color: "#005802",
      permissions: []
    });

    message.guild.createRole({
      name: "50",
      color: "#007715",
      permissions: []
    });

    message.channel.sendMessage({
      embed: new Discord.RichEmbed()
        .setColor("#502faf")
        .setAuthor(`${message.author.username}'`, message.author.avatarURL)
        .setDescription(
          "Colors Has Been Created" + "<a:Check:688734712294015082>"
        )
    });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;

  var messages = message.content.split(" ").slice(1);

  let args = messages.slice(1);

  var prefix = "$";
  if (message.content.startsWith(prefix + "report")) {
    let msg = message;

    if (
      message.guild
        .member(message.author)
        .roles.get(msg.guild.roles.find(role => role.name === `reports_ban`))
    )
      return message.reply("**Your Has Banned From Reportes**").then(m => {
        m.delete(3000);
      }); //لو حد عنده هل رتبة ما رح يقدر يسوي ريبورت

    var reports_channel = message.guild.channels.find("name", "reports");

    if (!reports_channel)
      return message.reply("**I cant find reports channel**").then(m => {
        m.delete(3000);
      });

    var mention = message.mentions.users.first();

    if (!mention)
      return message.reply("**Please, mention a member.**").then(m => {
        m.delete(3000);
      });

    if (mention.id == message.author.id)
      return message.reply("**You cant report yourself**").then(m => {
        m.delete(3000);
      });

    if (message.guild.member(mention).hasPermission("MANAGE_MESSAGES"))
      return message.reply("**You cant report this user.**").then(m => {
        m.delete(3000);
      }); //لو شخص عنده هل برمشن ماحد رح يقدر يسويله ريبورت

    if (mention.id == message.guild.owner.id)
      return message.reply("**You cant report the owner**").then(m => {
        m.delete(3000);
      });

    var reason = args.join(" ");

    if (!reason)
      return message.reply("**Please, specify a reason.**").then(m => {
        m.delete(3000);
      });
    var embed = new Discord.RichEmbed()
      .setColor("#ffff")
      .setTitle(`NEW REPORT`)
      .setThumbnail(message.author.avatarURL)
      .addField("**Reporter Name: **", `<@${message.author.id}>`, true)
      .addField("**Reported By: **", `${mention}`, true)
      .addField("**reason: **", `[ ${reason} ]`, true)
      .addField("**Channel: **", `${message.channel}`, true);
    reports_channel.send(embed);
    message.channel
      .send("**Successufly Reported, Thanks For Reported**")
      .then(message => {
        message.delete(3000);
      });
  }
});

client.on("guildMemberRemove", member => {
  if (member.guild.id === "694685480595357766") {
    const channel = member.guild.channels.find("id", "698291137131184178");
    if (!channel) return;
    channel.send(`**${member.user.tag} Has leaved from The Server  :tired_face: **`);
  }
});

client.on("message", message => {
  if (message.content.startsWith("$say")) {
    message.delete();
    message.delete();
    message.delete();
    message.delete();
    message.delete();
    message.delete();
    message.delete();
    message.delete();
    message.delete();
    message.delete();
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("** You dont have `MANAGE_MESSAGES` permission **");
    let args = message.content.split(" ").slice(1);
    let ar = args.join(" ");
    message.channel.send(ar, { t: true });
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "Soon")) {
    let NEWS = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle(`Whats A NEWS ?`).setDescription(`** News 
     2versions of the languages 
     are English and Arabic soon
 **`);
    message.channel.sendEmbed(NEWS);
  }
});

client.on("message", message => {
  var prefix = "$";
  if (message.content === prefix + "lock") {
    if (!message.channel.guild)
      return message.channel.send(
        "** This Command Only In Servers <a:X1:688734748276817929>**"
      );

    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        "**Your Don't Have Permission MANAGE_CHANNELS Have Permission MANAGE_CHANNELS**"
      );
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
       message.channel.send(`** :lock: ${message.channel} has been locked. **`);
      });
  }

  if (message.content === prefix + "unlock") {
    if (!message.channel.guild)
      return message.channel.send(
        "**  This Command Only In Servers <a:X1:688734748276817929>**"
      );

    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("**Your Don't Have Permission MANAGE_CHANNELS**");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.channel.send(`**:unlock: ${message.channel} has been unlocked. **`);
      });
  }
});





const log = JSON.parse(fs.readFileSync("./log.json", "utf8"));
client.on("message", message => {
  if (!message.channel.guild) return;

  let room = message.content.split(" ").slice(1);
  let findroom = message.guild.channels.find("name", `${room}`);
  if (message.content.startsWith(prefix + "setlog")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!room) return message.channel.send("Please Type The Channel Name");
    if (!findroom)
      return message.channel.send("Please Type The Log Channel Name");
    let embed = new Discord.RichEmbed()
      .setTitle("**Done The Log Code Has Been Setup**")
      .addField("Channel:", `${room}`)
      .addField("Requested By:", `${message.author}`)
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${client.user.username}`);
    message.channel.sendEmbed(embed);
    log[message.guild.id] = {
      channel: room,
      onoff: "On"
    };
    fs.writeFile("./log.json", JSON.stringify(log), err => {
      if (err) console.error(err);
    });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "togglelog")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!log[message.guild.id])
      log[message.guild.id] = {
        onoff: "Off"
      };
    if (log[message.guild.id].onoff === "Off")
      return [
        message.channel.send(`**The log Is __𝐎𝐍__ !**`),
        (log[message.guild.id].onoff = "On")
      ];
    if (log[message.guild.id].onoff === "On")
      return [
        message.channel.send(`**The log Is __𝐎𝐅𝐅__ !**`),
        (log[message.guild.id].onoff = "Off")
      ];
    fs.writeFile("./log.json", JSON.stringify(log), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});

client.on("messageDelete", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;
  if (!log[message.guild.id])
    log[message.guild.id] = {
      onoff: "Off"
    };
  if (log[message.guild.id].onoff === "Off") return;
  var logChannel = message.guild.channels.find(
    c => c.name === `${log[message.guild.id].channel}`
  );
  if (!logChannel) return;

  let messageDelete = new Discord.RichEmbed()
    .setTitle("**[MESSAGE DELETE]**")
    .setColor("RED")
    .setThumbnail(message.author.avatarURL)
    .setDescription(
      `**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``
    )
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL);

  logChannel.send(messageDelete);
});
client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (!oldMessage.channel.type === "dm") return;
  if (!oldMessage.guild.member(client.user).hasPermission("EMBED_LINKS"))
    return;
  if (!oldMessage.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;
  if (!log[oldMessage.guild.id])
    log[oldMessage.guild.id] = {
      onoff: "Off"
    };
  if (log[oldMessage.guild.id].onoff === "Off") return;
  var logChannel = oldMessage.guild.channels.find(
    c => c.name === `${log[oldMessage.guild.id].channel}`
  );
  if (!logChannel) return;

  if (oldMessage.content.startsWith("https://")) return;

  let messageUpdate = new Discord.RichEmbed()
    .setTitle("**[MESSAGE EDIT]**")
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor("BLUE")
    .setDescription(
      `**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``
    )
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL);

  logChannel.send(messageUpdate);
});

client.on("roleCreate", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[role.guild.id])
    log[role.guild.id] = {
      onoff: "Off"
    };
  if (log[role.guild.id].onoff === "Off") return;
  var logChannel = role.guild.channels.find(
    c => c.name === `${log[role.guild.id].channel}`
  );
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let roleCreate = new Discord.RichEmbed()
      .setTitle("**[ROLE CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL);

    logChannel.send(roleCreate);
  });
});
client.on("roleDelete", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[role.guild.id])
    log[role.guild.id] = {
      onoff: "Off"
    };
  if (log[role.guild.id].onoff === "Off") return;
  var logChannel = role.guild.channels.find(
    c => c.name === `${log[role.guild.id].channel}`
  );
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let roleDelete = new Discord.RichEmbed()
      .setTitle("**[ROLE DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL);

    logChannel.send(roleDelete);
  });
});
client.on("roleUpdate", (oldRole, newRole) => {
  if (!oldRole.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!oldRole.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[oldRole.guild.id])
    log[oldRole.guild.id] = {
      onoff: "Off"
    };
  if (log[oldRole.guild.id].onoff === "Off") return;
  var logChannel = oldRole.guild.channels.find(
    c => c.name === `${log[oldRole.guild.id].channel}`
  );
  if (!logChannel) return;

  oldRole.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (oldRole.name !== newRole.name) {
      if (log[oldRole.guild.id].onoff === "Off") return;
      let roleUpdateName = new Discord.RichEmbed()
        .setTitle("**[ROLE NAME UPDATE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL);

      logChannel.send(roleUpdateName);
    }
    if (oldRole.hexColor !== newRole.hexColor) {
      if (oldRole.hexColor === "#000000") {
        var oldColor = "`Default`";
      } else {
        var oldColor = oldRole.hexColor;
      }
      if (newRole.hexColor === "#000000") {
        var newColor = "`Default`";
      } else {
        var newColor = newRole.hexColor;
      }
      if (log[oldRole.guild.id].onoff === "Off") return;
      let roleUpdateColor = new Discord.RichEmbed()
        .setTitle("**[ROLE COLOR UPDATE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL);

      logChannel.send(roleUpdateColor);
    }
  });
});

client.on("channelCreate", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[channel.guild.id])
    log[channel.guild.id] = {
      onoff: "Off"
    };
  if (log[channel.guild.id].onoff === "Off") return;
  var logChannel = channel.guild.channels.find(
    c => c.name === `${log[channel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let channelCreate = new Discord.RichEmbed()
      .setTitle("**[CHANNEL CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL);

    logChannel.send(channelCreate);
  });
});
client.on("channelDelete", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[channel.guild.id])
    log[channel.guild.id] = {
      onoff: "Off"
    };
  if (log[channel.guild.id].onoff === "Off") return;
  var logChannel = channel.guild.channels.find(
    c => c.name === `${log[channel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let channelDelete = new Discord.RichEmbed()
      .setTitle("**[CHANNEL DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL);

    logChannel.send(channelDelete);
  });
});
client.on("channelUpdate", (oldChannel, newChannel) => {
  if (!oldChannel.guild) return;
  if (!log[oldChannel.guild.id])
    log[oldChannel.guild.id] = {
      onoff: "Off"
    };
  if (log[oldChannel.guild.id].onoff === "Off") return;
  var logChannel = oldChannel.guild.channels.find(
    c => c.name === `${log[oldChannel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (oldChannel.type === "text") {
    var channelType = "Text";
  } else if (oldChannel.type === "voice") {
    var channelType = "Voice";
  } else if (oldChannel.type === "category") {
    var channelType = "Category";
  }

  oldChannel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (oldChannel.name !== newChannel.name) {
      let newName = new Discord.RichEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL);

      logChannel.send(newName);
    }
    if (oldChannel.topic !== newChannel.topic) {
      if (log[oldChannel.guild.id].onoff === "Off") return;
      let newTopic = new Discord.RichEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic ||
            "NULL"}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic ||
            "NULL"}\`\`\`\n**Channel:** ${oldChannel} (ID: ${
            oldChannel.id
          })\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL);

      logChannel.send(newTopic);
    }
  });
});

client.on("guildBanAdd", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[user.guild.id])
    log[guild.guild.id] = {
      onoff: "Off"
    };
  if (log[user.guild.id].onoff === "Off") return;
  var logChannel = guild.channels.find(
    c => c.name === `${log[guild.guild.id].channel}`
  );
  if (!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (userID === client.user.id) return;

    let banInfo = new Discord.RichEmbed()
      .setTitle("**[BANNED]**")
      .setThumbnail(userAvatar)
      .setColor("DARK_RED")
      .setDescription(
        `**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL);

    logChannel.send(banInfo);
  });
});
client.on("guildBanRemove", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[guild.guild.id])
    log[guild.guild.id] = {
      onoff: "Off"
    };
  if (log[guild.guild.id].onoff === "Off") return;
  var logChannel = guild.channels.find(
    c => c.name === `${log[guild.guild.id].channel}`
  );
  if (!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (userID === client.user.id) return;

    let unBanInfo = new Discord.RichEmbed()
      .setTitle("**[UNBANNED]**")
      .setThumbnail(userAvatar)
      .setColor("GREEN")
      .setDescription(
        `**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL);

    logChannel.send(unBanInfo);
  });
});

client.on("guildMemberUpdate", (oldMember, newMember) => {
  if (!oldMember.guild) return;
  if (!log[oldMember.guild.id])
    log[oldMember.guild.id] = {
      onoff: "Off"
    };
  if (log[oldMember.guild.id].onoff === "Off") return;
  var logChannel = oldMember.guild.channels.find(
    c => c.name === `${log[(oldMember, newMember.guild.id)].channel}`
  );
  if (!logChannel) return;

  oldMember.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;
    var userTag = logs.entries.first().executor.tag;

    if (oldMember.nickname !== newMember.nickname) {
      if (oldMember.nickname === null) {
        var oldNM = "`اسمه الاصلي`";
      } else {
        var oldNM = oldMember.nickname;
      }
      if (newMember.nickname === null) {
        var newNM = "`اسمه الاصلي`";
      } else {
        var newNM = newMember.nickname;
      }

      let updateNickname = new Discord.RichEmbed()
        .setTitle("**[UPDATE MEMBER NICKNAME]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL);

      logChannel.send(updateNickname);
    }
    if (oldMember.roles.size < newMember.roles.size) {
      let role = newMember.roles
        .filter(r => !oldMember.roles.has(r.id))
        .first();
      if (!log[oldMember.guild.id])
        log[oldMember.guild.id] = {
          onoff: "Off"
        };
      if (log[oldMember.guild.id].onoff === "Off") return;
      let roleAdded = new Discord.RichEmbed()
        .setTitle("**[ADDED ROLE TO MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL)
        .setColor("GREEN")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleAdded);
    }
    if (oldMember.roles.size > newMember.roles.size) {
      let role = oldMember.roles
        .filter(r => !newMember.roles.has(r.id))
        .first();
      if (!log[oldMember.guild.id])
        log[oldMember.guild.id] = {
          onoff: "Off"
        };
      if (log[(oldMember, newMember.guild.id)].onoff === "Off") return;
      let roleRemoved = new Discord.RichEmbed()
        .setTitle("**[REMOVED ROLE FROM MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL)
        .setColor("RED")
        .setDescription(
          `**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleRemoved);
    }
  });
  if (oldMember.guild.owner.id !== newMember.guild.owner.id) {
    if (!log[oldMember.guild.id])
      log[oldMember.guild.id] = {
        onoff: "Off"
      };
    if (log[(oldMember, newMember.guild.id)].onoff === "Off") return;
    let newOwner = new Discord.RichEmbed()
      .setTitle("**[UPDATE GUILD OWNER]**")
      .setThumbnail(oldMember.guild.iconURL)
      .setColor("GREEN")
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`
      )
      .setTimestamp()
      .setFooter(oldMember.guild.name, oldMember.guild.iconURL);

    logChannel.send(newOwner);
  }
});

client.on("voiceStateUpdate", (voiceOld, voiceNew) => {
  if (!voiceOld.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!voiceOld.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[voiceOld.guild.id])
    log[voiceOld.guild.id] = {
      onoff: "Off"
    };
  if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
  var logChannel = voiceOld.guild.channels.find(
    c => c.name === `${log[(voiceOld, voiceNew.guild.id)].channel}`
  );
  if (!logChannel) return;

  voiceOld.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userTag = logs.entries.first().executor.tag;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (voiceOld.serverMute === false && voiceNew.serverMute === true) {
      let serverMutev = new Discord.RichEmbed()
        .setTitle("**[VOICE MUTE]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png"
        )
        .setColor("RED")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverMutev);
    }
    if (voiceOld.serverMute === true && voiceNew.serverMute === false) {
      if (!log[voiceOld.guild.id])
        log[voiceOld.guild.id] = {
          onoff: "Off"
        };
      if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
      let serverUnmutev = new Discord.RichEmbed()
        .setTitle("**[VOICE UNMUTE]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png"
        )
        .setColor("GREEN")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverUnmutev);
    }
    if (voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
      if (!log[voiceOld.guild.id])
        log[voiceOld.guild.id] = {
          onoff: "Off"
        };
      if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
      let serverDeafv = new Discord.RichEmbed()
        .setTitle("**[VOICE DEAF]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png"
        )
        .setColor("RED")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverDeafv);
    }
    if (voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
      if (!log[voiceOld.guild.id])
        log[voiceOld.guild.id] = {
          onoff: "Off"
        };
      if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
      let serverUndeafv = new Discord.RichEmbed()
        .setTitle("**[VOICE UNDEAF]**")
        .setThumbnail(
          "https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png"
        )
        .setColor("GREEN")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverUndeafv);
    }
  });

  if (
    voiceOld.voiceChannelID !== voiceNew.voiceChannelID &&
    voiceNew.voiceChannel &&
    voiceOld.voiceChannel != null
  ) {
    if (!log[voiceOld.guild.id])
      log[voiceOld.guild.id] = {
        onoff: "Off"
      };
    if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
    let voiceLeave = new Discord.RichEmbed()
      .setTitle("**[CHANGED VOICE ROOM]**")
      .setColor("GREEN")
      .setThumbnail(voiceOld.user.avatarURL)
      .setDescription(
        `**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`
      )
      .setTimestamp()
      .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL);

    logChannel.send(voiceLeave);
  }
});