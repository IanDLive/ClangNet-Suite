(function () {

    var lastTick = $.getSetIniDbString('edinfo-discord', 'storedTick', '[none]');
    var reportChannel = $.getSetIniDbString('edinfo-discord', 'reportChannel', '[none]');
    var currentTick;
    var formattedDate;
    var formattedTime;

    function getBGSTick() {
        var jsonObject;
        var returnText;

        jsonObject = JSON.parse($.cnGetJSON('https://tick.edcd.io/api/tick'));
        return jsonObject;
    }

    function formatDate(date) {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var curLongDay = days[date.getDay()];
        var curDay = date.getDate();
        var curMonth = months[date.getMonth()];
        var curYear = 1900 + date.getYear();
        return curLongDay + ' ' + curDay + ' ' + curMonth + ', ' + curYear;
    }

    function formatTime(time) {
        var curHour = time.getHours();
        var curMinute = time.getMinutes();

        function pad(n) {
            return (n < 10 ? '0' : '') + n;
        }

        return pad(curHour) + ':' + pad(curMinute) + ' UTC';
    }

    function postTick(isBot) {
        currentTick = new Date(getBGSTick());
        if (lastTick === '[none]') {
            lastTick = $.setIniDbString('edinfo-discord', 'storedTick', currentTick);
        }
        formattedDate = formatDate(currentTick);
        formattedTime = formatTime(currentTick);
        if (isBot) {
            if (currentTick.getTime() > lastTick.getTime()) {
                lastTick = $.setIniDbString('edinfo-discord', 'storedTick', currentTick);
                $.discord.say(reportChannel, $.lang.get('edinfo.discord.tickupdated'));
            } else {
                return;
            }
        }
        $.discordAPI.sendMessageEmbed(reportChannel, new Packages.tv.phantombot.discord.util.EmbedBuilder()
            .withColor(252, 111, 33)
            .withTitle('Last BGS Tick')
            .appendField('Date', formattedDate, true)
            .appendField('Time', formattedTime, true)
            .withTimestamp(Date.now())
            .build()
        );
        return;
    }

    function checkTick() {
        if ($.bot.isModuleEnabled('./scripts/discord/custom/edinfo-discord.js')) {
            if (reportChannel === '[none]') {
                $.consoleLn('[EDINFO-DISCORD] No report channel set. Please set a report channel.');
            } else {
                postTick(true);
            }
            return;
        }
    }

    function forceTick(curChannel) {
        currentTick = new Date(getBGSTick());
        lastTick = $.setIniDbString('edinfo-discord', 'storedTick', currentTick);
        $.discord.say(curChannel, $.lang.get('edinfo.discord.forcetick'));
        return;
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

        if (command.equalsIgnoreCase('tick') && channelCheck.equalsIgnoreCase('elite-dangerous')) {
            if (action === undefined) {
                if (reportChannel === '[none]') {
                    $.discord.say(channel, $.lang.get('edinfo.discord.noreportchannel'));
                    return;
                } else {
                    postTick(false);
                    return;
                }
            } else {
                if (action.equalsIgnoreCase('force')) {
                    forceTick(channel);
                    return;
                }
                if (action.equalsIgnoreCase('setchannel')) {
                    if (args[1] === undefined || args[1] == null) {
                        $.discord.say(channel, $.lang.get('edinfo.discord.reportchannelnotset'));
                        return;
                    } else {
                        reportChannel = $.discord.sanitizeChannelName(args[1]);
                        if (reportChannel.equals('clear')) {
                            $.inidb.set('edinfo-discord', 'reportChannel', '[none]');
                            $.discord.say(channel, $.lang.get('edinfo.discord.reportchannelcleared'));
                            return;
                        } else {
                            $.inidb.set('edinfo-discord', 'reportChannel', reportChannel);
                            $.discord.say(channel, $.lang.get('edinfo.discord.reportchannelset', reportChannel));
                            return;
                        }
                    }
                }
            }
            return;
        }

    });

    // initReady event to register the commands
    $.bind('initReady', function () {
        $.discord.registerCommand('./discord/custom/edinfo-discord.js', 'tick', 0);
        $.discord.registerSubCommand('tick', 'force', 1);
        $.discord.registerSubCommand('tick', 'setchannel', 1);
    });

    setTimeout(function () {
        setInterval(function () { checkTick(); }, 6e4, 'discord::custom::edinfo-discord.js');
    }, 5e3);

})();