// Kerbal Space Program Commands - kpskommand
// ==========================================
//
// Chat message responses for Kerbal Space Program related commands.

(function () {
    var noticeReqMessages = $.getIniDbNumber('noticeSettings', 'reqmessages');
    var noticeInterval = $.getIniDbNumber('noticeSettings', 'interval');
    var messageCount = 0;
    var lastNoticeSent = 0;

    var baseCommand = $.getSetIniDbString('kspkommandSettings', 'baseCommand', 'kontracts');
    var allowOffline = $.getSetIniDbBoolean('kspkommandSettings', 'allowOffline', false);
    var curKontract = $.getSetIniDbString('kspkommandSettings', 'kontract', 'Kurrent Kontract - N/A');
    var filePath = './addons/custom/ksp/kontracts.txt';
    var kontractStart = 'Kurrent Kontract - ';

    function reloadKontracts() {
        var newCommand = $.getSetIniDbString('kspkommandSettings', 'baseCommand', 'kontracts');
        newCommand = newCommand.toLowerCase();
        if (newCommand != baseCommand) {
            // Get command permissions
            var permBase = $.getSetIniDbString('permcom', baseCommand);
            var permSet = $.getSetIniDbString('permcom', baseCommand + ' set');
            var permClear = $.getSetIniDbString('permcom', baseCommand + ' clear');
            // Unregister the old commands
            $.unregisterChatSubcommand(baseCommand, 'clear');
            $.unregisterChatSubcommand(baseCommand, 'set');
            $.unregisterChatCommand(baseCommand);
            // Register the new commands
            baseCommand = newCommand;
            $.registerChatCommand('./custom/kspkommand.js', baseCommand, permBase);
        } else {
            $.inidb.set('kspkommandSettings', 'baseCommand', baseCommand);
        }
    }

    function initText() {
        allowOffline = $.getIniDbBoolean('kspkommandSettings', 'allowOffline');
        $.consoleLn("╔═════════════════════════════════════════════════╗");
        $.consoleLn("║           KSP commands module online            ║");
        $.consoleLn("╚═════════════════════════════════════════════════╝");
    }

    function sayKontracts() {
        $.say($.lang.get('kspkommand.kontracts'));
    }

    function kspTimerBot() {
        var currentGame;
        var intTimerChoice = Math.floor(Math.random() * 1);

        currentGame = $.getGame($.channelName);
        if ($.isOnline($.channelName) && currentGame.equalsIgnoreCase('kerbal space program')) {
            switch (intTimerChoice) {
                case 0:
                    sayKontracts();
                    break;
            }
        }
    }

    $.bind('ircChannelMessage', function (event) {
        messageCount++;
    });

    $.bind('command', function (event) {
        var command = event.getCommand();
        var args = event.getArgs();
        var action = args[0];
        var optionValue = args[1];
        var currentGame;
        var currentKontract;

        currentGame = $.getGame($.channelName);
        allowOffline = $.getIniDbBoolean('kspkommandSettings', 'allowOffline');
        if ($.isOnline($.channelName) || allowOffline == true) {
            if (currentGame.equalsIgnoreCase('kerbal space program') || allowOffline == true) {
                // --- !kontracts command ---
                if (command.equalsIgnoreCase(baseCommand)) {
                    // Display link to list of kontracts.
                    if (action === undefined) {
                        sayKontracts();
                        return;
                    }
                    // Set the cuurent kontract on stream display.
                    if (action.equalsIgnoreCase('set')) {
                        if (optionValue === undefined) {
                            $.say($.lang.get('kspkommand.kontracts.notspecified'));
                            return;
                        } else {
                            currentKontract = kontractStart + optionValue;
                            $.writeToFile(currentKontract, filePath, false);
                            $.say($.lang.get('kspkommand.kontracts.success'));
                            return;
                        }
                    }
                    // Clear the current kontract on stream display.
                    if (action.equalsIgnoreCase('clear')) {
                        currentKontract = kontractStart + 'N/A';
                        $.writeToFile(currentKontract, filePath, false);
                        $.say($.lang.get('kspkommand.kontracts.cleared'))
                        return;
                    }
                }
            } else {
                $.say($.lang.get('kspkommand.playing.othergame'));
                return;
            }
        } else {
            $.say($.lang.get('kspkommand.offline'));
        }

        // Universal commands not requiring KSP to be running
        if (command.equalsIgnoreCase('kspofflinemode')) {
            allowOffline = $.getIniDbBoolean('kspkommandSettings', 'allowOffline');
            if (allowOffline == false) {
                allowOffline = true;
                $.setIniDbBoolean('kspkommandSettings', 'allowOffline', true);
                $.say($.lang.get('kspkommand.offlinemodetrue'));
                $.consoleLn($.lang.get('kspkommand.offlinemodetrue'));
            } else {
                allowOffline = false;
                $.setIniDbBoolean('kspkommandSettings', 'allowOffline', false);
                $.say($.lang.get('kspkommand.offlinemodefalse'));
                $.consoleLn($.lang.get('kspkommand.offlinemodefalse'));
            }
            return;
        }

    });

    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/kspkommand.js')) {
            initText();
            $.registerChatCommand('./custom/kspkommand.js', baseCommand, 7);
            $.registerChatSubcommand(baseCommand, 'set', 2);
            $.registerChatSubcommand(baseCommand, 'clear', 2);
            $.registerChatCommand('./custom/kspkommand.js', 'kspofflinemode', 1);
        }
    });

    setTimeout(function () {
        setInterval(function () {
            if ((noticeReqMessages < 0 || messageCount >= noticeReqMessages) && (lastNoticeSent + (noticeInterval * 6e4)) <= $.systemTime()) {
                kspTimerBot();
                messageCount = 0;
                lastNoticeSent = $.systemTime();
            }
        }, 1e4, 'scripts::custom::kspkommand.js');
    }, 5e3);

    $.reloadKontracts = reloadKontracts;

})();