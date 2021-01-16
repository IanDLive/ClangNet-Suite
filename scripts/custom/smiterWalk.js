/**
 * smiterWalk module, to get the boy up and walking while his leg is not in a good way!!
 */

(function () {
    var baseCommand = $.getSetIniDbString('smiterWalkSettings', 'baseCommand', 'smiterwalk');
    var walkTimer = $.getSetIniDbNumber('smiterWalkSettings', 'walkTimer', 90);
    var walkToggle = $.getSetIniDbBoolean('smiterWalkSettings', 'walkToggle', false);
    var timeElapsed = 0;

    function reloadSmiterWalk() {
        var newCommand = $.getSetIniDbString('smiterWalkSettings', 'baseCommand', 'smiterwalk');
        newCommand = newCommand.toLowerCase();
        if (newCommand != baseCommand) {
            if (!$.commandExists(newCommand)) {
                // Get command permissions
                var permBase = $.getSetIniDbString('permcom', baseCommand);
                var permWalkToggle = $.getSetIniDbString('permcom', baseCommand + ' toggle');
                var permWalkSettings = $.getSetIniDbString('permcom', baseCommand + ' settings');
                var permWalkCheck = $.getSetIniDbString('permcom', baseCommand + ' check');
                // Unregister the old commands
                $.unregisterChatSubcommand(baseCommand, 'check');
                $.unregisterChatSubcommand(baseCommand, 'settings');
                $.unregisterChatSubcommand(baseCommand, 'toggle');
                $.unregisterChatCommand(baseCommand);
                // Register the new commands
                baseCommand = newCommand;
                $.registerChatCommand('./custom/smiterWalk.js', baseCommand, permBase);
                $.registerChatSubcommand(baseCommand, 'toggle', permWalkToggle);
                $.registerChatSubcommand(baseCommand, 'settings', permWalkSettings);
                $.registerChatSubcommand(baseCommand, 'check', permWalkCheck);
            } else {
                $.inidb.set('smiterWalkSettings', 'baseCommand', baseCommand);
                $.consoleDebug($.lang.get('smiterwalk.set.command.failed'));
            }
        }
        walkTimer = $.getIniDbNumber('smiterWalkSettings', 'walkTimer');
        walkToggle = $.getIniDbBoolean('smiterWalkSettings', 'walkToggle');
    }

    function reminderBot() {
        var responseChoice = Math.floor(Math.random() * 3);
        switch (responseChoice) {
            case 0:
                $.say($.lang.get('smiterwalk.showreminder0'));
                break;
            case 1:
                $.say($.lang.get('smiterwalk.showreminder1'));
                break;
            case 2:
                $.say($.lang.get('smiterwalk.showreminder2'));
                break;
        }
    }

    function shouldBotSpeak() {
        if (walkToggle === true) {
            timeElapsed = timeElapsed + 1;
            if (timeElapsed.toString() == walkTimer) {
                reminderBot();
                timeElapsed = 0;
            }
        }
    }

    $.bind('command', function (event) {
        var command = event.getCommand(),
            sender = event.getSender(),
            args = event.getArgs();
            action = args[0];
            optionChoice = args[1];

        if (command.equalsIgnoreCase(baseCommand)) {
            if (action === undefined) {
                var displayTime = walkTimer - timeElapsed;
                $.say($.whisperPrefix(sender) + $.lang.get('smiterwalk.showtimetowalk', displayTime.toString()));
                return;
            } else {
                if (action.equalsIgnoreCase('toggle')) {
                    timeElapsed = 0;
                    walkToggle = !walkToggle;
                    $.setIniDbBoolean('smiterWalkSettings', 'walkToggle', walkToggle);
                    $.say($.lang.get('smiterwalk.subcommands.togglesuccess', baseCommand, (walkToggle === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled'))));
                    return;
                }
                if (action.equalsIgnoreCase('settings')) {
                    if ((optionChoice === undefined) || (isNaN(optionChoice))) {
                        $.say($.lang.get('smiterwalk.subcommands.settingsuse'));
                        return;
                    } else {
                        $.say($.lang.get('smiterwalk.subcommands.settingsok', optionChoice));
                        walkTimer = $.setIniDbNumber('smiterWalkSettings', 'walkTimer', optionChoice);
                        walkTimer = optionChoice;
                        return;
                    }
                }
                if (action.equalsIgnoreCase('check')) {
                    $.say($.lang.get('smiterwalk.subcommands.check', (walkToggle === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled')), walkTimer));
                    return;
                } else {
                    $.say($.lang.get('smiterwalk.subcommands.available'));
                    return;
                }
            }
        }

        if (command.equalsIgnoreCase('reloadsmiterwalk')) {
            reloadSmiterWalk();
        }
    });

    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/smiterWalk.js')) {
            $.registerChatCommand('./custom/smiterWalk.js', baseCommand, 7);
            $.registerChatSubcommand(baseCommand, 'toggle', 2);
            $.registerChatSubcommand(baseCommand, 'settings', 2);
            $.registerChatSubcommand(baseCommand, 'check', 7);
            $.registerChatCommand('./custom/smiterWalk.js', 'reloadSmiterWalk', 30);
        }
    });

    setInterval(function () { shouldBotSpeak(); }, 6e4, 'scripts::custom::smiterWalk.js');

})();