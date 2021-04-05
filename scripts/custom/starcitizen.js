// Star Citizen Commands - starcitizen
// ===================================
//
// Chat message responses for Star Citizen related commands.

(function () {
var noticeReqMessages = $.getIniDbNumber('noticeSettings', 'reqmessages');
var noticeInterval = $.getIniDbNumber('noticeSettings', 'interval');
var messageCount = 0;
var lastNoticeSent = 0;

    // Initialization text for the console.
    function initText() {
        $.consoleLn("╔═════════════════════════════════════════════════╗");
        $.consoleLn("║       Star Citizen commands module online       ║");
        $.consoleLn("╚═════════════════════════════════════════════════╝");
    }

    // Show the organization recruitment info in chat.
    function saySCOrg() {
        $.say($.lang.get('starcitizen.org'));
    }

    // Show the referral code in chat.
    function saySCReferral() {
        $.say($.lang.get('starcitizen.referral'));
    }

    // Show the link to the ship matrix in chat.
    function saySCShips() {
        $.say($.lang.get('starcitizen.ships'));
    }

    // Show the link to the development roadmap in chat.
    function saySCRoadmap() {
        $.say($.lang.get('starcitizen.roadmap'));
    }

    // Show the message to upload and view screenshots on the webiste.
    function saySCScreenshots() {
        $.say($.lang.get('starcitizen.screenshots'));
    }

    // 'Bot' to randomly pick a Star Citizen line to say in chat when the timer is invoked, but only if Star Citizen is being played.
    function scTimerBot() {
        var currentGame;
        var intTimerChoice = Math.floor(Math.random() * 5);


        currentGame = $.getGame($.channelName);
        if ($.isOnline($.channelName) && currentGame.equalsIgnoreCase('star citizen')) {
            switch (intTimerChoice) {
                case 0:
                    saySCOrg();
                    break;
                case 1:
                    saySCReferral();
                    break;
                case 2:
                    saySCShips();
                    break;
                case 3:
                    saySCRoadmap();
                    break;
                case 4:
                    saySCScreenshots();
                    break;
            }
        }
    }

    $.bind('ircChannelMessage', function (event) {
        messageCount++;
    });

    $.bind('command', function (event) {
        var command = event.getCommand();
        var currentGame;

        currentGame = $.getGame($.channelName);
        if ($.isOnline($.channelName) && currentGame.equalsIgnoreCase('star citizen')) {
            // --- !scorg command ---
            if (command.equalsIgnoreCase('scorg')) {
                saySCOrg();
            }

            // --- !screferral command ---
            if (command.equalsIgnoreCase('screferral')) {
                saySCReferral();
            }

            // --- !scships command ---
            if (command.equalsIgnoreCase('scships')) {
                saySCShips();
            }

            // --- !scroadmap command ---
            if (command.equalsIgnoreCase('scroadmap')) {
                saySCRoadmap();
            }

            // --- !scscreenshot command ---
            if (command.equalsIgnoreCase('scscreenshots')) {
                saySCScreenshots();
            }
        } else {
            $.say($.lang.get('starcitizen.playing.othergame'));
        }
    });

    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/starcitizen.js')) {
            initText();
            $.registerChatCommand('./custom/starcitizen.js', 'scorg', 7);
            $.registerChatCommand('./custom/starcitizen.js', 'screferral', 7);
            $.registerChatCommand('./custom/starcitizen.js', 'scships', 7);
            $.registerChatCommand('./custom/starcitizen.js', 'scroadmap', 7);
            $.registerChatCommand('./custom/starcitizen.js', 'scscreenshots', 7);
        }
    });

    setTimeout(function () {
        setInterval(function () {
            if ((noticeReqMessages < 0 || messageCount >= noticeReqMessages) && (lastNoticeSent + (noticeInterval * 6e4)) <= $.systemTime()) {
                scTimerBot();
                messageCount = 0;
                lastNoticeSent = $.systemTime();
            }
        }, 1e4, 'scripts::custom::starcitizen.js');
    }, 5e3);

})();