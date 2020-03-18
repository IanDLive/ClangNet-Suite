// Elite Dangerous Commands - edinfo
// ---------------------------------
// Retrieves the info from OBS text files and places it as a ClangNet response in chat.
//

(function () {
    // General variables for the functions.
    var elitePBPath = 'C:/Users/Administrator/Google Drive/ElitePB/';
    // var elitePBPath = 'E:/My Online Libraries/Google Drive/ElitePB/';
    var shipModel = $.readFile(elitePBPath + 'EDship.txt', 'utf8');
    var shipName = $.readFile(elitePBPath + 'EDshipname.txt', 'utf8');
    var inDock = $.readFile(elitePBPath + 'EDdocked.txt', 'utf8');
    var starSystem = $.readFile(elitePBPath + 'EDstarsystem.txt', 'utf8');
    var systemBody = $.readFile(elitePBPath + 'EDbody.txt', 'utf8');
    var allowOffline = $.getSetIniDbBoolean('edInfo', 'allowOffline', false);
    var shipBuildEntry = $.getSetIniDbString('edShipBuild', '[DEFAULT ENTRY]', '[Web URL Here]');

    // Initialization text for the console.
    function initText() {
        $.consoleLn("***** Elite: Dangerous commands module online *****");
    }

    // Read data from the files when the function is called.
    function getEDData() {
        shipModel = $.readFile(elitePBPath + 'EDship.txt', 'utf8');
        shipName = $.readFile(elitePBPath + 'EDshipname.txt', 'utf8');
        inDock = $.readFile(elitePBPath + 'EDdocked.txt', 'utf8');
        starSystem = $.readFile(elitePBPath + 'EDstarsystem.txt', 'utf8');
        systemBody = $.readFile(elitePBPath + 'EDbody.txt', 'utf8');
    }

    // Command Event
    $.bind('command', function(event) {
        // All of the default methods are stored in the event argument.
        // To access a method, you would do 'event.myMethod()'.

        // Register all of the methods into variables for ease/readability.
        var command = event.getCommand();
        var sender = event.getSender();
        var arguments = event.getArguments();
        var args = event.getArgs();
        var action = args[0];
        var argShipName = args[1];
        var argBuildURL = args[2];

        // Retrieve the text from the relevant text files so they can be combined into a response.
        var currentGame;
        var strShip;
        var strShipInitial;

        // Determine whether the stream is online and if Elite: Dangerous is being played.
        currentGame = $.getGame($.channelName);
        if (command.equalsIgnoreCase('edofflinemode')) {
            if (allowOffline == false) {
                allowOffline = true;
                $.setIniDbBoolean('edinfo', 'allowOffline', true);
                $.say($.lang.get('edinfo.offlinemodetrue'));
                $.consoleLn($.lang.get('edinfo.offlinemodetrue'));
            } else {
                allowOffline = false;
                $.setIniDbBoolean('edinfo', 'allowOffline', false);
                $.say($.lang.get('edinfo.offlinemodefalse'));
                $.consoleLn($.lang.get('edinfo.offlinemodefalse'));
            }
            return;
        }
        if ($.isOnline($.channelName) || allowOffline == true) { 
            if (currentGame.equalsIgnoreCase('elite: dangerous')) { 
                if (shipName === undefined || shipName == null) {
                    shipName = '[SHIP NOT NAMED]';
                }
                // Construct the response for ClangNet to return, dependent on the command that is invoked.
                if (command.equalsIgnoreCase('edship')) {
                    getEDData();
                    strShip = String(shipModel);
                    strShipInitial = strShip.substr(0,1);
                    if (strShipInitial.equalsIgnoreCase('a')) {
                        $.say($.lang.get('edinfo.playing.shipwitha', shipModel, shipName));
                    } else {
                        $.say($.lang.get('edinfo.playing.shipwithouta', shipModel, shipName));
                    }
                }
                if (command.equalsIgnoreCase('edsystem')) {
                    getEDData();
                    if (inDock == 'Docked') {
                        $.say($.lang.get('edinfo.playing.systemdocked', starSystem, systemBody));
                    } else {
                        $.say($.lang.get('edinfo.playing.systemflying', starSystem));
                    }
                }
                if (command.equalsIgnoreCase('edshipbuild')) {
                    getEDData();
                    if (action === undefined) {
                        if ($.inidb.FileExists('edShipBuild')) {
                            if ($.inidb.exists('edShipBuild', shipName)) {
                                shipBuildEntry = $.getIniDbString('edShipBuild', shipName, '[No URL stored for key]');
                                $.say($.lang.get('edinfo.playing.shipbuild.current', shipModel, shipBuildEntry));
                                return;
                            } else {
                                $.say($.lang.get('edinfo.playing.shipbuild.notlogged'));
                                return;
                            }
                        } else {
                            $.consoleLn('edShipbuild table does not exist yet!')
                        }

                    } else {
                        if (action.equalsIgnoreCase('add')) {
                            if (argShipName === undefined || argShipName == null) {
                                $.say($.lang.get('edinfo.playing.shipbuild.addnoname'));
                                return;
                            } else {
                                if (argBuildURL === undefined || argBuildURL == null) {
                                    $.say($.lang.get('edinfo.playing.shipbuild.addnoURL'));
                                    return;
                                } else {
                                    $.setIniDbString('edShipBuild', argShipName, argBuildURL);
                                    $.say($.lang.get('edinfo.playing.shipbuild.addsuccess', argShipName, argBuildURL));
                                    return;
                                }
                            }
                        }
                        if (action.equalsIgnoreCase('delete')) {
                            if (argShipName === undefined || argShipName == null) {
                                $.say($.lang.get('edinfo.playing.shipbuild.delnoname'));
                                return;
                            } else {
                                if ($.inidb.exists('edShipBuild', argShipName)) {
                                    $.inidb.del('edShipBuild', argShipName);
                                    $.say($.lang.get('edinfo.playing.shipbuild.delsuccess', argShipName));
                                    return;
                                } else {
                                    $.say($.lang.get('edinfo.playing.shipbuild.delnokey'));
                                    return;
                                }
                            }
                        }
                        if (action.equalsIgnoreCase('update')) {
                            if (argShipName === undefined || argShipName == null) {
                                $.say($.lang.get('edinfo.playing.shipbuild.updatenoname'));
                                return;
                            } else {
                                if (argBuildURL === undefined || argBuildURL == null) {
                                    $.say($.lang.get('edinfo.playing.shipbuild.updatenoURL'));
                                    return;
                                } else {
                                    $.setIniDbString('edShipBuild', argShipName, argBuildURL);
                                    $.say($.lang.get('edinfo.playing.shipbuild.updatesuccess', argShipName, argBuildURL));
                                    return;
                                }
                            }
                        }
                    }
                }
                if (command.equalsIgnoreCase('edcareers')) {
                    $.say($.lang.get('edinfo.playing.edcareers'));
                }
                if (command.equalsIgnoreCase('designations')) {
                    $.say($.lang.get('edinfo.designations'));
                }
                if (command.equalsIgnoreCase('alicediscord')) {
                    $.say($.lang.get('edinfo.alicediscord'));
                }
            } else {
                // Currently online, but playing something else.
                $.say($.lang.get('edinfo.playing.othergame'));
            }
        } else {
                // Not online at all.
                $.say($.lang.get('edinfo.notplaying', $.getGame($.channelName)));
        }
    });

    // initReady event to register the commands.
    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./custom/edinfo.js')) {
            initText();
            // 'script' is the script location.  IT MUST BE IN SCRIPTS!!!
            // 'command' is the command name without the '!' prefix.
            // 'permission' is the group number from 0, 1, 2, 3, 4, 5, 6 and 7.
            // These are also used for the 'permcom' command.
            // $.registerChatCommand('script', 'command', 'permission');
            $.registerChatCommand('./custom/edinfo.js', 'edship', 7);
            $.registerChatCommand('./custom/edinfo.js', 'edsystem', 7);
            $.registerChatCommand('./custom/edinfo.js', 'edshipbuild', 7);
            $.registerChatSubcommand('edshipbuild', 'add', 1);
            $.registerChatSubcommand('edshipbuild', 'delete', 1);
            $.registerChatSubcommand('edshipbuild', 'update', 1);
            $.registerChatCommand('./custom/edinfo.js', 'edcareers', 7);
            $.registerChatCommand('./custom/edinfo.js', 'designations', 7);
            $.registerChatCommand('./custom/edinfo.js', 'alicediscord', 7);
            $.registerChatCommand('./custom/edinfo.js', 'edofflinemode', 1);
        }
    });
}) ();

