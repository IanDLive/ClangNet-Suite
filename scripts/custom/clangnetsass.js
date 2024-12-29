// ClangNet Sass
// -------------
// Chat message interceptions to automate some responses and general commands for ClangNet
//
// Permission Groups:
//    0 = Caster/Bot
//    1 = Administrator (set in the bot)
//    2 = Moderator
//    3 = Subscriber
//    6 = Regular (determined by the bot, enhanced viewer)
//    7 = Viewer
//

(function () {
    // Global variable for this function
    var allowOfflineCmd = $.getSetIniDbBoolean('clangnetSass', 'allowOfflineCmd', false);
    var debugClangnet = $.getSetIniDbBoolean('clangnetSass', 'debugClangnet', false);
    // var pretzelTwitchId = $.getSetIniDbString('clangnetSass', 'twitchId', 'NaN');
    var decAPIConfigPath = $.getSetIniDbString('clangnetSass', 'decAPIConfigPath', '[No URL Set]');
    var configFile;
    var decAPIKey;

    // Initialise variables for this function and report debug mode on startup if it is enabled.
    function initText() {
        allowOfflineCmd = $.getIniDbBoolean('clangnetSass', 'allowOfflineCmd');
        debugClangnet = $.getIniDbBoolean('clangnetSass', 'debugClangnet');
        $.consoleLn("+++>>> Clangnet Sass commands module online");
        $.consoleLn("+++>>> Module Config Data File Path set to: " + decAPIConfigPath);
        if (decAPIConfigPath.equalsIgnoreCase('[no url set]')) {
            $.consoleLn($.lang.get('clangnetsass.needtosetpath'));
            return;
        } else {
            getDecAPIKey();
            return;
        }
        if (allowOfflineCmd) {
            $.consoleLn($.lang.get('clangnetsass.offlinemodetrue'));
        }
        if (debugClangnet) {
            $.consoleLn('[CLANGNET DEBUG] ClangnetSass Debug Facility Enabled');
        }
    }

    // Get the API Key for decAPI endpoint.
    function getDecAPIKey() {
        if (decAPIConfigPath.equalsIgnoreCase('[no url set]')) {
            $.consoleLn($.lang.get('clangnetsass.needtosetpath'));
            return;
        } else {
            configFile = $.readFile(decAPIConfigPath + 'modData.txt');
            for (var i = 0; i < configFile.length; i++) {
                if (configFile[i].substr(0, 1) != '#' || configFile[i].substr(0, 1) != '') {
                    var delimiter = configFile[i].indexOf('=');
                    var keyLength = configFile[i].length;
                    var keyName = configFile[i].substring(0, delimiter);
                    var keyValue = configFile[i].substring(delimiter + 1, keyLength);
                    var lc_keyName = keyName.toLowerCase();
                    switch (lc_keyName) {
                        case 'decapi':
                            decAPIKey = keyValue;
                            break;
                    }
                }
            }
        }
    }

    // Command Event
    $.bind('command', function (event) {

        // All of the default methods are stored in the event argument.
        // To access a method, you would do 'event.myMethod()'.

        // Register all of the methods into variables for ease/readability.
        var command = event.getCommand();
        var sender = event.getSender();
        var arguments = event.getArguments();
        var args = event.getArgs();
        var action = args[0];
        var parameter = args[1];
        var atSender;
        var queryItem;
        var apiURL;

        // Determine whether the stream is online before executing any of these sass commands.
        // --- !lurk command ---
        if (command.equalsIgnoreCase('lurk')) {
            if ($.isOnline($.channelName) || allowOfflineCmd == true) {
                var intResponseChoice = Math.floor(Math.random() * 7);
                var lurkSender = $.cnUserStrings(sender);
                switch (intResponseChoice) {
                    case 0:
                        $.say($.lang.get('clangnetsass.lurk.response0', lurkSender[0]));
                        break;
                    case 1:
                        $.say($.lang.get('clangnetsass.lurk.response1', lurkSender[0]));
                        break;
                    case 2:
                        $.say($.lang.get('clangnetsass.lurk.response2', lurkSender[0]));
                        break;
                    case 3:
                        $.say($.lang.get('clangnetsass.lurk.response3', lurkSender[0]));
                        break;
                    case 4:
                        $.say($.lang.get('clangnetsass.lurk.response4', lurkSender[0]));
                        break;
                    case 5:
                        $.say($.lang.get('clangnetsass.lurk.response5', lurkSender[0]));
                        break;
                    case 6:
                        $.say($.lang.get('clangnetsass.lurk.response6', lurkSender[0]));
                        break;
                }
            } else {
                $.say($.lang.get('clangnetsass.lurk.darkinhere'));
            }
        }

        // --- !unlurk command ---
        if (command.equalsIgnoreCase('unlurk')) {
            if ($.isOnline($.channelName) || allowOfflineCmd == true) {
                var intResponseChoice = Math.floor(Math.random() * 3);
                var unlurkSender = $.cnUserStrings(sender);
                switch (intResponseChoice) {
                    case 0:
                        $.say($.lang.get('clangnetsass.unlurk.response0', unlurkSender[0]));
                        break;
                    case 1:
                        $.say($.lang.get('clangnetsass.unlurk.response1', unlurkSender[0]));
                        break;
                    case 2:
                        $.say($.lang.get('clangnetsass.unlurk.response2', unlurkSender[0]));
                        break;
                }
            } else {
                $.say($.lang.get('clangnetsass.unlurk.darkinhere'));
            }
        }

        // --- !gamemods command ---
        if (command.equalsIgnoreCase('gamemods')) {
            var modSender = $.cnUserStrings(sender);
            if ($.isOnline($.channelName) || allowOfflineCmd == true) {
                var currentGame = $.getGame($.channelName);
                var lc_currentGame = currentGame.toLowerCase();
                switch (lc_currentGame) {
                    case 'space engineers':
                        $.say($.lang.get('clangnetsass.se-mods'));
                        break;
                    case 'the elder scrolls online':
                        $.say($.lang.get('clangnetsass.eso-mods'));
                        break;
                    case 'elite: dangerous':
                        $.say($.lang.get('clangnetsass.ed-mods'));
                        break;
                    case 'farming simulator 22':
                        $.say($.lang.get('clangnetsass.fs22-mods'));
                        break;
                    case 'fallout 4':
                        $.say($.lang.get('clangnetsass.fo4-mods'));
                        break;
                    default:
                        $.say($.lang.get('clangnetsass.mods-notused'));
                        break;
                }
            } else {
                $.say($.lang.get('clangnetsass.mods-notonline', modSender[0]));
            }
        }

        // --- !gamertag command ---
        if (command.equalsIgnoreCase('gamertag')) {
            var handleSender = $.cnUserStrings(sender);
            if ($.isOnline($.channelName) || allowOfflineCmd == true) {
                var currentGame = $.getGame($.channelName);
                var lc_currentGame = currentGame.toLowerCase();
                switch (lc_currentGame) {
                    case 'star citizen':
                        $.say($.lang.get('clangnetsass.handle-starcitizen', handleSender[0]));
                        break;
                    case 'the elder scrolls online':
                        $.say($.lang.get('clangnetsass.handle-eso', handleSender[0]));
                        break;
                    case 'elite: dangerous':
                        $.say($.lang.get('clangnetsass.handle-elite', handleSender[0]));
                        break;
                    default:
                        $.say($.lang.get('clangnetsass.handle-notused'));
                        break;
                }
            } else {
                $.say($.lang.get('clangnetsass.handle-notonline', handleSender[0]));
            }
        }

        // Commands that are not online/offline dependent.
        // --- !discord command ---
        if (command.equalsIgnoreCase('discord')) {
            $.say($.lang.get('clangnetsass.discord'));
            return;
        }

        // --- !followed command ---
        if (command.equalsIgnoreCase('followed')) {
            atSender = $.cnUserStrings(sender);
            if (args[0] !== undefined) {
                queryItem = $.cnUserStrings(args[0]);
                apiURL = 'https://decapi.me/twitch/followed/iandlive/' + queryItem[1] + '?token=' + decAPIKey;
                $.say($.lang.get('clangnetsass.followedquery', atSender[0], queryItem[1], $.customAPI.get(apiURL).content));
                return;
            } else {
                apiURL = 'https://decapi.me/twitch/followed/iandlive/' + sender + '?token=' + decAPIKey;
                $.say($.lang.get('clangnetsass.followed', atSender[0], $.customAPI.get(apiURL).content));
                return;
            }
        }

        // --- !followers command ---
        if (command.equalsIgnoreCase('followers')) {
            atSender = $.cnUserStrings(sender);
            if (args[0] !== undefined) {
                queryItem = $.cnUserStrings(args[0]);
                apiURL = 'https://decapi.me/twitch/followcount/' + queryItem[1];
                $.say($.lang.get('clangnetsass.followersquery', atSender[0], queryItem[1], $.customAPI.get(apiURL).content));
                return;
            } else {
                apiURL = 'https://decapi.me/twitch/followcount/iandlive';
                $.say($.lang.get('clangnetsass.followers', atSender[0], $.customAPI.get(apiURL).content));
                return;
            }
        }

        // --- !howlong command ---
        if (command.equalsIgnoreCase('howlong')) {
            atSender = $.cnUserStrings(sender);
            if (args[0] !== undefined) {
                queryItem = $.cnUserStrings(args[0]);
                apiURL = 'https://decapi.me/twitch/followage/iandlive/' + queryItem[1] + '?token=' + decAPIKey;
                $.say($.lang.get('clangnetsass.howlongquery', atSender[0], queryItem[1], $.customAPI.get(apiURL).content));
                return;
            } else {
                apiURL = 'https://decapi.me/twitch/followage/iandlive/' + sender + '?token=' + decAPIKey;
                $.say($.lang.get('clangnetsass.howlong', atSender[0], $.customAPI.get(apiURL).content));
                return;
            }
        }

        // --- !howserver command ---
        if (command.equalsIgnoreCase('howserver')) {
            $.say($.lang.get('clangnetsass.howserver'));
            return;
        }

        // --- !howsong command ---
        if (command.equalsIgnoreCase('howsong')) {
            $.say($.lang.get('clangnetsass.howsong'));
            return;
        }

        // --- !notifications command ---
        if (command.equalsIgnoreCase('notifications')) {
            $.say($.lang.get('clangnetsass.notifications'));
            return;
        }

        // --- !steamgroup command ---
        if (command.equalsIgnoreCase('steamgroup')) {
            $.say($.lang.get('clangnetsass.steamgroup'));
            return;
        }

        // --- !steam command ---
        if (command.equalsIgnoreCase('steam')) {
            $.say($.lang.get('clangnetsass.steam'));
            return;
        }

        // --- !xebon command ---
        if (command.equalsIgnoreCase('xebon')) {
            $.say($.lang.get('clangnetsass.xebon'));
            return;
        }

        // --- !xebondiscord command ---
        if (command.equalsIgnoreCase('xebondiscord')) {
            $.say($.lang.get('clangnetsass.xebondiscord'));
            return;
        }

        // --- !humble command ---
        if (command.equalsIgnoreCase('humble')) {
            $.say($.lang.get('clangnetsass.humble'));
            return;
        }

        // --- !humblemonth command ---
        if (command.equalsIgnoreCase('humblemonth')) {
            $.say($.lang.get('clangnetsass.humblemonth'));
            return;
        }

        // --- !food command ---
        if (command.equalsIgnoreCase('food')) {
            $.say($.lang.get('clangnetsass.food'));
            return;
        }

        // --- !youtube command ---
        if (command.equalsIgnoreCase('youtube')) {
            $.say($.lang.get('clangnetsass.youtube'));
            return;
        }

        // --- !por-youtube command ---
        if (command.equalsIgnoreCase('por-youtube')) {
            $.say($.lang.get('clangnetsass.por-youtube'));
            return;
        }

        // --- !cdkeys command ---
        if (command.equalsIgnoreCase('cdkeys')) {
            $.say($.lang.get('clangnetsass.cdkeys'));
            return;
        }

        // --- !merch command ---
        if (command.equalsIgnoreCase('merch')) {
            $.say($.lang.get('clangnetsass.merch'));
            return;
        }

        // --- !chatcomm command ---
        if (command.equalsIgnoreCase('chatcomm')) {
            $.say($.lang.get('clangnetsass.chatcomm'));
            return;
        }

        // --- !socials command ---
        if (command.equalsIgnoreCase('socials')) {
            $.say($.lang.get('clangnetsass.socials'));
            return;
        }

        // --- !subs command ---
        if (command.equalsIgnoreCase('subs')) {
            $.say($.lang.get('clangnetsass.subs'));
            return;
        }

        // --- !hype command ---
        if (command.equalsIgnoreCase('hype')) {
            $.say($.lang.get('clangnetsass.hype'));
            return;
        }

        // --- !website command ---
        if (command.equalsIgnoreCase('website')) {
            $.say($.lang.get('clangnetsass.website'));
            return;
        }

        // --- !ads command ---
        if (command.equalsIgnoreCase('ads')) {
            $.say($.lang.get('clangnetsass.ads'));
            return;
        }

        // --- !raided command (MOD LEVEL) ---
        if (command.equalsIgnoreCase('raided')) {
            $.say($.lang.get('clangnetsass.raided'));
            return;
        }

        // --- !clangnetsass command (CASTER/BOT LEVEL) - is a shell to house sub commands.
        if (command.equalsIgnoreCase('clangnetsass')) {
            if (action === undefined || action == null) {
                return;
            } else {
                // --- !clangnetsass offlinemode command ---
                if (action.equalsIgnoreCase('offlinemode')) {
                    allowOfflineCmd = $.getIniDbBoolean('clangnetSass', 'allowOfflineCmd');
                    if (allowOfflineCmd == false) {
                        allowOfflineCmd = true;
                        $.setIniDbBoolean('clangnetSass', 'allowOfflineCmd', true);
                        $.say($.lang.get('clangnetsass.offlinemodetrue'));
                        $.consoleLn($.lang.get('clangnetsass.offlinemodetrue'));
                    } else {
                        allowOfflineCmd = false;
                        $.setIniDbBoolean('clangnetSass', 'allowOfflineCmd', false);
                        $.say($.lang.get('clangnetsass.offlinemodefalse'));
                        $.consoleLn($.lang.get('clangnetsass.offlinemodefalse'));
                    }
                    return;
                }
                // --- !clangnetsass debug command ---
                if (action.equalsIgnoreCase('debug')) {
                    debugClangnet = $.getIniDbBoolean('clangnetSass', 'debugClangnet');
                    if (debugClangnet == false) {
                        debugClangnet = true;
                        $.setIniDbBoolean('clangnetSass', 'debugClangnet', true);
                        $.say($.lang.get('clangnetsass.debugmodetrue'));
                        $.consoleLn('[CLANGNET DEBUG] ' + $.lang.get('clangnetsass.debugmodetrue'));
                    } else {
                        debugClangnet = false;
                        $.setIniDbBoolean('clangnetSass', 'debugClangnet', false);
                        $.say($.lang.get('clangnetsass.debugmodefalse'));
                        $.consoleLn('[CLANGNET DEBUG] ' + $.lang.get('clangnetsass.debugmodefalse'));
                    }
                    return;
                }
                // --- !clangnetsass showvars command ---
                if (action.equalsIgnoreCase('showvars')) {
                    if (debugClangnet) {
                        currentGame = $.getGame($.channelName);
                        $.say($.lang.get('clangnetsass.showvars.success'));
                        $.consoleLn('[CLANGNET DEBUG] *** START OF VARIABLES ***');
                        $.consoleLn('[CLANGNET DEBUG] Current Game    = ' + currentGame);
                        $.consoleLn('[CLANGNET DEBUG] Config Path     = ' + decAPIConfigPath);
                        $.consoleLn('[CLANGNET DEBUG] Config Raw Data = ' + configFile);
                        $.consoleLn('[CLANGNET DEBUG] DecAPI Key      = ' + decAPIKey);
                        $.consoleLn('[CLANGNET DEBUG] ***  END OF VARIABLES  ***');
                    } else {
                        $.say($.lang.get('clangnetsass.showvars.failed'));
                        $.consoleLn($.lang.get('clangnetsass.showvars.failed'));
                    }
                    return;
                }

                // --- !clangnetsass setpath command ---
                if (action.equalsIgnoreCase('setpath')) {
                    if (parameter === undefined || parameter == null) {
                        $.say($.lang.get('clangnetsass.nofilepathset'));
                        return;
                    } else {
                        $.setIniDbString('clangnetsass', 'decAPIConfigPath', parameter);
                        $.say($.lang.get('clangnetsass.datafilepathset', parameter));
                        decAPIConfigPath = parameter;
                        return;
                    }
                }
                // --- !clangnetsass reloadkeys command ---
                if (action.equalsIgnoreCase('reloadkeys')) {
                    getDecAPIKey();
                    $.say($.lang.get('clangnetsass.reloaded'));
                    return;
                }
            }
        }

    });

    $.bind('initReady', function () {
        initText();
        // 'script' is the script location.  IT MUST BE IN SCRIPTS!!!
        // 'command' is the command name without the '!' prefix.
        // 'permission' is the group number from 0, 1, 2, 3, 4, 5, 6 and 7.
        // These are also used for the 'permcom' command.
        // $.registerChatCommand('script', 'command', 'permission');
        $.registerChatCommand('./custom/clangnetsass.js', 'lurk', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'unlurk', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'gamemods', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'gamertag', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'discord', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'followed', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'followers', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'howlong', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'howserver', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'howsong', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'notifications', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'steamgroup', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'steam', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'xebon', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'xebondiscord', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'humble', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'humblemonth', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'food', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'youtube', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'por-youtube', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'cdkeys', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'merch', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'chatcomm', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'socials', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'subs', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'hype', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'website', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'ads', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'raided', 2);
        $.registerChatCommand('./custom/clangnetsass.js', 'clangnetsass', 0);
        $.registerChatSubcommand('clangnetsass', 'offlinemode', 0);
        $.registerChatSubcommand('clangnetsass', 'debug', 0);
        $.registerChatSubcommand('clangnetsass', 'showvars', 0);
        $.registerChatSubcommand('clangnetsass', 'setpath', 0);
        $.registerChatSubcommand('clangnetsass', 'reloadkeys', 0);
    });

}) ();