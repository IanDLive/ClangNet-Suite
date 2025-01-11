(function () {
    // Module variables
    // ----------------
    var weatherConfigPath = $.getSetIniDbString('weather', 'weatherConfigPath', '[No URL Set]');
    var configFile;
    var weatherAPIKey;

    // Module functions
    // ----------------
    function getWeatherKey() {
        var success;

        if (weatherConfigPath.equalsIgnoreCase('[no url set]')) {
            success = false;
            return success;
        } else {
            configFile = $.readFile(weatherConfigPath + 'modData.txt');
            for (var i = 0; i < configFile.length; i++) {
                if (configFile[i].substring(0, 1) != '#' || configFile[i].substring(0, 1) != '') {
                    var delimiter = configFile[i].indexOf('=');
                    var keyLength = configFile[i].length;
                    var keyName = configFile[i].substring(0, delimiter);
                    var keyValue = configFile[i].substring(delimiter + 1, keyLength);
                    var lc_keyName = keyName.toLowerCase();
                    switch (lc_keyName) {
                        case 'weatherapi':
                            weatherAPIKey = keyValue;
                            break;
                    }
                }
            }
            success = true;
            return success;
        }
    }

    function getWeather(reqLocation) {
        var apiPath;
        var jsonObject;

        apiPath = 'http://api.weatherapi.com/v1/current.json?key=' + weatherAPIKey + '&q=' + reqLocation + '&aqi=no';
        jsonObject = JSON.parse($.cnGetJSON(apiPath, null));
        return jsonObject;
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
        var liveMessages = [];

        // --- !weather command ---
        if (command.equalsIgnoreCase('weather') && (channelCheck.equalsIgnoreCase('general') || channelCheck.equalsIgnoreCase('bot-testing'))) {
            var keySuccess;

            keySuccess = getWeatherKey();
            if (keySuccess) {
                var msg;
                var curW;
                
                curW = getWeather(action);
                $.discordAPI.sendMessageEmbed(channel, new Packages.tv.phantombot.discord.util.EmbedBuilder()
                    .withColor(39, 114, 172)
                    .withThumbnail('https:' + curW.current.condition.icon)
                    .withTitle('Current Weather for ' + curW.location.name + ', ' + curW.location.country)
                    .appendField('Temperature', curW.current.temp_c + '\u00B0C (' + curW.current.temp_f + '\u00B0F)', true)
                    .appendField('Feels Like', curW.current.feelslike_c + '\u00B0C (' + curW.current.feelslike_f + '\u00B0F)', true)
                    .appendField('Condition', curW.current.condition.text, true)
                    .appendField('Wind Speed', curW.current.wind_mph + 'mph', true)
                    .appendField('Wind Direction', curW.current.wind_degree + '\u00B0, ' + curW.current.wind_dir, true)
                    .withTimestamp(Date.now())
                    .build()
                );
                return;
            } else {
                $.discord.say(channel, $.lang.get('weather.discord.failed'));
                return;
            }
        }
    });

    // Initialisation functions
    $.bind('initReady', function () {
        $.discord.registerCommand('./discord/custom/weather-discord.js', 'weather', 0);
    });

})();