// Boomstick
// ---------
//
// Reads launch information from the RocketLaunch API and gives responses back in chat.
//

(function () {
    // Module variables
    // ----------------
    var debugLaunch = $.getSetIniDbBoolean('boomStick', 'debugLaunch', false);
    var launchConfigPath = $.getSetIniDbString('boomStick', 'launchConfigPath', '[No URL Set]');
    var configFile;
    var launchAPIKey;

    // Module functions
    // ----------------
    function initText() {
        $.consoleLn('+++>>> Rocket Launch Schedule module loaded');
        if (debugLaunch) {
            $.consoleLn('+++>>> [LAUNCH DEBUG] Boomstick Debug Facility Enabled.');
        }
        $.consoleLn('+++>>> Module Config Data File Path set to: ' + launchConfigPath);
        if (launchConfigPath.equalsIgnoreCase('[no url set]')) {
            $.consoleLn($.lang.get('boomstick.needtosetpath'));
            return;
        } else {
            getLaunchKey();
            return;
        }
    }

    // function getLaunchKey - reads the data file with the API keys so that a header can be generated for the API call.
    function getLaunchKey() {
        if (launchConfigPath.equalsIgnoreCase('[no url set]')) {
            $.say($.lang.get('boomstick.needtosetpath'));
            return;
        } else {
            configFile = $.readFile(launchConfigPath + 'modData.txt');
            for (var i = 0; i < configFile.length; i++) {
                if (configFile[i].substr(0, 1) != '#' || configFile[i].substr(0, 1) != '') {
                    var delimiter = configFile[i].indexOf('=');
                    var keyLength = configFile[i].length;
                    var keyName = configFile[i].substr(0, delimiter);
                    var keyValue = configFile[i].substr(delimiter + 1, keyLength - 1);
                    var lc_keyName = keyName.toLowerCase();
                    switch (lc_keyName) {
                        case 'rocketlaunch':
                            launchAPIKey = keyValue;
                            break;
                    }
                }
            }
        }
    }

    // function getLaunch - gets the next lauch information from the RocketLaunch API
    function getLaunch() {
        var jsonObject;
        var returnText;
        var apiHead = new Packages.java.util.HashMap();

        apiHead.put('Authorization', 'Bearer ' + launchAPIKey);
        jsonObject = JSON.parse($.cnGetJSON('https://fdo.rocketlaunch.live/json/launches/next', apiHead));
        returnText = jsonObject.result[0].quicktext;
        return returnText;
    }

    // Command event functions
    // -----------------------
    $.bind('command', function (event) {
        // Command event variables
        var command = event.getCommand();
        var sender = event.getSender();
        var arguments = event.getArguments();
        var args = event.getArgs();
        var action = args[0];
        var parameter = args[1];

        // --- !launch command ---
        if (command.equalsIgnoreCase('launch')) {
            if (action === undefined) {
                var nextLaunch = getLaunch();
                $.say($.lang.get('boomstick.response', nextLaunch));
                return;
            } else {
                // SetPath action (AT CASTER/BOT LEVEL)
                if (action.equalsIgnoreCase('setpath')) {
                    if (parameter === undefined || parameter == null) {
                        $.say($.lang.get('boomstick.nofilepathset'));
                        return;
                    } else {
                        $.setIniDbString('boomStick', 'launchConfigPath', parameter);
                        $.say($.lang.get('boomstick.datafilepathset', parameter));
                        launchConfigPath = parameter;
                        return;
                    }
                }
                // Debug action (AT CASTER/BOT LEVEL)
                if (action.equalsIgnoreCase('debug')) {
                    debugLaunch = $.getIniDbBoolean('boomStick', 'debugLaunch');
                    if (debugLaunch) {
                        debugLaunch = false;
                        $.setIniDbBoolean('boomStick', 'debugLaunch', false);
                    } else {
                        debugLaunch = true;
                        $.setIniDbBoolean('boomStick', 'debugLaunch', true);
                    }
                    $.say($.lang.get('boomstick.debugmodetoggle', (debugLaunch === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled'))));
                    $.consoleLn('[LAUNCH DEBUG] ' + $.lang.get('boomstick.debugmodetoggle', (debugLaunch === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled'))));
                    return;
                }
                // Reload API Key from text file (AT CASTER/BOT LEVEL)
                if (action.equalsIgnoreCase('reloadkeys')) {
                    getLaunchKey();
                    $.say($.lang.get('boomstick.reloaded'));
                    return;
                }
                // Show Variables action (AT CASTER/BOT LEVEL)
                if (action.equalsIgnoreCase('showvars')) {
                    if (debugLaunch) {
                        $.say($.lang.get('boomstick.showvars.success'));
                        $.consoleLn('[LAUNCH DEBUG] *** START OF VARIABLES ***');
                        $.consoleLn('[LAUNCH DEBUG] ***  END OF VARIABLES  ***');
                        return;
                    } else {
                        $.say($.lang.get('boomstick.showvars.failed'));
                        return;
                    }
                }
            }
        }
    });

    // Initialisation functions
    // ------------------------
    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/boomstick.js')) {
            initText();
            $.registerChatCommand('./custom/boomstick.js', 'launch', 7);
            $.registerChatSubcommand('launch', 'setpath', 0);
            $.registerChatSubcommand('launch', 'debug', 0);
            $.registerChatSubcommand('launch', 'reloadkeys', 0);
            $.registerChatSubcommand('launch', 'showvars', 0);
        }
    });

})();