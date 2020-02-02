(function () {

     // Command events
    $.bind('discordChannelCommand', function (event) {
        var command = event.getCommand();
        var sender = event.getSender();
        var channel = event.getDiscordChannel();
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

        // --- !merchandise command ---
        if (command.equalsIgnoreCase('merchandise')) {
            $.discord.say(channel, $.lang.get('clangnetsass.merchandise'));
        }

        // --- !motorsports command ---
        if (command.equalsIgnoreCase('motorsports')) {
            $.discordAPI.addRole('Motorsports', discordUser);
            $.discord.say(channel, $.lang.get('clangnetsass.motorsports.discord', discordUser));
        }

        // --- !pedestrian command ---
        if (command.equalsIgnoreCase('pedestrian')) {
            $.discordAPI.removeRole($.discordAPI.getRole('Motorsports'), discordUser);
            $.discord.say(channel, $.lang.get('clangnetsass.pedestrian.discord', discordUser));
        }

        // --- !movienight command ---
        if (command.equalsIgnoreCase('movienight')) {
            $.discordAPI.addRole('Movienight', discordUser);
            $.discord.say(channel, $.lang.get('clangnetsass.movienight.discord', discordUser));
        }
        // --- !nomovies command ---
        if (command.equalsIgnoreCase('nomovies')) {
            $.discordAPI.removeRole($.discordAPI.getRole('Movienight'), discordUser);
            $.discord.say(channel, $.lang.get('clangnetsass.nomovies.discord', discordUser));
        }
    });

    // initReady event to register the commands.
    $.bind('initReady', function () {
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'followed', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'followers', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'howlong', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'clothing', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'merchandise', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'motorsports', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'pedestrian', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'movienight', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'nomovies', 0);
    });

})();