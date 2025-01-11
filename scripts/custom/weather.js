// Weather
// -------
//
// Reads weather information from the Weather API and displays it in chat.
//

(function () {
    // Module variables.
    // -----------------
    var debugWeather = $.getSetIniDbBoolean('weather', 'debugWeather', false);
    var weatherConfigPath = $.getSetIniDbString('weather', 'weatherConfigPath', '[No URL Set]');
    var configFile;
    var weatherAPIKey;

    // Module functions.
    // -----------------
    function initText() {
        $.consoleLn('+++>>> Weather module loaded');
        if (debugWeather) {
            $.consoleLn('+++>>> [WEATHER DEBUG] Weather Debug Facility Enabled.')
        }
        $.consoleLn('+++>>> Module Config Data File set to: ' + weatherConfigPath);
        if (weatherConfigPath.equalsIgnoreCase('[no url set]')) {
            $.consoleLn($.lang.get('weather.needtosetpath'));
            return;
        } else {
            getWeatherKey();
            return;
        }
    }

    // function getWeatherKey - reads the data file with the API keys so that a header can be generated for the API call.
    function getWeatherKey() {
        if (weatherConfigPath.equalsIgnoreCase('[no url set]')) {
            $.say($.lang.get('weather.needtosetpath'));
            return;
        } else {
            configFile = $.readFile(weatherConfigPath + 'modData.txt');
            for (var i = 0; i < configFile.length; i++) {
                if (configFile[i].substring(0, 1) != '#' || configFile[i].substr(0, 1) != '') {
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
        }
    }

    // function getWeather - reads the Weather API to get the current weather conditions.
    function getWeather(reqLocation) {
        var apiPath;
        var jsonObject;

        apiPath = 'http://api.weatherapi.com/v1/current.json?key=' + weatherAPIKey + '&q=' + reqLocation + '&aqi=no';
        jsonObject = JSON.parse($.cnGetJSON(apiPath, null));
        return jsonObject;
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

        // --- !weather command ---
        getWeatherKey();
        if (command.equalsIgnoreCase('weather')) {
            if (action === undefined) {
                $.say($.lang.get('weather.noloc'));
                return;
            } else {
                // SetPath action (AT CASTER/BOT LEVEL)
                if (action.equalsIgnoreCase('setpath')) {
                    if (parameter === undefined || parameter == null) {
                        $.say($.lang.get('weather.nofilepathset'));
                        return;
                    } else {
                        $.setIniDbString('weather', 'weatherConfigPath', parameter);
                        $.say($.lang.get('weather.datafilepathset', parameter));
                        weatherConfigPath = parameter;
                        return;
                    }
                }
                // Debug action (AT CASTER/BOT LEVEL)
                if (action.equalsIgnoreCase('debug')) {
                    debugWeather = $.getIniDbBoolean('weather', 'debugWeather');
                    if (debugWeather) {
                        debugWeather = false;
                        $.setIniDbBoolean('weather', 'debugWeather', false);
                    } else {
                        debugWeather = true;
                        $.setIniDbBoolean('weather', 'debugWeather', true);
                    }
                    $.say($.lang.get('weather.debugmodetoggle', (debugWeather === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled'))));
                    $.consoleLn('[WEATHER DEBUG] ' + $.lang.get('weather.debugmodetoggle', (debugWeather === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled'))));
                    return;
                }
                // Reload API Key from text file (AT CASTER/BOT LEVEL)
                if (action.equalsIgnoreCase('reloadkeys')) {
                    getWeatherKey();
                    $.say($.lang.get('weather.reloaded'));
                    return;
                }
                // Show Variables action (AT CASTER/BOT LEVEL)
                if (action.equalsIgnoreCase('showvars')) {
                    if (debugWeather) {
                        $.say($.lang.get('weather.showvars.success'));
                        $.consoleLn('[WEATHER DEBUG] *** START OF VARIABLES ***');
                        $.consoleLn('[WEATHER DEBUG] Config Path     = ' + weatherConfigPath);
                        $.consoleLn('[WEATHER DEBUG] Config Raw Data = ' + configFile[0]);
                        for (var i = 1; i < configFile.length; i++) {
                            $.consoleLn('[WEATHER DEBUG]                 = ' + configFile[i]);
                        }
                        $.consoleLn('[WEATHER DEBUG] Weather Key     = ' + weatherAPIKey);
                        $.consoleLn('[WEATHER DEBUG] ***  END OF VARIABLES  ***');
                        return;
                    } else {
                        $.say($.lang.get('weather.showvars.failed'));
                        return;
                    }
                } else {
                    let curW = getWeather(action);
                    $.say($.lang.get('weather.response', curW.location.name + ', ' + curW.location.country, curW.current.condition.text, curW.current.temp_c, curW.current.temp_f, curW.current.feelslike_c, curW.current.feelslike_f, curW.current.wind_mph, curW.current.wind_degree, curW.current.wind_dir));
                    return;
                }
            }
        }
    });

    // Initialisation functions
    // ------------------------
    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/weather.js')) {
            initText();
            $.registerChatCommand('./custom/weather.js', 'weather', 7);
            $.registerChatSubcommand('weather', 'setpath', 0);
            $.registerChatSubcommand('weather', 'debug', 0);
            $.registerChatSubcommand('weather', 'reloadkeys', 0);
            $.registerChatSubcommand('weather', 'showvars', 0);
        }
    });

})();