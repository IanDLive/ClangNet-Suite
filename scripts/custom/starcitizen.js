// Star Citizen Commands - starcitizen
// ===================================
//
// Chat message responses for Star Citizen related commands.

(function () {

    // Initialization text for the console.
    function initText() {
        $.consoleLn("*****   Star Citizen commands module online   *****");
    }

    // Show the organization recruitment info in chat.
    function saySCOrg() {
        $.say($.lang.get('starcitizen.org'));
    }

    // Show the referral code in chat.
    function saySCReferral() {
        $.say($.lang.get('starcitizen.referral'));
    }

    // 'Bot' to randomly pick a Star Citizen line to say in chat when the timer is invoked, but only if Star Citizen is being played.
    function scTimerBot() {
        var currentGame;
        var intTimerChoice = Math.floor(Math.random() * 2);


        currentGame = $.getGame($.channelName);
        if ($.isOnline($.channelName) && currentGame.equalsIgnoreCase('star citizen')) {
            switch (intTimerChoice) {
                case 0:
                    saySCOrg();
                    break;
                case 1:
                    saySCReferral();
                    break;
            }
        }
    }

    $.bind('command', function (event) {
        var command = event.getCommand();

        // --- !scorg command ---
        if (command.equalsIgnoreCase('scorg')) {
            saySCOrg();
        }

        // --- !screferral command ---
        if (command.equalsIgnoreCase('screferral')) {
            saySCReferral();
        }
    });

    $.bind('initReady', function () {
        initText();
        $.registerChatCommand('./custom/starcitizen.js', 'scorg', 7);
        $.registerChatCommand('./custom/starcitizen.js', 'screferral', 7);
    });

    setTimeout(function () {
        setInterval(function () { scTimerBot(); }, 6e5, 'scripts::custom::starcitizen.js');
    }, 5e3);

})();