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
    // Retrieval of JSON object from and external API.
    function _getJSON(url) {
        var HttpRequest = Packages.com.gmt2001.HttpRequest;
        var HashMap = Packages.java.util.HashMap;
        var responseData = HttpRequest.getData(HttpRequest.RequestType.GET, encodeURI(url), '', new HashMap());
        return responseData.content;
    }

    // Retrieve a Dad Joke from the API and say it in chat, use to make independent of bot timers.
    function getDadJoke() {
        var jsonObject;
        jsonObject = JSON.parse(_getJSON('https://icanhazdadjoke.com/slack'));
        return jsonObject.attachments[0].text;
    }

    // 'Bot' used to automatically say a dad joke in chat.
    function sayDadJoke() {
        if ($.isOnline($.channelName)) {
            $.say(getDadJoke());
        }
    }

    // Command Event
    $.bind('command', function (event) {

        function userStrings(user) {
            var user_mention = '';
            var user_string = '';

            if (user.substr(0, 1) == '@') {
                user_mention = user;
                user_string = user.substr(1);
            } else {
                user_mention = '@' + user;
                user_string = user;
            }
            return [user_mention, user_string];
        }

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
        if ($.isOnline($.channelName)) {
            // The stream is online.
            // --- Lurk command ---
            if (command.equalsIgnoreCase('lurk')) {
                var intResponseChoice = Math.floor(Math.random() * 5);
                var lurkSender = '@' + sender;
                switch (intResponseChoice) {
                    case 0:
                        $.say($.lang.get('clangnetsass.lurk.response0', lurkSender));
                        break;
                    case 1:
                        $.say($.lang.get('clangnetsass.lurk.response1', lurkSender));
                        break;
                    case 2:
                        $.say($.lang.get('clangnetsass.lurk.response2', lurkSender));
                        break;      
                    case 3:
                        $.say($.lang.get('clangnetsass.lurk.response3', lurkSender));
                        break;
                    case 4:
                        $.say($.lang.get('clangnetsass.lurk.response4', lurkSender));
                        break;
                    case 5:
                        $.say($.lang.get('clangnetsass.lurk.response5', lurkSender));
                        break;

                }
            }
        } else {
            // Not online at all.
            if (command.equalsIgnoreCase('lurk')) {
                $.say($.lang.get('clangnetsass.lurk.darkinhere'));
            }
        }

        // Commands that are not online/offline dependent.
        // --- !clothing command ---
        if (command.equalsIgnoreCase('clothing')) {
            $.say($.lang.get('clangnetsass.clothing'));
        }

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
            atSender = '@' + sender;
            if (args[0] !== undefined) {
                queryItem = userStrings(args[0]);
                apiURL = 'https://decapi.me/twitch/followed/iandlive/' + queryItem[1];
                $.say($.lang.get('clangnetsass.followedquery', atSender, queryItem[1], $.customAPI.get(apiURL).content));
            } else {
                apiURL = 'https://decapi.me/twitch/followed/iandlive/' + sender;
                $.say($.lang.get('clangnetsass.followed', atSender, $.customAPI.get(apiURL).content));
            }
        }

        // --- !followers command ---
        if (command.equalsIgnoreCase('followers')) {
            atSender = '@' + sender;
            if (args[0] !== undefined) {
                queryItem = userStrings(args[0]);
                apiURL = 'https://decapi.me/twitch/followcount/' + queryItem[1];
                $.say($.lang.get('clangnetsass.followersquery', atSender, queryItem[1], $.customAPI.get(apiURL).content));
            } else {
                apiURL = 'https://decapi.me/twitch/followcount/iandlive';
                $.say($.lang.get('clangnetsass.followers', atSender, $.customAPI.get(apiURL).content));
            }ex
        }

        // --- !howlong command ---
        if (command.equalsIgnoreCase('howlong')) {
            atSender = '@' + sender;
            if (args[0] !== undefined) {
                queryItem = userStrings(args[0]);
                apiURL = 'https://decapi.me/twitch/followage/iandlive/' + queryItem[1];
                $.say($.lang.get('clangnetsass.howlongquery', atSender, queryItem[1], $.customAPI.get(apiURL).content));
            } else {
                apiURL = 'https://decapi.me/twitch/followage/iandlive/' + sender;
                $.say($.lang.get('clangnetsass.howlong', atSender, $.customAPI.get(apiURL).content));
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

/*      // --- !se-mods command ---
        if (command.equalsIgnoreCase('se-mods')) {
            $.say($.lang.get('clangnetsass.se-mods'));
        }

        // --- !fo-mods command ---
        if (command.equalsIgnoreCase('fo-mods')) {
            $.say($.lang.get('clangnetsass.fo-mods'));
        }

        // --- !skse-mods command ---
        if (command.equalsIgnoreCase('skse-mods')) {
            $.say($.lang.get('clangnetsass.skse-mods'));
        }
*/
        // --- !mods command ---
        if (command.equalsIgnoreCase('mods')) {
            currentGame = $.getGame($.channelName);
            if (currentGame.equalsIgnoreCase('space engineers')) {
                $.say($.lang.get('clangnetsass.se-mods'));
            }
            if (currentGame.equalsIgnoreCase('fallout 4')) {
                $.say($.lang.get('clangnetsass.fo-mods'));
            }
            if (currentGame.equalsIgnoreCase('the elder scrolls online')) {
                $.say($.lang.get('clangnetsass.eso-mods'));
            }
            if (currentGame.equalsIgnoreCase('the elder scrolls v: skyrim')) {
                $.say($.lang.get('clangnetsass.skse-mods'));
            } else {
                $.say($.lang.get('clangnetsass.no-mods-used'));
            }
        }

        // --- !food command ---
        if (command.equalsIgnoreCase('food')) {
            $.say($.lang.get('clangnetsass.food'));
        }

        // --- !merchandise command ---
        // if (command.equalsIgnoreCase('merchandise')) {
        //     $.say($.lang.get('clangnetsass.merchandise'));
        // }

        // --- !viewplaylist command ---
        if (command.equalsIgnoreCase('viewplaylist')) {
            $.say($.lang.get('clangnetsass.viewplaylist'));
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

        // --- !dadjoke command (CASTER/BOT LEVEL) ---
        if (command.equalsIgnoreCase('dadjoke')) {
            $.say(getDadJoke());
        }
    });

    $.bind('initReady', function() {
        // 'script' is the script location.  IT MUST BE IN SCRIPTS!!!
        // 'command' is the command name without the '!' prefix.
        // 'permission' is the group number from 0, 1, 2, 3, 4, 5, 6 and 7.
        // These are also used for the 'permcom' command.
        // $.registerChatCommand('script', 'command', 'permission');
        $.registerChatCommand('./custom/clangnetsass.js', 'lurk', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'clothing', 7);
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
//      $.registerChatCommand('./custom/clangnetsass.js', 'se-mods', 7);
//      $.registerChatCommand('./custom/clangnetsass.js', 'fo-mods', 7);
//      $.registerChatCommand('./custom/clangnetsass.js', 'skse-mods', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'mods', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'food', 7);
//      $.registerChatCommand('./custom/clangnetsass.js', 'merchandise', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'viewplaylist', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'youtube', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'por-youtube', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'cdkeys', 7);
        $.registerChatCommand('./custom/clangnetsass.js', 'chatrules', 2);
        $.registerChatCommand('./custom/clangnetsass.js', 'dadjoke', 0);
    });

    setTimeout(function () {
        setInterval(function () { sayDadJoke(); }, 6e5, 'scripts::custom::clangnetsass.js');
    }, 5e3);

}) ();