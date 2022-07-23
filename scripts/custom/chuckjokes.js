(function() {

    function chuckTotal() {
        const apiURL = 'http://api.icndb.com/jokes/count';
        var dataPackage = JSON.parse($.cnGetJSON(apiURL));
        $.say($.lang.get('chuckjokes.totaljokes', dataPackage.value));
    }

    function chuckSpecific(factNo) {
        var apiURL = 'http://api.icndb.com/jokes/' + factNo + '?escape=javascript&exclude=[nerdy,explicit]';
        var dataPackage = JSON.parse($.cnGetJSON(apiURL));
        $.say($.lang.get('chuckjokes.joke', dataPackage.value.id, dataPackage.value.joke));
    }

    function chuckRandom() {
        const apiURL = 'http://api.icndb.com/jokes/random?escape=javascript&exclude=[nerdy,explicit]';
        var dataPackage = JSON.parse($.cnGetJSON(apiURL));
        $.say($.lang.get('chuckjokes.joke', dataPackage.value.id, dataPackage.value.joke));
    }

    // Command event
    $.bind('command', function(event) {
        // All of the default methods are stored in the event argument.
        // To access a method, you would do 'event.myMethod()'.

        // Register all of the methods into variables for ease/readability.
        var command = event.getCommand();
        var sender = event.getSender();
        var arguments = event.getArguments();
        var args = event.getArgs();

        // Decision loops set up to parse an argument that is passed with the command.
        // If no argument is passed, then a random joke is returned.
        if (command.equalsIgnoreCase('chuck')) {
            if (arguments.equalsIgnoreCase('total')) {
                chuckTotal();
                return;
            }
            if (args[0] !== undefined) {
                chuckSpecific(args[0]);
                return;
            } else {
                chuckRandom();
                return;
            }
        }
    });

    // initReady event to register the commands.
    $.bind('initReady', function() {
        // 'script' is the script location.  IT MUST BE IN SCRIPTS!!!
        // 'command' is the command name without the '!' prefix.
        // 'permission' is the group number from 0, 1, 2, 3, 4, 5, 6 and 7.
        // These are also used for the 'permcom' command.
        // $.registerChatCommand('script', 'command', 'permission');
        $.registerChatCommand('./custom/chuckjokes.js', 'chuck', 2);
    });

    $.cnChuckRandom = chuckRandom;
})();