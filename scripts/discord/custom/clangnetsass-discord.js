(function () {

    // Retrieve a Dad Joke from the API and say it in chat, use to make independent of bot timers.
    function getAnyJoke() {
        var jsonObject;
        var returnText;
        var intJokeChoice = Math.floor(Math.random() * 2);
        var intEmoteChoice = Math.floor(Math.random() * 4);
        var strEmoteChoice;
        var strJoke;

        switch (intJokeChoice) {
            case 0:
                jsonObject = JSON.parse($.cnGetJSON('https://icanhazdadjoke.com/slack'));
                strJoke = jsonObject.attachments[0].text;
                break;
            case 1:
                jsonObject = JSON.parse($.cnGetJSON('https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&type=single'));
                strJoke = jsonObject.joke;
                break;
        }
        switch (intEmoteChoice) {
            case 0:
                strEmoteChoice = ' <:porTriHard:685851046249103419>';
                break;
            case 1:
                strEmoteChoice = ' <:porNotLikeThis:685851046509019210>';
                break;
            case 2:
                strEmoteChoice = ' <:porPogChamp:685851045980667935>';
                break;
            case 3:
                strEmoteChoice = ' <:porLUL:685851045989187625>';
                break;
        }
        returnText = strJoke + strEmoteChoice;
        return returnText;
    }

    // Command events
    $.bind('discordChannelCommand', function (event) {
        var command = event.getCommand();
        var sender = event.getSender();
        var channel = event.getDiscordChannel();
        var channelCheck = event.getChannel();
        var discordUser = event.getDiscordUser();
        var mention = event.getMention();
        var args = event.getArgs();
        var action = args[0];


        // --- !followed command ---
        if (command.equalsIgnoreCase('followed')) {
            if (action !== undefined) {
                apiURL = 'https://decapi.me/twitch/followed/iandlive/' + action;
                $.discord.say(channel, $.lang.get('clangnetsass.followedquery.discord', $.discord.userPrefix(mention).replace(', ', ''), action, $.customAPI.get(apiURL).content));
            } else {
                var twitchName = $.discord.resolveTwitchName(event.getSenderId());
                if (twitchName !== null) {
                    apiURL = 'https://decapi.me/twitch/followed/iandlive/' + twitchName;
                    $.discord.say(channel, $.lang.get('clangnetsass.followed.discord', $.discord.userPrefix(mention).replace(', ', ''), $.customAPI.get(apiURL).content));
                } else {
                    $.discord.say(channel, $.discord.userPrefix(mention) + $.lang.get('discord.accountlink.usage.nolink'));
                }
            }
        }

        // --- !followers command ---
        if (command.equalsIgnoreCase('followers')) {
            if (action !== undefined) {
                apiURL = 'https://decapi.me/twitch/followcount/' + action;
                $.discord.say(channel, $.lang.get('clangnetsass.followersquery', $.discord.userPrefix(mention).replace(', ', ''), action, $.customAPI.get(apiURL).content));
            } else {
                apiURL = 'https://decapi.me/twitch/followcount/iandlive';
                $.discord.say(channel, $.lang.get('clangnetsass.followers.discord', $.discord.userPrefix(mention).replace(', ', ''), $.customAPI.get(apiURL).content));
            }
        }

        // --- !howlong command ---
        if (command.equalsIgnoreCase('howlong')) {
            if (action !== undefined) {
                apiURL = 'https://decapi.me/twitch/followage/iandlive/' + action;
                $.discord.say(channel, $.lang.get('clangnetsass.howlongquery.discord', $.discord.userPrefix(mention).replace(', ', ''), action, $.customAPI.get(apiURL).content));
            } else {
                var twitchName = $.discord.resolveTwitchName(event.getSenderId());
                if (twitchName !== null) {
                    apiURL = 'https://decapi.me/twitch/followage/iandlive/' + twitchName;
                    $.discord.say(channel, $.lang.get('clangnetsass.howlong.discord', $.discord.userPrefix(mention).replace(', ', ''), $.customAPI.get(apiURL).content));
                } else {
                    $.discord.say(channel, $.discord.userPrefix(mention) + $.lang.get('discord.accountlink.usage.nolink'));
                }
            }
        }

        // --- !clothing command ---
        if (command.equalsIgnoreCase('clothing')) {
            $.discord.say(channel, $.lang.get('clangnetsass.clothing'));
        }

        // --- !motorsports command ---
        if (command.equalsIgnoreCase('motorsports')) {
            $.discordAPI.addRole('Motorsports', discordUser);
            $.discord.say(channel, $.lang.get('clangnetsass.motorsports.discord', $.discord.userPrefix(mention).replace(', ', '')));
        }

        // --- !pedestrian command ---
        if (command.equalsIgnoreCase('pedestrian')) {
            $.discordAPI.removeRole($.discordAPI.getRole('Motorsports'), discordUser);
            $.discord.say(channel, $.lang.get('clangnetsass.pedestrian.discord', $.discord.userPrefix(mention).replace(', ', '')));
        }

        // --- !movienight command ---
        if (command.equalsIgnoreCase('movienight')) {
            $.discordAPI.addRole('Movienight', discordUser);
            $.discord.say(channel, $.lang.get('clangnetsass.movienight.discord', $.discord.userPrefix(mention).replace(', ', '')));
        }

        // --- !nomovies command ---
        if (command.equalsIgnoreCase('nomovies')) {
            $.discordAPI.removeRole($.discordAPI.getRole('Movienight'), discordUser);
            $.discord.say(channel, $.lang.get('clangnetsass.nomovies.discord', $.discord.userPrefix(mention).replace(', ', '')));
        }

        // --- !jokes command ---
        if (command.equalsIgnoreCase('jokes') && channelCheck.equalsIgnoreCase('games-room')) {
            $.discord.say(channel, $.lang.get('clangnetsass.telljoke.discord', getAnyJoke()));
        }

        // --- !xebon command ---
        if (command.equalsIgnoreCase('xebon')) {
            $.discord.say(channel, $.lang.get('clangnetsass.xebon'));
        }

        // --- !xebondiscord command ---
        if (command.equalsIgnoreCase('xebondiscord')) {
            $.discord.say(channel, $.lang.get('clangnetsass.xebondiscord'));
        }
    });

    // initReady event to register the commands.
    $.bind('initReady', function () {
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'followed', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'followers', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'howlong', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'clothing', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'motorsports', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'pedestrian', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'movienight', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'nomovies', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'jokes', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'xebon', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'xebondiscord', 0);
    });

})();