/**
 * fettleSystem.js
 * 
 * Fettle System
 * 
 * A modified and customized version of the Health System by Dakoda
 * 
 * Original PhantomBot Community Formum thread:
 * https://community.phantombot.tv/t/wellness-feature-then-some/3931
 * 
 */
(function() {
    // General settings
    var baseCommand = $.getSetIniDbString('fettleSettings', 'baseCommand', 'fettle');
    // Hydration settings
    var hydrationml = $.getSetIniDbNumber('fettleSettings', 'hydrationml', 250);
    var hydrationtimer = $.getSetIniDbNumber('fettleSettings', 'hydrationtimer', 60);
    var hydrationtoggle = $.getSetIniDbBoolean('fettleSettings', 'hydrationtoggle', true);
    // Hunger settings
    var hungertimer = $.getSetIniDbNumber('fettleSettings', 'hungertimer', 480);
    var hungertoggle = $.getSetIniDbBoolean('fettleSettings', 'hungertoggle', true);

    /**
     * @function reloadFettle
     */
    function reloadFettle() {
        var newCommand = $.getSetIniDbString('fettleSettings', 'baseCommand', 'fettle');
        newCommand = newCommand.toLowerCase();
        if (newCommand != baseCommand) {
            if (!$.commandExists(newCommand)) {
                // Get commands permissions
                var permBase = $.getSetIniDbString('permcom', baseCommand);
                var permSetToggle = $.getSetIniDbString('permcom', baseCommand + ' toggle');
                var permSetHydration = $.getSetIniDbString('permcom', baseCommand + ' hydration');
                var permSetHunger = $.getSetIniDbString('permcom', baseCommand + ' hunger');
                var permBaseSettings = $.getSetIniDbString('permcom', baseCommand + 'settings');
                var permBaseSettingsCheck = $.getSetIniDbString('permcom', baseCommand + 'settings check');
                var permBaseSettingsSet = $.getSetIniDbString('permcom', baseCommand + 'settings set');
                // Unregister the old commands
                $.unregisterChatSubcommand(baseCommand, 'toggle');
                $.unregisterChatSubcommand(baseCommand, 'hydration');
                $.unregisterChatSubcommand(baseCommand, 'hunger');
                $.unregisterChatCommand(baseCommand);
                $.unregisterChatSubcommand(baseCommand + 'settings', 'check');
                $.unregisterChatSubcommand(baseCommand + 'settings', 'set');
                $.unregisterChatCommand(baseCommand + 'settings');
                // Register the new commands
                baseCommand = newCommand;
                $.registerChatCommand('./custom/fettleSystem.js', baseCommand, permBase);
                $.registerChatSubcommand(baseCommand, 'toggle', permSetToggle);
                $.registerChatSubcommand(baseCommand, 'hydration', permSetHydration);
                $.registerChatSubcommand(baseCommand, 'hunger', permSetHunger);
                $.registerChatCommand('./custom/fettleSystem.js', baseCommand + 'settings', permBaseSettings);
                $.registerChatSubcommand(baseCommand + 'settings', 'check', permBaseSettingsCheck);
                $.registerChatSubcommand(baseCommand + 'settings', 'set', permBaseSettingsSet);
            } else {
                $.inidb.set('fettleSettings', 'baseCommand', baseCommand);
                $.consoleDebug($.lang.get('fettlesystem.set.basecommand.failed', newCommand));
            }
        }
        // Hydration settings
        hydrationml = $.getIniDbNumber('fettleSettings', 'hydrationml'), 
        hydrationtimer = $.getIniDbNumber('fettleSettings', 'hydrationtimer'), 
        hydrationtoggle = $.getIniDbBoolean('fettleSettings', 'hydrationtoggle');
        // Hunger settings
        hungertimer = $.getIniDbNumber('fettleSettings', 'hungertimer'), 
        hungertoggle = $.getIniDbBoolean('fettleSettings', 'hungertoggle');
    }


    /**
     * @function createUptimeStr
     */
    function createUptimeStr(numHours) {
        var createdString;
        if (numHours == 1) {
            createdString = numHours.toString() + ' ' + $.lang.get('common.time.hour');
        } else {
            createdString = numHours.toString() + ' ' + $.lang.get('common.time.hours');
        }
        return createdString;
    }


    /**
     * @function hydrationReminder
     */
    function hydrationReminder(cmd, timer, sender) {
        var uptime = Math.floor($.getStreamUptimeSeconds($.channelName) / 3600);
        var uptimeStr;
        // Get ml count
        var hydrationcountml = (getUptimeMinutes() * (hydrationml / 60)).toFixed(2), 
            hydrationcountoz = (hydrationcountml * 0.03381402).toFixed(1);
        uptimeStr = createUptimeStr(uptime);
        // Check whether the timer hit or if someone invoked the command
        if (timer && sender === 'reminder') {
            // Broadcast a response
            if ($.isOnline($.channelName)) {
                $.say($.lang.get('fettlesystem.hydration.reminder', uptimeStr, hydrationcountml, hydrationcountoz));
                return;
            }
        } else {
            if (timer) {
                // Broadcast a response
                if ($.isOnline($.channelName)) {
                    $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.hydration.command', $.username.resolve($.channelName), uptimeStr, hydrationcountml, hydrationcountoz));
                    return;
                } else {
                    $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.fettle.offline', baseCommand, cmd, $.channelName));
                    return;
                }
            }
        }
    }

    /**
     * @function hungerReminder
     */
    function hungerReminder(cmd, timer, sender) {
        var uptime = Math.floor($.getStreamUptimeSeconds($.channelName) / 3600);
        var uptimeStr;
        // Get hunger timer
        var hungertime = Math.floor(getUptimeMinutes() / $.getSetIniDbNumber('fettleSettings', 'hungertimer')), 
            timetoeat = $.getSetIniDbNumber('fettleSettings', 'hungertimer') - (getUptimeMinutes() - (hungertime * $.getSetIniDbNumber('fettleSettings', 'hungertimer')));
        uptimeStr = createUptimeStr(uptime);
        // Check whether the timer hit or if someone invoked the command
        if (timer && sender === 'reminder') {
            // Broadcast a response
            if ($.isOnline($.channelName)) {
                $.say($.lang.get('fettlesystem.hunger.reminder', uptimeStr));
                return;
            }
        } else {
            if (timer) {
                // Broadcast a response
                if ($.isOnline($.channelName)) {
                    $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.hunger.command', $.username.resolve($.channelName), uptimeStr, timetoeat));
                    return;
                } else {
                    $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.fettle.offline', baseCommand, cmd, $.channelName));
                    return;
                }
            }
        }
    }

    /**
     * @function reminderBot
     */
    function reminderBot() {
        if ($.bot.isModuleEnabled('./custom/fettleSystem.js')) {
            if (hydrationtoggle == true) {
                hydrationReminder(null, checkTimer('hydrationtimer'), 'reminder');
            }
            if (hungertoggle == true) {
                hungerReminder(null, checkTimer('hungertimer'), 'reminder');
            }
        }
    }

    /**
     * @function getUptimeMinutes
     */
    function getUptimeMinutes() {
        var uptimesec = $.getStreamUptimeSeconds($.channelName),
            uptimeminutes = Math.floor(uptimesec / 60);
        return uptimeminutes;
    }

    /**
     * @function checkTimer
     */
    function checkTimer(timer) {
        var timerminutes = Math.floor($.getIniDbNumber('fettleSettings', timer));
        // Prevent activation at the start of the stream
        var timerhits = getUptimeMinutes() / timerminutes;
            timercheck = timerhits - Math.floor(timerhits);
        if (getUptimeMinutes() < 5) {
            return false;
        }
        $.consoleDebug('Fettle system: ' + timer + ' timer check --> ' + !timercheck);
        return !timercheck;
    }

    /**
     * @event command
     */
    $.bind('command', function(event) {
        var command = event.getCommand(),
            sender = event.getSender(),
            args = event.getArgs();
            action = args[0];
            optionChoice = args[1];
            optionValue = args[2];
            optionValue2 = args[3];

        if (command.equalsIgnoreCase(baseCommand)) {
            if (action === undefined) {
                $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.fettle.usage', baseCommand));
                return;
            }
            // @commandpath "baseCommand" toggle - Base command for controlling the fettle toggles
            if (action.equalsIgnoreCase('toggle')) {
                if (optionChoice === undefined) {
                    $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.toggle.usage', baseCommand));
                    return;
                } else {
                    var fettleToggles = $.getIniDbBoolean('fettleSettings', optionChoice);
                    if (fettleToggles == null) {
                        $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.toggle.setting.fail', optionChoice));
                    } else {
                        fettleToggles = !fettleToggles;
                        $.inidb.set('fettleSettings', optionChoice, fettleToggles);
                        $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.toggle.setting.pass', optionChoice, (fettleToggles === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled'))));
                        reloadFettle();
                    }
                }
            }
            // @commandpath "baseCommand" hydration - Base command for hydration
            if (action.equalsIgnoreCase('hydration')) {
                if (optionChoice === undefined) {
                    hydrationReminder('hydration', true, sender);
                    return;
                }
            }
            // @commandpath "baseCommand" hunger - Base command for hunger
            if (action.equalsIgnoreCase('hunger')) {
                if (optionChoice === undefined){
                    hungerReminder('hunger', true, sender);
                    return;
                }
            }
        } // End of @commandpath "baseCommand"

        if (command.equalsIgnoreCase(baseCommand + 'settings')){
            if (action === undefined) {
                $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.settings.usage', baseCommand + 'settings'));
                return;
            }
            // @commandpath "baseCommandSettings" set - Base command for controlling the settings
            if (action.equalsIgnoreCase('set')) {
                if (optionChoice === undefined) {
                    $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.settings.usage.set', baseCommand + 'settings'));
                    return;
                }
                if (optionChoice.equalsIgnoreCase('hydration')) {
                    if ($.inidb.exists('fettleSettings', optionChoice + '' + optionValue)) {
                        if ((optionValue2 === undefined) || isNaN(optionValue2) || (optionValue2 < 0)) {
                            $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.settings.usage.set.hydration', baseCommand + 'settings'));
                            return;
                        } else {
                            if (optionValue.equalsIgnoreCase('ml')) {
                                $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.settings.set.hydration', baseCommand + 'settings', optionChoice, optionValue, optionValue2));
                                hydrationml = $.setIniDbNumber('fettleSettings', 'hydrationml', optionValue2);
                            }
                            if (optionValue.equalsIgnoreCase('timer')) {
                                $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.settings.set.hydration', baseCommand + 'settings', optionChoice, optionValue, optionValue2));
                                hydrationtimer = $.setIniDbNumber('fettleSettings', 'hydrationtimer', optionValue2);
                            }
                            reloadFettle();
                            return;
                        }
                    } else {
                        $.say($.whisperPrefix(sender) + $.lang.set('fettlesystem.settings.set.hydration', baseCommand + 'settings'));
                        return;
                    } // End of @commandpath "baseCommandSettings" set hydration
                } else if (optionChoice.equalsIgnoreCase('hunger')) { 
                    if ($.inidb.exists('fettleSettings', optionChoice + '' + optionValue)) {
                        if ((optionValue2 === undefined) || isNaN(optionValue2) || (optionValue2 < 0)) {
                            $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.settings.usage.set.hunger', baseCommand + 'settings'));
                            return;
                        } else {
                            $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.settings.set.hunger', baseCommand + 'settings', optionChoice, optionValue, optionValue2));
                            hungertimer = $.setIniDbNumber('fettleSettings', 'hungertimer', optionValue2);
                            reloadFettle();
                            return;
                        }
                    } else {
                        $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.settings.usage.set.hunger', baseCommand + 'settings'));
                        return;
                    } // End of @commandpath "baseCommandSettings" set hunger
                } else {
                    $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.settings.usage.set', baseCommand + 'settings'));
                    return;
                }
            } // End of @commandpath "baseCommandSettings" set
            if (action.equalsIgnoreCase('check')) {
                if (optionChoice) {
                    if (optionChoice.equalsIgnoreCase('hydration')) {
                        $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.settings.check.hydration', optionChoice, hydrationml, hydrationtimer, hydrationtoggle));
                        return;
                    } else if (optionChoice.equalsIgnoreCase('hunger')) {
                        $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.settings.check.hunger', optionChoice, hungertimer, hungertoggle));
                        return;
                    }
                } else {
                    $.say($.whisperPrefix(sender) + $.lang.get('fettlesystem.settings.check.usage', baseCommand + 'settings'));
                    return;
                }
            } // End of @commandpath "baseCommandSettings" CHECK
        } // End of @commandpath "baseCommandSettings"

        if (command.equalsIgnoreCase('reloadfettle')) {
            reloadFettle();
        } // End of @commandpath "reloadfettle"
    }); // End of @event command

    /**
     * Register the command
     */
    $.bind('initReady', function() {
        if ($.bot.isModuleEnabled('./custom/fettleSystem.js')) {
            $.registerChatCommand('./custom/fettleSystem.js', baseCommand, 7);
            $.registerChatSubcommand(baseCommand, 'hydration', 7);
            $.registerChatSubcommand(baseCommand, 'hunger', 7);
            $.registerChatSubcommand(baseCommand, 'toggle', 1);
            $.registerChatCommand('./custom/fettleSystem.js', baseCommand + 'settings', 2);
            $.registerChatSubcommand(baseCommand + 'settings', 'check', 2);
            $.registerChatSubcommand(baseCommand + 'settings', 'set', 1);
            $.registerChatCommand('./custom/fettleSystem.js', 'reloadfettle', 30);
        }
    });

    setTimeout(function() {
        setInterval(function() {reminderBot();}, 6e4, 'scripts::custom::fettleSystem.js');
    }, 5e3);

    $.reloadFettle = reloadFettle;
})();