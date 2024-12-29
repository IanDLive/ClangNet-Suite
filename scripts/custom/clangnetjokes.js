// ClangNet Jokes
// --------------
//
// Reads jokes and information from external API's and sends them as messages in chat.
// Also set up so that it can be called from a timer as well as directly from a command.
//

(function () {

    // Module variables
    // ----------------
    var jokesEnabled = $.getSetIniDbBoolean('clangnetJokes', 'jokesEnabled', true);
    var allowOfflineJokes = $.getSetIniDbBoolean('clangnetJokes', 'allowOfflineJokes', false);
    var debugJokes = $.getSetIniDbBoolean('clangnetJokes', 'debugJokes', false);
    var jokesConfigPath = $.getSetIniDbString('clangnetJokes', 'jokesConfigPath', '[No URL Set]');
    var configFile;
    var dadJokesKeyName;
    var dadJokesKeyValue;
    var dadJokesHostName;
    var dadJokesHostValue;

    // Module functions
    // ----------------
    function initText() {
        jokesEnabled = $.getIniDbBoolean('clangnetJokes', 'jokesEnabled');
        allowOfflineJokes = $.getIniDbBoolean('clangnetJokes', 'allowOfflineJokes');
        debugJokes = $.getIniDbBoolean('clangnetJokes', 'debugJokes');
        $.consoleLn('+++>>> ClangNet Jokes module loaded');
        if (debugJokes) {
            $.consoleLn("+++>>> [JOKES DEBUG] ClangNet Jokes Debug Facility Enabled");
        }
        $.consoleLn("+++>>> Module Config Data File Path set to: " + jokesConfigPath);
        if (jokesConfigPath.equalsIgnoreCase('[no url set]')) {
            $.consoleLn($.lang.get('clangnetjokes.needtosetpath'));
            return;
        } else {
            getJokeKeys();
            return;
        }
    }

    // function getJokeKeys - reads the data file with the API keys so that a header can be generated for the API call.
    function getJokeKeys() {
        if (jokesConfigPath.equalsIgnoreCase('[no url set]')) {
            $.say($.lang.get('clangnetjokes.needtosetpath'));
            return;
        } else {
            configFile = $.readFile(jokesConfigPath + 'modData.txt');
            for (var i = 0; i < configFile.length; i++) {
                if (configFile[i].substring(0, 1) != '#' || configFile[i].substr(0, 1) != '') {
                    var delimiter = configFile[i].indexOf('=');
                    var keyLength = configFile[i].length;
                    var keyName = configFile[i].substring(0, delimiter);
                    var keyValue = configFile[i].substring(delimiter + 1, keyLength);
                    var lc_keyName = keyName.toLowerCase();
                    switch (lc_keyName) {
                        case 'dadjokeskeyname':
                            dadJokesKeyName = keyValue;
                            break;
                        case 'dadjokeskeyvalue':
                            dadJokesKeyValue = keyValue;
                            break;
                        case 'dadjokeshostname':
                            dadJokesHostName = keyValue;
                            break;
                        case 'dadjokeshostvalue':
                            dadJokesHostValue = keyValue;
                            break;
                    }
                }
            }
        }
    }

    // Retrieve a Dad Joke from an API and say it in chat, use to make independent of bot timers.
    function getAnyJoke() {
        var jsonObject;
        var returnText;
        var intJokeChoice = Math.floor(Math.random() * 4);

        switch (intJokeChoice) {
            case 0:
                if (debugJokes) {
                    $.consoleLn('[JOKES DEBUG] intJokeChoice = 0; No API headers.')
                }
                jsonObject = JSON.parse($.cnGetJSON('https://icanhazdadjoke.com/slack', null));
                returnText = jsonObject.attachments[0].text;
                break;
            case 1:
                if (debugJokes) {
                    $.consoleLn('[JOKES DEBUG] intJokeChoice = 1: No API headers.');
                }
                jsonObject = JSON.parse($.cnGetJSON('https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&type=single', null));
                returnText = jsonObject.joke;
                break;
            case 2:
                if (debugJokes) {
                    $.consoleLn('[JOKES DEBUG] intJokeChoice = 2: No API headers.');
                }
                jsonObject = JSON.parse($.cnGetJSON('https://uselessfacts.jsph.pl/random.json?language=en', null));
                returnText = 'Useless Fact: ' + jsonObject.text;
                break;
            case 3:
                if (debugJokes) {
                    $.consoleLn('[JOKES DEBUG] intJokeChoice = 3: Built headers.');
                }
                var apiHead = new Packages.java.util.HashMap();
                apiHead.put(dadJokesKeyName, dadJokesKeyValue);
                apiHead.put(dadJokesHostName, dadJokesHostValue);
                jsonObject = JSON.parse($.cnGetJSON('https://dad-jokes.p.rapidapi.com/random/joke', apiHead));
                returnText = jsonObject.body[0].setup + ' ' + jsonObject.body[0].punchline;
                break;
        }
        return returnText;
    }

    // 'Bot' used to say a retrieved joke in chat.
    function sayAnyJoke(invokedBy, isCommanded) {
        var intEmoteChoice = Math.floor(Math.random() * 4);
        var strEmoteChoice;

        if (jokesEnabled) {
            if ($.isOnline($.channelName) || allowOfflineJokes == true) {
                switch (intEmoteChoice) {
                    case 0:
                        strEmoteChoice = ' TriHard';
                        break;
                    case 1:
                        strEmoteChoice = ' Kreygasm';
                        break;
                    case 2:
                        strEmoteChoice = ' LUL';
                        break;
                    case 3:
                        strEmoteChoice = ' PogChamp';
                        break;
                }
                $.say(getAnyJoke() + strEmoteChoice);
            } else {
                if (isCommanded) {
                    var atSender = $.cnUserStrings(invokedBy);
                    $.say($.lang.get('clangnetjokes.jokesonline', atSender[0]));
                }
            }
        } else {
            if (isCommanded) {
                $.say($.lang.get('clangnetjokes.jokesdisabled'));
            }
        }
    }

    function jokesTimerBot() {
        sayAnyJoke('', false);
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

        // --- !jokes command  ---
        if (command.equalsIgnoreCase('jokes')) {
            if (action === undefined) {
                sayAnyJoke(sender, true);
                return;
            } else {
                // Toggle action (AT CASTER/BOT LEVEL)
                if (action.equalsIgnoreCase('toggle')) {
                    var atSender = $.cnUserStrings(sender);
                    jokesEnabled = !jokesEnabled;
                    $.setIniDbBoolean('clangnetJokes', 'jokesEnabled', jokesEnabled);
                    $.say($.lang.get('clangnetjokes.jokesenabled', atSender[0], (jokesEnabled === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled'))));
                    $.consoleLn($.lang.get('clangnetjokes.jokesenabled', atSender[1], (jokesEnabled === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled'))));
                    return;
                }
                // SetPath action (AT CASTER/BOT LEVEL)
                if (action.equalsIgnoreCase('setpath')) {
                    if (parameter === undefined || parameter == null) {
                        $.say($.lang.get('clangnetjokes.nofilepathset'));
                        return;
                    } else {
                        $.setIniDbString('clangnetJokes', 'jokesConfigPath', parameter);
                        $.say($.lang.get('clangnetjokes.datafilepathset', parameter));
                        jokesConfigPath = parameter;
                        return;
                    }
                }
                // Debug action (AT CASTER/BOT LEVEL)
                if (action.equalsIgnoreCase('debug')) {
                    debugJokes = $.getIniDbBoolean('clangnetJokes', 'debugJokes');
                    if (debugJokes) {
                        debugJokes = false;
                        $.setIniDbBoolean('clangnetJokes', 'debugJokes', false);
                    } else {
                        debugJokes = true;
                        $.setIniDbBoolean('clangnetJokes', 'debugJokes', true);
                    }
                    $.say($.lang.get('clangnetjokes.debugmodetoggle', (debugJokes === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled'))));
                    $.consoleLn('[JOKES DEBUG] ' + $.lang.get('clangnetjokes.debugmodetoggle', (debugJokes === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled'))));
                    return;
                }
                // Offline Mode action (AT CASTER/BOT LEVEL)
                if (action.equalsIgnoreCase('offlinemode')) {
                    allowOfflineJokes = $.getIniDbBoolean('clangnetJokes', 'allowOfflineJokes');
                    if (allowOfflineJokes) {
                        allowOfflineJokes = false;
                        $.setIniDbBoolean('clangnetJokes', 'allowOfflineJokes', false);
                        $.say($.lang.get('clangnetjokes.offlinemode.false'));
                        return;
                    } else {
                        allowOfflineJokes = true;
                        $.setIniDbBoolean('clangnetJokes', 'allowOfflineJokes', true);
                        $.say($.lang.get('clangnetjokes.offlinemode.true'));
                        return;
                    }
                }
                // Reload API Keys from text file (AT CASTER/BOT LEVEL)
                if (action.equalsIgnoreCase('reloadkeys')) {
                    getJokeKeys();
                    $.say($.lang.get('clangnetjokes.reloaded'));
                    return;
                }
                // Show Variables action (AT CASTER/BOT LEVEL)
                if (action.equalsIgnoreCase('showvars')) {
                    if (debugJokes) {
                        $.say($.lang.get('clangnetjokes.showvars.success'));
                        $.consoleLn('[JOKES DEBUG] *** START OF VARIABLES ***');
                        $.consoleLn('[JOKES DEBUG] dadJokesKeyName              = ' + dadJokesKeyName);
                        $.consoleLn('[JOKES DEBUG] dadJokesKeyValue             = ' + dadJokesKeyValue);
                        $.consoleLn('[JOKES DEBUG] dadJokesHostName             = ' + dadJokesHostName);
                        $.consoleLn('[JOKES DEBUG] dadJokesHostValue            = ' + dadJokesHostValue);
                        $.consoleLn('[JOKES DEBUG] configFile.length            = ' + configFile.length);
                        $.consoleLn('[JOKES DEBUG] configFile                   = ' + configFile);
                        $.consoleLn('[JOKES DEBUG] ***  END OF VARIABLES  ***');
                        return;
                    } else {
                        $.say($.lang.get('clangnetjokes.showvars.failed'));
                        return;
                    }
                }
            }
        }

        // --- !jokestb command (AT CASTER/BOT LEVEL) ---
        if (command.equalsIgnoreCase('jokestb')) {
            jokesTimerBot();
        }

    });

    // Initialisation functions
    // ------------------------
    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/clangnetjokes.js')) {
            initText(); // The function above that displays the line within the consle when loaded.
            $.registerChatCommand('./custom/clangnetjokes.js', 'jokes', 7);
            $.registerChatCommand('./custom/clangnetjokes.js', 'jokestb', 0);
            $.registerChatSubcommand('jokes', 'toggle', 0);
            $.registerChatSubcommand('jokes', 'setpath', 0);
            $.registerChatSubcommand('jokes', 'debug', 0);
            $.registerChatSubcommand('jokes', 'offlinemode', 0);
            $.registerChatSubcommand('jokes', 'reloadkeys', 0);
            $.registerChatSubcommand('jokes', 'showvars', 0);
        }
    });

})();