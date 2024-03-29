(function () {
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

        // --- !xebon command ---
        if (command.equalsIgnoreCase('xebon')) {
            $.discord.say(channel, $.lang.get('clangnetsass.xebon'));
        }

        // --- !xebondiscord command ---
        if (command.equalsIgnoreCase('xebondiscord')) {
            $.discord.say(channel, $.lang.get('clangnetsass.xebondiscord'));
        }

        // --- !merch command ---
        if (command.equalsIgnoreCase('merch')) {
            $.discord.say(channel, $.lang.get('clangnetsass.merch.discord'));
        }

    });

    // initReady event to register the commands.
    $.bind('initReady', function () {
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'followed', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'followers', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'howlong', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'xebon', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'xebondiscord', 0);
        $.discord.registerCommand('./discord/custom/clangnetsass-discord.js', 'merch', 0);
    });

})();