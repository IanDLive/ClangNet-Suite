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

        // --- !wenStream command ---
        if (command.equalsIgnoreCase('wenstream')) {

            // Prepare a snarky comment
            var snarkyComment = Math.floor(Math.random() * 6);

            
            var channelName = "iandlive";
            var twitchID; 

            // Get Twitch ID
            twitchID = $.username.getID(channelName);

            // Check for stream with channelName that is Live
            var query = twitchID.slice(0, 100).join(',') + '&stream_type=live';
            var jsonObject = $.twitch.getStreams(query);

            // Check stream running
            if (jsonObject.has('streams')) {
                $.discord.say(channel, $.lang.get('wenstream.responseOn'));
                return;
            }   else {

                switch (snarkyComment) {
                    case 0:
                        $.discord.say(channel, $.lang.get('wenstream.response0'));
                        break;
                    case 1:
                        $.discord.say(channel, $.lang.get('wenstream.response1'));
                        break;
                    case 2:
                        $.discord.say(channel, $.lang.get('wenstream.response2'));
                        break;
                    case 3:
                        $.discord.say(channel, $.lang.get('wenstream.response3'));
                        break;
                    case 4:
                        $.discord.say(channel, $.lang.get('wenstream.response4'));
                        break;
                    case 5:
                        $.discord.say(channel, $.lang.get('wenstream.response5'));
                        break;
                }
            }

        }

    });

    // Register command
    $.bind('initReady', function () {
        $.discord.registerCommand('./discord/custom/wenstream-discord.js', 'wenstream', 0);
    })
});