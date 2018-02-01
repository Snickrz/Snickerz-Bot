const Discord = require('discord.js');
const bot = new Discord.Client();

const TOKEN = 'token_here';
const PREFIX = '!';
var dispatcher;


function sendError(message, description) {
    message.channel.send({embed:{
        color: 15158332,
        description: ':x: ' + description
    }});
}

bot.on('ready', function() {
    console.log("Bot on");
    bot.user.setActivity('!help');
});

bot.on('message', message => {
    if(message.content[0] === PREFIX) {
        let splitMessage = message.content.split(" ");

        if(message.content === '!help') { 
            const embed = new Discord.RichEmbed();

            embed.setAuthor('Fiche d\'aide :', 'https://t3.ftcdn.net/jpg/00/80/33/32/240_F_80333297_qHGRk9vWYoZ1MrNxaHDxuIzTPi4kclBJ.jpg');
            embed.addField(':small_blue_diamond: !help', 'Cette fiche d\'aide vous donne l\'intégralité des commandes disponibles, et vous donne leur utilisation.');
            embed.addField(':small_blue_diamond: !règles', 'Cette commande vous envoie les règles par message privé.');
            embed.addField(':small_blue_diamond: !poll', 'Vous donne aléatoirement une réponse, soit "Oui", soit "Non", suivi du pourcentage de chance que cette réponse soit apparue.');
            embed.addField(':small_blue_diamond: !soc', 'Cette commmande, vous indique aléatoirement, "Simple" ou "Classé", cela peut vous etre utile si vous voulez jouer et que vous ne savez pas.');
            embed.addField(':small_blue_diamond: !twix, !mars, !snickerz', 'Ces commmandes vous indiquent ce que Médusa pense de ses ouvriers.');
            

            message.channel.send({embed});
        } else if(message.content === '!regles'){
            message.author.createDM().then(channel => {
            const embed = new Discord.RichEmbed();
            embed.setAuthor('Règles du serveur', 'https://t3.ftcdn.net/jpg/00/80/33/32/240_F_80333297_qHGRk9vWYoZ1MrNxaHDxuIzTPi4kclBJ.jpg');
            embed.addField('---------------------------', ':diamonds: Bonjour, __**' + message.member.displayName +'**__, ce serveur est un serveur communautaire, merci de vous respecter les uns les autres et de ne pas être haineux ou irrespectueux (propos homophobes, sexistes, racistes), sous peine d’une sanction. \n:diamonds: **On vous connait ?** Il suffit d’envoyer un petit message pour recevoir l’affectation que nous jugerons la plus raisonnable.\n:diamonds: **Vous êtes nouveau ?** N’hésitez pas a demander un accès aux channels résérvés  (GTA, LMS/PUBG, Rainbow Six Siege, etc,...). N’hésitez, par ailleurs, pas à demander la création de grades et de salons réservés a de nouveaux jeux que vous jugez utiles.\n:diamonds: Les grades administrateur et modérateur ne sont pas accessible au grand public, merci de ne pas demander d’acquérir ces grades.\n:diamonds: - Amusez vous bien sur ce serveur et n’hésitez pas à le partager a vos amis !');
            channel.send({embed});

            }).catch(console.error);
        } else if(message.content === '!join') {
            if(message.member.voiceChannel){
                message.member.voiceChannel.join().then(message.channel.send('Connecté au salon : `' + message.member.voiceChannel.name + '`'));
            } else if (!message.member.voiceChannel) {
                    sendError(message, 'Vous devez être connecté à un channel vocal.')
                }
        } else if(message.content === '!leave') {
            message.member.voiceChannel.leave();
        } else if(splitMessage[0] === '!play') {
            if(splitMessage.length === 2) {
                if(message.member.voiceChannel) {
                    message.member.voiceChannel.join().then(connexion => {
                        dispatcher = connexion.playArbitraryInput(splitMessage[1])

                        dispatcher.on('error', e => {
                            console.log(e);
                        });

                        dispatcher.on('end', e => {
                            console.log("Fin du son.");
                        });
                    }).catch(console.log);
                } else sendError(message, 'Vous devez être connecté à un channel vocal.')
            } else sendError(message, 'Erreur dans les paramètres.')
        } else if(splitMessage[0] === '!pause') {
            if(dispatcher !== undefined) {
                dispatcher.pause();
            }
        } else if(splitMessage[0] === '!resume') {
            if(dispatcher !== undefined) {
                dispatcher.resume();
            }
        }
}});

bot.on('message', async function(message) {
    if(message.author.equals(bot.user)) return;
    
    if(!message.content.startsWith(PREFIX)) return;
    
    var args = message.content.substring(PREFIX.length).split (" ")
    
    switch (args[0].toLowerCase()) {
          
        case "blague":
           message.channel.send('Tu sais ce qui est marrant, un catamaran.');
            break;
  
        case "twix":
           message.channel.send('Me parles pas de lui stp. \nNon j\'rigole je l\'aime :heart:');
            break;
            
        case "mars":
           message.channel.send('Mon roi, celui avec qui je partage ma vie...');
            break;
            
        case "snickerz":
           message.channel.send('Mon créateur...');
            break;
            
        case "diogo":
           message.channel.send('Un gentil copain!');
            break;
            
        case "chaine":
           message.channel.send('https://www.youtube.com/channel/UCanvsq5uut8-KDm0V026oFQ');
            break;
            
        
    }
    
});

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send('Bienvenue sur mon serveur ! \nTapez !regles pour reçevoir les règles du serveur par message privé, ' + member.displayName + ' !');
    }).catch(console.error)
});

bot.login(TOKEN);
