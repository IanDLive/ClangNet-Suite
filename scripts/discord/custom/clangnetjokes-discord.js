(function () {

    // Retrieve a Dad Joke from the API and say it in chat, use to make independent of bot timers.
    function getAnyJoke() {
        var jsonObject;
        var intJokeChoice = Math.floor(Math.random() * 3);
        var strJoke;

        switch (intJokeChoice) {
            case 0:
                jsonObject = JSON.parse($.cnGetJSON('https://icanhazdadjoke.com/slack', null));
                strJoke = jsonObject.attachments[0].text;
                break;
            case 1:
                jsonObject = JSON.parse($.cnGetJSON('https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&type=single', null));
                strJoke = jsonObject.joke;
                break;
            case 2:
                jsonObject = JSON.parse($.cnGetJSON('https://uselessfacts.jsph.pl/random.json?language=en', null));
                strJoke = 'Useless Fact: ' + jsonObject.text;
                break;
        }
        return strJoke;
    }

    function getAnyEmote() {
        var intEmoteChoice = Math.floor(Math.random() * 4);
        var strEmoteChoice;

        switch (intEmoteChoice) {
            case 0:
                strEmoteChoice = '<:porTriHard:685851046249103419>';
                break;
            case 1:
                strEmoteChoice = '<:porNotLikeThis:685851046509019210>';
                break;
            case 2:
                strEmoteChoice = '<:porPogChamp:685851045980667935>';
                break;
            case 3:
                strEmoteChoice = '<:porLUL:685851045989187625>';
                break;
        }
        return strEmoteChoice;
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

        // --- !jokes command ---
        if (command.equalsIgnoreCase('jokes') && channelCheck.equalsIgnoreCase('games-room')) {
            $.discord.say(channel, $.lang.get('clangnetjokes.telljoke.discord', getAnyJoke(), getAnyEmote()));
        }

    });

    // initReady event to register the commands.
    $.bind('initReady', function () {
        $.discord.registerCommand('./discord/custom/clangnetjokes-discord.js', 'jokes', 0);
    });

})();