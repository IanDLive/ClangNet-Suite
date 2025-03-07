(function () {

    function getBGSTick() {
        var jsonObject;
        var returnText;

        jsonObject = JSON.parse($.cnGetJSON('https://elitebgs.app/api/ebgs/v5/ticks'));
        returnText = jsonObject[0].updated_at;
        return returnText;
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

        return curHour + ':' + curMinute + ' UTC';
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
        var currentTick;

        if (command.equalsIgnoreCase('tick') && channelCheck.equalsIgnoreCase('elite-dangerous')) {
            currentTick = new Date(getBGSTick());
            var formattedDate = formatDate(currentTick);
            var formattedTime = formatTime(currentTick);
            $.discordAPI.sendMessageEmbed(channel, new Packages.tv.phantombot.discord.util.EmbedBuilder()
                .withColor(252, 111, 33)
                .withTitle('Last BGS Tick')
                .appendField('Date', formattedDate, true)
                .appendField('Time', formattedTime, true)
                .withTimestamp(Date.now())
                .build()
            );
            return;
        }

    });

    // initReady event to register the commands
    $.bind('initReady', function () {
        $.discord.registerCommand('./discord/custom/edinfo-discord.js', 'tick', 0);
    });

})();