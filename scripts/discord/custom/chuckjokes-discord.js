(function() {
    // Command event.
    $.bind('discordChannelCommand', function(event) {
        // All of the default methods are stored in the event argument.
        // To access a method, you would do 'event.myMethod()'.

        // Register all of the methods into variables for ease/readability.
        var command = event.getCommand();
        var sender = event.getSender();
        var channel = event.getChannel();
        var arguments = event.getArguments();
        var args = event.getArgs();

        // Get a list of all of the Chuck Norris joke categories.
        function getChuckCategories() {
            var jsonObject;
            jsonObject = JSON.parse($.cnGetJSON('https://api.chucknorris.io/jokes/categories'));
            return jsonObject;
        }

        // Get a single random Chuck Norris joke.
        function getChuck() {
            var jsonObject;
            jsonObject = JSON.parse($.cnGetJSON('https://api.chucknorris.io/jokes/random'));
            return jsonObject.value;
        }

        // Command event to check for the 'chuck' command.
        if (command.equalsIgnoreCase('chuck') && channel.equalsIgnoreCase('games-room')) {
            $.discord.say(channel, $.lang.get('chuckjokes.telljoke.discord', getChuck()));
        }

    });

    // initReady event to register the commands.
    $.bind('initReady', function() {
        // See Twitch custom command for structure details.
        $.discord.registerCommand('./discord/custom/chuckjokes-discord.js', 'chuck', 0);
    });
})();