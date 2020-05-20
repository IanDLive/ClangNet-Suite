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

        // Decision loops set up to parse an argument that is passed with the command.
        // The first conditional statement also checks as to whether the command originated
        //     in the '#games-room' channel of the Discord server.  This can be changed to whatever
        //     chat room on your server you want if you want to lock it down to one channel to reduce
        //     spam in all or any other channels, or remove that part of the condition to make it 
        //     open to all.
        // The second conditional statement checks to see whenther the 'total' parameter was passed
        //     to the command - this returns the total number of jokes in the database.
        // The third conditional statement applies the number that has been entered with the command
        //     to return the specific joke.  If a number is not supplied then a default error from the 
        //     API is returned.
        // If no argument is passed, then a random joke is returned.
        if (command.equalsIgnoreCase('chuck') && channel.equalsIgnoreCase('games-room')) {
            if (arguments.equalsIgnoreCase('total')) {
                jsonObject = JSON.parse($.cnGetJSON('https://api.icndb.com/jokes/count'));
                $.discord.say(channel, $.lang.get('chuckjokes.totaljokes', jsonObject.value));
                return;
            }
            if (args[0] !== undefined) {
                jsonObject = JSON.parse($.cnGetJSON('https://api.icndb.com/jokes/' + args[0]));
                $.discord.say(channel, $.lang.get('chuckjokes.joke', jsonObject.value.id, jsonObject.value.joke));
            } else {
                jsonObject = JSON.parse($.cnGetJSON('https://api.icndb.com/jokes/random'));
                $.discord.say(channel, $.lang.get('chuckjokes.joke', jsonObject.value.id, jsonObject.value.joke));
            }
        }
    });

    // initReady event to register the commands.
    $.bind('initReady', function() {
        // See Twitch custom command for structure details.
        $.discord.registerCommand('./discord/custom/chuckjokes-discord.js', 'chuck', 0);
    });
})();