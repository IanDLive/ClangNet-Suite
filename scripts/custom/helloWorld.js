// ***** HELLO WORLD PHANTOMBOT SCRIPT *****

// This is a basic module script for PhantomBot that gives a rough outline on how to add
// chat commands to the bot from a scripting point of view, which can be expanded on to
// make the commands specific for your own uses.
//
// This script HAS TO BE IN THE SCRIPTS FOLDER, and for better organisation of your scripts,
// maybe even within a custom subfolder.  Where you put it is up to you but it is important
// that you remmeber where you put it.  For this example this script would be located at 
// PHANTOMBOT/Scripts/Custom

(function () {

    // At this part of the module you can write functions that you may call from other parts
    // of the script.
    function initText() {
        // This next line will display in the console window to show that the module is
        // loaded (when it is called from the initialisation script).
        $.consoleLn('+++>>> Hello World module loaded');
        return;
    }

    // The "command" event - this is the listener that looks at what is typed in chat after
    // an "!" (i.e. !hellothere) so that is can execute the scipt commands appropriately.
    $.bind('command', function (event) {
        // At this point we can manipulate information that had been generated with the
        // command event, and place them into variables so that we can manipulate them as
        // we want to later on.
        var command = event.getCommand();
        var sender = event.getSender();
        var arguments = event.getArguments();
        var args = event.getArgs();

        // Now that some of the information that has been passed with the event has been
        // extracted, now we'll start using that info to build a command.  The "if"
        // statement that is used below checks if the string has been used as a command
        // (i.e. !hellothere) in chat, note that it doesn't have the "!" in the comparison
        // string as the "!" is what has allowed it to get here in the first place and is
        // stripped from the data in the event.  "equalsIgnoreCase" is a bit of a boon when
        // being used for the if statement as it doesn't care how it's been typed in chat.
        //
        // This command will get the bot to reply to you with the string that you see below.
        if (command.equalsIgnoreCase('hellothere')) {
            $.say('Well hello there ' + sender);
            return;
        }
    });

    // The "initReady" event - this is called when the module is loaded on the startup of
    // the bot or when the module is enabled.  Here you can determine if you are going to
    // add the commands to the bot based on the module being enabled or not, as well as
    // declaring the commands so that they are recognised as such, as well as stting the
    // permissions for the command.
    //
    // To register the command, you use the $.registerChatCommand function which has the
    // parameters os <SCRIPT LOCATION>, <COMMAND NAME> and <PERMISSION LEVEL> in that order.
    // The first two are quite self explanatory, however the permission levels are the same
    // as you see them within the permissions part of the web panel, but they are:
    //    0 = Caster
    //    1 = Administrator
    //    2 = Moderator
    //    3 = Subscriber
    //    4 = Donator
    //    5 = VIP
    //    6 = Regular
    //    7 = Viewer
    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/helloWorld.js')) {
            initText(); // The function above that displays the line within the console when loaded.
            $.registerChatCommand('./custom/helloWorld.js', 'hellothere', 7);
        }
    });

})();
