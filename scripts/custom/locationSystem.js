// Location Commands - locationSystem
// ----------------------------------
// Allows users to determine stream location based on retrieval from database.
//

(function () {

    // General variables for the functions.
    var curLocation = $.getSetIniDbString('locationSystem', 'location', 'Home');

    function initText() {
        curLocation = $.getIniDbString('locationSystem', 'location');
        $.consoleLn("+++>>> Stream Location commands module online");
        return;
    }

    function reloadLocation() {
        curLocation = $.getIniDbString('locationSystem', 'location');
    }

    // Command Event
    $.bind('command', function (event) {
        var command = event.getCommand();
        var sender = event.getSender();
        var args = event.getArgs();
        var action = args[0];
        var newLocation = args[1];

        if (command.equalsIgnoreCase('location')) {
            if (action === undefined) {
                reloadLocation();
                if (curLocation == 'Home') {
                    $.say($.lang.get('locationSystem.home'));
                    return;
                } else {
                    $.say($.lang.get('locationSystem.otr', curLocation));
                    return;
                }
            } else {
                if (action.equalsIgnoreCase('set')) {
                    if (newLocation === undefined || newLocation == null) {
                        $.say($.lang.get('locationSystem.nolocation'));
                    } else {
                        curLocation = newLocation;
                        $.setIniDbString('locationSystem', 'location', curLocation);
                        $.say($.lang.get('locationSystem.updated', curLocation));
                    }
                    return;
                }
                if (action.equalsIgnoreCase('clear')) {
                    curLocation = 'Home';
                    $.setIniDbString('locationSystem', 'location', curLocation);
                    $.say($.lang.get('locationSystem.cleared'));
                    return;
                }
            }
        }
    });

    // initReady event to register the commands.
    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/locationSystem.js')) {
            initText();
            $.registerChatCommand('./custom/locationSystem.js', 'location', 7);
            $.registerChatSubcommand('location', 'set', 2);
            $.registerChatSubcommand('location', 'clear', 2);
        }
    });

    $.reloadLocation = reloadLocation;
}) ();