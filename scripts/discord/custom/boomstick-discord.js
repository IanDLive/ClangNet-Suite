(function () {
    // Module variables
    // ----------------
    var launchConfigPath = $.getSetIniDbString('boomStick', 'launchConfigPath', '[No URL Set]');
    var configFile;
    var launchAPIKey;

    // Module functions
    // ----------------
    function getLaunchKey() {
        var success;

        if (launchConfigPath.equalsIgnoreCase('[no url set]')) {
            success = false;
            return success;
        } else {
            configFile = $.readFile(launchConfigPath + 'modData.txt');
            for (var i = 0; i < configFile.length; i++) {
                if (configFile[i].substr(0, 1) != '#' || configFile[i].substr(0, 1) != '') {
                    var delimiter = configFile[i].indexOf('=');
                    var keyLength = configFile[i].length;
                    var keyName = configFile[i].substr(0, delimiter);
                    var keyValue = configFile[i].substr(delimiter + 1, keyLength);
                    var lc_keyName = keyName.toLowerCase();
                    switch (lc_keyName) {
                        case 'rocketlaunch':
                            launchAPIKey = keyValue;
                            break;
                    }
                }
            }
            success = true;
            return success;
        }
    }

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
    $.bind('discordChannelCommand', function (event) {
        var command = event.getCommand();
        var sender = event.getSender();
        var channel = event.getDiscordChannel();
        var channelCheck = event.getChannel();
        var discordUser = event.getDiscordUser();
        var mention = event.getMention();
        var args = event.getArgs();
        var action = args[0];

        // --- !launch command ---
        if (command.equalsIgnoreCase('launch') && channelCheck.equalsIgnoreCase('general')) {
            var keySuccess;

            keySuccess = getLaunchKey();
            if (keySuccess) {
                $.discord.say(channel, $.lang.get('boomstick.response', getLaunch()));
                return;
            } else {
                $.discord.say(channel, $.lang.get('boomstick.discord.failed'));
                return;
            }
        }
    });

    // Initialisation functions
    $.bind('initReady', function () {
        $.discord.registerCommand('./discord/custom/boomstick-discord.js', 'launch', 0);
    });

})();