/**
 * smiterWalk module, to get the boy up and walking while his leg is not in a good way!!
 */

(function () {
    var baseCommand = $.getSetIniDbString('smiterWalkSettings', 'baseCommand', 'smiterwalk');
    var walkTimer = $.getSetIniDbNumber('smiterWalkSettings', 'walkTimer', 90);
    var walkToggle = $.getSetIniDbBoolean('smiterWalkSettings', 'walkToggle', false);
    var audioToggle = $.getSetIniDbBoolean('smiterWalkSettings', 'audioToggle', false);
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
                var permWalkReset = $.getSetIniDbString('permcom', baseCommand + ' reset');
                var permWalkAudio = $.getSetIniDbString('permcom', baseCommand + ' audio');
                var permWalkCheck = $.getSetIniDbString('permcom', baseCommand + ' check');
                // Unregister the old commands
                $.unregisterChatSubcommand(baseCommand, 'check');
                $.unregisterChatSubcommand(baseCommand, 'audio');
                $.unregisterChatSubcommand(baseCommand, 'reset');
                $.unregisterChatSubcommand(baseCommand, 'settings');
                $.unregisterChatSubcommand(baseCommand, 'toggle');
                $.unregisterChatCommand(baseCommand);
                // Register the new commands
                baseCommand = newCommand;
                $.registerChatCommand('./custom/smiterWalk.js', baseCommand, permBase);
                $.registerChatSubcommand(baseCommand, 'toggle', permWalkToggle);
                $.registerChatSubcommand(baseCommand, 'settings', permWalkSettings);
                $.registerChatSubCommand(baseCommand, 'reset', permWalkReset);
                $.registerChatSubcommand(baseCommand, 'audio', permWalkAudio);
                $.registerChatSubcommand(baseCommand, 'check', permWalkCheck);
            } else {
                $.inidb.set('smiterWalkSettings', 'baseCommand', baseCommand);
                $.consoleDebug($.lang.get('smiterwalk.set.command.failed'));
            }
        }
        walkTimer = $.getIniDbNumber('smiterWalkSettings', 'walkTimer');
        walkToggle = $.getIniDbBoolean('smiterWalkSettings', 'walkToggle');
        audioToggle = $.getIniDbBoolean('smiterWalkSettings', 'audioToggle');
    }

    function reminderBot() {
        var responseChoice = Math.floor(Math.random() * 3);
        if (audioToggle === true) {
            $.alertspollssocket.triggerAudioPanel('Smite_Me_Smiter');
        }
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
        return;
    }

    function shouldBotSpeak() {
        if ($.isOnline($.channelName)) {
            if (walkToggle === true) {
                timeElapsed = timeElapsed + 1;
                if (timeElapsed == walkTimer) {
                    reminderBot();
                    timeElapsed = 0;
                }
            }
        }
        return;
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
                if (action.equalsIgnoreCase('reset')) {
                    timeElapsed = 0;
                    $.say($.lang.get('smiterwalk.subcommands.reset'));
                    return;
                }
                if (action.equalsIgnoreCase('audio')) {
                    audioToggle = !audioToggle;
                    $.setIniDbBoolean('smiterWalkSettings', 'audioToggle', audioToggle);
                    $.say($.lang.get('smiterwalk.subcommands.audiotogglesuccess', baseCommand, (audioToggle === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled'))));
                    return;
                }
                if (action.equalsIgnoreCase('check')) {
                    $.say($.lang.get('smiterwalk.subcommands.check', (walkToggle === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled')), walkTimer, (audioToggle === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled'))));
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
            $.registerChatSubcommand(baseCommand, 'reset', 2);
            $.registerChatSubcommand(baseCommand, 'audio', 2);
            $.registerChatSubcommand(baseCommand, 'check', 7);
            $.registerChatCommand('./custom/smiterWalk.js', 'reloadSmiterWalk', 30);
        }
    });

    setInterval(function () { shouldBotSpeak(); }, 6e4, 'scripts::custom::smiterWalk.js');

})();