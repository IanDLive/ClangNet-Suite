// Elite Dangerous Commands - edinfo
// ---------------------------------
// Retrieves the info from OBS text files and places it as a ClangNet response in chat.
//

(function () {
    // General variables for the functions.
    var elitePBPath = $.getSetIniDbString('edInfo', 'filePath', '[No URL Set]');
    var allowOffline = $.getSetIniDbBoolean('edInfo', 'allowOffline', false);
    var debugEDInfo = $.getSetIniDbBoolean('edInfo', 'debugEDInfo', false);
    var cmdrName = $.getSetIniDbString('edInfo', 'cmdrName', 'CMDR');
    var shipBuildEntry = $.getSetIniDbString('edShipBuild', '[DEFAULT ENTRY]', '[Web URL Here]');
    var shipModel;
    var shipName;
    var inDock;
    var starSystem;
    var systemBody;
    var pathSet;
    var noticeReqMessages = $.getIniDbNumber('noticeSettings', 'reqmessages');
    var noticeInterval = $.getIniDbNumber('noticeSettings', 'interval');
    var messageCount = 0;
    var lastNoticeSent = 0;

    // Initialization text for the console.
    function initText() {
        allowOffline = $.getIniDbBoolean('edInfo', 'allowOffline');
        debugEDInfo = $.getIniDbBoolean('edInfo', 'debugEDInfo');
        cmdrName = $.getIniDbString('edInfo', 'cmdrName');
        $.consoleLn("+++>>> Elite: Dangerous commands module online");
        if (debugEDInfo) {
            $.consoleLn("+++>>> [EDINFO DEBUG] EDInfo Debug Facility Enabled");
        }
        $.consoleLn("+++>>> EDDiscovery OBS File Path set to: " + elitePBPath);
        if (elitePBPath.equalsIgnoreCase('[no url set]')) {
            $.consoleLn($.lang.get('edinfo.needtosetpath'));
            return;
        } else {
            getEDData();
            return;
        }
    }

    // Read data from the files when the function is called.
    function getEDData() {
        if (elitePBPath.equalsIgnoreCase('[no url set]')) {
            pathSet = false;
            $.say($.lang.get('edinfo.needtosetpath'));
            return;
        } else {
            pathSet = true;
            shipModel = $.readFile(elitePBPath + 'EDship.txt');
            shipName = $.readFile(elitePBPath + 'EDshipname.txt');
            inDock = $.readFile(elitePBPath + 'EDdocked.txt');
            starSystem = $.readFile(elitePBPath + 'EDstarsystem.txt');
            systemBody = $.readFile(elitePBPath + 'EDbody.txt');
            if (debugEDInfo) {
                $.consoleLn("[EDINFO DEBUG] shipModel = " + shipModel);
                $.consoleLn("[EDINFO DEBUG] shipName = " + shipName);
                $.consoleLn("[EDINFO DEBUG] inDock = " + inDock);
                $.consoleLn("[EDINFO DEBUG] starSystem = " + starSystem);
                $.consoleLn("[EDINFO DEBUG] systemBody = " + systemBody);
            }
            return;
        }
    }

    function reloadEDInfo() {
        allowOffline = $.getIniDbBoolean('edInfo', 'allowOffline');
        debugEDInfo = $.getIniDbBoolean('edInfo', 'debugEDInfo');
        elitePBPath = $.getIniDbString('edInfo', 'filePath');
        cmdrName = $.getIniDbString('edInfo', 'cmdrName');
    }

    function sayEDCareers() {
        $.say($.lang.get('edinfo.playing.edcareers'));
    }

    function sayEDScreenshots() {
        $.say($.lang.get('edinfo.playing.edscreenshots'));
    }

    function edTimerBot() {
        var currentGame;
        var intTimerChoice = Math.floor(Math.random() * 2);

        currentGame = $.getGame($.channelName);
        if ($.isOnline($.channelName) && currentGame.equalsIgnoreCase('elite: dangerous')) {
            switch (intTimerChoice) {
                case 0:
                    sayEDCareers();
                    break;
                case 1:
                    sayEDScreenshots();
                    break;
            }
        } else {
            return;
        }
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
        var currentGame = $.getGame($.channelName);
        var strShip;
        var strShipInitial;

        allowOffline = $.getIniDbBoolean('edInfo', 'allowOffline');

        if ($.isOnline($.channelName) || allowOffline == true) {
            if (currentGame.equalsIgnoreCase('elite: dangerous') || allowOffline == true) {
                if (shipName === undefined || shipName == null) {
                    shipName = '[SHIP NOT NAMED]';
                }
                // Construct the response for ClangNet to return, dependent on the command that is invoked.
                if (command.equalsIgnoreCase('edship')) {
                    getEDData();
                    if (pathSet) {
                        strShip = String(shipModel);
                        strShipInitial = strShip.substr(0, 1);
                        if (strShipInitial.equalsIgnoreCase('a') || strShipInitial.equalsIgnoreCase('e') || strShipInitial.equalsIgnoreCase('i') || strShipInitial.equalsIgnoreCase('o') || strShipInitial.equalsIgnoreCase('u')) {
                            $.say($.lang.get('edinfo.playing.shipwitha', cmdrName, shipModel, shipName));
                        } else {
                            $.say($.lang.get('edinfo.playing.shipwithouta', cmdrName, shipModel, shipName));
                        }
                    }
                }
                if (command.equalsIgnoreCase('edsystem')) {
                    getEDData();
                    if (pathSet) {
                        if (inDock == 'Docked') {
                            $.say($.lang.get('edinfo.playing.systemdocked', cmdrName, starSystem, systemBody));
                        } else {
                            $.say($.lang.get('edinfo.playing.systemflying', cmdrName, starSystem));
                        }
                    }
                }
                if (command.equalsIgnoreCase('edshipbuild')) {
                    getEDData();
                    if (pathSet) {
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
                }
                if (command.equalsIgnoreCase('edcareers')) {
                    sayEDCareers();
                }
                if (command.equalsIgnoreCase('edscreenshots')) {
                    sayEDScreenshots();
                }
                if (command.equalsIgnoreCase('designations')) {
                    $.say($.lang.get('edinfo.designations'));
                }
                if (command.equalsIgnoreCase('alicediscord')) {
                    $.say($.lang.get('edinfo.alicediscord'));
                }
            } else {
                // Currently online, but playing something else.
                $.say($.lang.get('edinfo.playing.othergame', cmdrName));
            }
        } else {
            $.say($.lang.get('edinfo.offline', cmdrName));
        }

        // Universal commands, game determination not required.
        if (command.equalsIgnoreCase('edofflinemode')) {
            allowOffline = $.getIniDbBoolean('edInfo', 'allowOffline');
            if (allowOffline == false) {
                allowOffline = true;
                $.setIniDbBoolean('edInfo', 'allowOffline', true);
                $.say($.lang.get('edinfo.offlinemodetrue'));
                $.consoleLn($.lang.get('edinfo.offlinemodetrue'));
            } else {
                allowOffline = false;
                $.setIniDbBoolean('edInfo', 'allowOffline', false);
                $.say($.lang.get('edinfo.offlinemodefalse'));
                $.consoleLn($.lang.get('edinfo.offlinemodefalse'));
            }
            return;
        }

        if (command.equalsIgnoreCase('debugedinfo')) {
            debugEDInfo = $.getIniDbBoolean('edInfo', 'debugEDInfo');
            if (debugEDInfo == false) {
                debugEDInfo = true;
                $.setIniDbBoolean('edInfo', 'debugEDInfo', true);
                $.say($.lang.get('edinfo.debugmodetrue'));
                $.consoleLn($.lang.get('[EDINFO DEBUG] ' + 'edinfo.debugmodetrue'));
            } else {
                debugEDInfo = false;
                $.setIniDbBoolean('edInfo', 'debugEDInfo', false);
                $.say($.lang.get('edinfo.debugmodefalse'));
                $.consoleLn('[EDINFO DEBUG] ' + $.lang.get('edinfo.debugmodefalse'));
            }
        }

        if (command.equalsIgnoreCase('edinfopath')) {
            if (action === undefined || action == null) {
                // No path set with the command.
                $.say($.lang.get('edinfo.nofilepathset'));
                return;
            } else {
                $.setIniDbString('edInfo', 'filePath', action);
                $.say($.lang.get('edinfo.obsfilepathset', action));
                elitePBPath = action;
                return;
            }
        }

        if (command.equalsIgnoreCase('edsetname')) {
            if (action === undefined || action == null) {
                // No name set with the command.
                $.say($.lang.get('edinfo.cmdrname.notspecified'));
                return;
            } else {
                $.setIniDbString('edInfo', 'cmdrName', action);
                $.say($.lang.get('edinfo.cmdrname.nameupdated', action));
                cmdrName = action;
            }
        }

        if (command.equalsIgnoreCase('edtb')) {
            edTimerBot();
        }

        // Panel commands, no command path needed here.
        if (command.equalsIgnoreCase('reloadedinfo')) {
            reloadEDInfo();
        }
    });

    $.bind('ircChannelMessage', function (event) {
        messageCount++;
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
            $.registerChatCommand('./custom/edinfo.js', 'edscreenshots', 7);
            $.registerChatCommand('./custom/edinfo.js', 'designations', 7);
            $.registerChatCommand('./custom/edinfo.js', 'alicediscord', 7);
            $.registerChatCommand('./custom/edinfo.js', 'edofflinemode', 1);
            $.registerChatCommand('./custom/edinfo.js', 'debugedinfo', 1);
            $.registerChatCommand('./custom/edinfo.js', 'edinfopath', 1);
            $.registerChatCommand('./custom/edinfo.js', 'edsetname', 1);
            $.registerChatCommand('./custom/edinfo.js', 'reloadedinfo', 1);
            $.registerChatCommand('./custom/edinfo.js', 'edtb', 0);
        }
    });

    $.reloadEDInfo = reloadEDInfo;
}) ();

