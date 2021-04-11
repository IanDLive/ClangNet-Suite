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
    var jokesEnabled = $.getSetIniDbBoolean('clangnetSass', 'jokesEnabled', true);
    var allowOfflineCmd = $.getSetIniDbBoolean('clangnetSass', 'allowOfflineCmd', false);
    var debugClangnet = $.getSetIniDbBoolean('clangnetSass', 'debugClangnet', false);

    // Initialise variables for this function and report debug mode on startup if it is enabled.
    function initText() {
        allowOfflineCmd = $.getIniDbBoolean('clangnetSass', 'allowOfflineCmd');
        debugClangnet = $.getIniDbBoolean('clangnetSass', 'debugClangnet');
        $.consoleLn("╔═════════════════════════════════════════════════╗");
        $.consoleLn("║       Clangnet Sass commands module online      ║");
        $.consoleLn("╚═════════════════════════════════════════════════╝");
        if (allowOfflineCmd) {
            $.consoleLn($.lang.get('clangnetsass.offlinemodetrue'));
        }
        if (debugClangnet) {
            $.consoleLn('[CLANGNET DEBUG] ClangnetSass Debug Facility Enabled');
        }
    }

    // Retrieve a Dad Joke from the API and say it in chat, use to make independent of bot timers.
    function getAnyJoke() {
        var jsonObject;
        var returnText;
        var intJokeChoice = Math.floor(Math.random() * 3);

        switch (intJokeChoice) {
            case 0:
                jsonObject = JSON.parse($.cnGetJSON('https://icanhazdadjoke.com/slack'));
                returnText = jsonObject.attachments[0].text;
                break;
            case 1:
                jsonObject = JSON.parse($.cnGetJSON('https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&type=single'));
                returnText = jsonObject.joke;
                break;
            case 2:
                jsonObject = JSON.parse($.cnGetJSON('https://uselessfacts.jsph.pl/random.json?language=en'));
                returnText = 'Useless Fact: ' + jsonObject.text;
                break;
        }
        return returnText;
    }

    // 'Bot' used to automatically say a joke in chat.
    function sayAnyJoke(invokedBy, isCommanded) {
        var intEmoteChoice = Math.floor(Math.random() * 4);
        var strEmoteChoice;

        if (jokesEnabled == true) {
            if ($.isOnline($.channelName)) {
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
                if (isCommanded == true) {
                    atSender = $.cnUserStrings(invokedBy);
                    $.say($.lang.get('clangnetsass.jokesonline', atSender[0]));
                }
            }
        } else {
            if (isCommanded == true) {
                $.say($.lang.get('clangnetsass.jokesdisabled'));
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
        var atSender;
        var queryItem;
        var apiURL;

        // Determine whether the stream is online before executing any of the sass commands.
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

        if (command.equalsIgnoreCase('gamemods')) {
            var modSender = $.cnUserStrings(sender);
            if ($.isOnline($.channelName) || allowOfflineCmd == true) {
                var currentGame = $.getGame($.channelName);
                var lc_currentGame = currentGame.toLowerCase();
                switch (lc_currentGame) {
                    case 'space engineers':
                        $.say($.lang.get('clangnetsass.se-mods'));
                        break;
                    case 'fallout 4':
                        $.say($.lang.get('clangnetsass.fo-mods'));
                        break;
                    case 'the elder scrolls online':
                        $.say($.lang.get('clangnetsass.eso-mods'));
                        break;
                    case 'the elder scrolls v: skyrim':
                        $.say($.lang.get('clangnetsass.skse-mods'));
                        break;
                    case 'elite: dangerous':
                        $.say($.lang.get('clangnetsass.ed-mods'));
                        break;
                    case 'kerbal space program':
                        $.say($.lang.get('clangnetsass.ksp-mods'));
                        break;
                    default:
                        $.say($.lang.get('clangnetsass.mods-notused'));
                        break;
                }
            } else {
                $.say($.lang.get('clangnetsass.mods-notonline', modSender[0]));
            }
        }

        if (command.equalsIgnoreCase('handle')) {
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
        // --- !ctt (Click-to-Tweet) command ---
        if (command.equalsIgnoreCase('ctt')) {
            $.say($.lang.get('clangnetsass.ctt'));
        }

        // --- !discord command ---
        if (command.equalsIgnoreCase('discord')) {
            $.say($.lang.get('clangnetsass.discord'));
        }

        // --- !followed command ---
        if (command.equalsIgnoreCase('followed')) {
            atSender = $.cnUserStrings(sender);
            if (args[0] !== undefined) {
                queryItem = $.cnUserStrings(args[0]);
                apiURL = 'https://decapi.me/twitch/followed/iandlive/' + queryItem[1];
                $.say($.lang.get('clangnetsass.followedquery', atSender[0], queryItem[1], $.customAPI.get(apiURL).content));
            } else {
                apiURL = 'https://decapi.me/twitch/followed/iandlive/' + sender;
                $.say($.lang.get('clangnetsass.followed', atSender[0], $.customAPI.get(apiURL).content));
            }
        }

        // --- !followers command ---
        if (command.equalsIgnoreCase('followers')) {
            atSender = $.cnUserStrings(sender);
            if (args[0] !== undefined) {
                queryItem = $.cnUserStrings(args[0]);
                apiURL = 'https://decapi.me/twitch/followcount/' + queryItem[1];
                $.say($.lang.get('clangnetsass.followersquery', atSender[0], queryItem[1], $.customAPI.get(apiURL).content));
            } else {
                apiURL = 'https://decapi.me/twitch/followcount/iandlive';
                $.say($.lang.get('clangnetsass.followers', atSender[0], $.customAPI.get(apiURL).content));
            }
        }

        // --- !howlong command ---
        if (command.equalsIgnoreCase('howlong')) {
            atSender = $.cnUserStrings(sender);
            if (args[0] !== undefined) {
                queryItem = $.cnUserStrings(args[0]);
                apiURL = 'https://decapi.me/twitch/followage/iandlive/' + queryItem[1];
                $.say($.lang.get('clangnetsass.howlongquery', atSender[0], queryItem[1], $.customAPI.get(apiURL).content));
            } else {
                apiURL = 'https://decapi.me/twitch/followage/iandlive/' + sender;
                $.say($.lang.get('clangnetsass.howlong', atSender[0], $.customAPI.get(apiURL).content));
            }
        }

        // --- !howserver command ---
        if (command.equalsIgnoreCase('howserver')) {
            $.say($.lang.get('clangnetsass.howserver'));
        }

        // --- !steamgroup command ---
        if (command.equalsIgnoreCase('steamgroup')) {
            $.say($.lang.get('clangnetsass.steamgroup'));
        }

        // --- !steam command ---
        if (command.equalsIgnoreCase('steam')) {
            $.say($.lang.get('clangnetsass.steam'));
        }

        // --- !xebon command ---
        if (command.equalsIgnoreCase('xebon')) {
            $.say($.lang.get('clangnetsass.xebon'));
        }

        // --- !xebondiscord command ---
        if (command.equalsIgnoreCase('xebondiscord')) {
            $.say($.lang.get('clangnetsass.xebondiscord'));
        }

        // --- !humble command ---
        if (command.equalsIgnoreCase('humble')) {
            $.say($.lang.get('clangnetsass.humble'));
        }

        // --- !humblemonth command ---
        if (command.equalsIgnoreCase('humblemonth')) {
            $.say($.lang.get('clangnetsass.humblemonth'));
        }

        // --- !emotes command ---
        if (command.equalsIgnoreCase('emotes')) {
            apiURL = 'http://decapi.me/twitch/subscriber_emotes/iandlive';
            $.say($.lang.get('clangnetsass.emotes', $.customAPI.get(apiURL).content));
        }

        // --- !food command ---
        if (command.equalsIgnoreCase('food')) {
            $.say($.lang.get('clangnetsass.food'));
        }

        // --- !youtube command ---
        if (command.equalsIgnoreCase('youtube')) {
            $.say($.lang.get('clangnetsass.youtube'));
        }

        // --- !por-youtube command ---
        if (command.equalsIgnoreCase('por-youtube')) {
            $.say($.lang.get('clangnetsass.por-youtube'));
        }

        // --- !cdkeys command ---
        if (command.equalsIgnoreCase('cdkeys')) {
            $.say($.lang.get('clangnetsass.cdkeys'));
        }

        // --- !chatrules command (MOD LEVEL) ---
        if (command.equalsIgnoreCase('chatrules')) {
            apiURL = 'http://decapi.me/twitch/chat_rules/iandlive';
            $.say($.customAPI.get(apiURL).content);
        }

        // --- !jokes command ('toggle' AT CASTER/BOT LEVEL) ---
        if (command.equalsIgnoreCase('jokes')) {
            if (args[0] === undefined) {
                sayAnyJoke(sender, true);
            } else {
                if (args[0].equalsIgnoreCase('toggle')) {
                    atSender = $.cnUserStrings(sender);
                    jokesEnabled = !jokesEnabled;
                    $.setIniDbBoolean('clangnetSass', 'jokesEnabled', jokesEnabled);
                    $.say($.lang.get('clangnetsass.jokesenabled', atSender[0], (jokesEnabled === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled'))));
                    $.consoleLn($.lang.get('clangnetsass.jokesenabled', atSender[1], (jokesEnabled === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled'))));
                }
            }
        }

        // --- !socials command ---
        if (command.equalsIgnoreCase('socials')) {
            $.say($.lang.get('clangnetsass.socials'));
        }

        // --- !clangnetofflinemode command ---
        if (command.equalsIgnoreCase('clangnetofflinemode')) {
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

        // --- !debugclangnetsass command ---
        if (command.equalsIgnoreCase('debugclangnetsass')) {
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

        // --- !clangnetshowvars command ---
        if (command.equalsIgnoreCase('clangnetshowvars')) {
            if (debugClangnet) {
                currentGame = $.getGame($.channelName);
                $.say($.lang.get('clangnetsass.showvars.success'));
                $.consoleLn('[CLANGNET DEBUG] *** START OF VARIABLES ***');
                $.consoleLn('[CLANGNET DEBUG] Current Game = ' + currentGame);
                $.consoleLn('[CLANGNET DEBUG] ***  END OF VARIABLES  ***');
            } else {
                $.say($.lang.get('clangnetsass.showvars.failed'));
                $.consoleLn($.lang.get('clangnetsass.showvars.failed'));
            }
            return;
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
        $.registerChatCommand('./custom/clangnetsass.js', 'gamemods', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'handle', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'ctt', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'discord', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'followed', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'followers', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'howlong', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'howserver', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'steamgroup', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'steam', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'xebon', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'xebondiscord', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'humble', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'humblemonth', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'emotes', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'food', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'youtube', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'por-youtube', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'cdkeys', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'jokes', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'socials', 7);
        $.registerChatSubcommand('jokes', 'toggle', 0);
        $.registerChatCommand('./custom/clangnetsass.js', 'chatrules', 2);
        $.registerChatCommand('./custom/clangnetsass.js', 'clangnetofflinemode', 0);
        $.registerChatCommand('./custom/clangnetsass.js', 'debugclangnetsass', 0);
        $.registerChatCommand('./custom/clangnetsass.js', 'clangnetshowvars', 0);
    });

    setTimeout(function () {
        setInterval(function () { sayAnyJoke('', false); }, 9e5, 'scripts::custom::clangnetsass.js');
    }, 7e3);

}) ();