// Elite Dangerous Commands - edinfo
// ---------------------------------
// Retrieves the info from OBS text files and places it as a ClangNet response in chat.
//

(function () {
    function initText() {
        $.consoleLn("***** Elite: Dangerous commands module online *****");
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
        var elitePBPath = 'C:/Users/Administrator/Google Drive/ElitePB/';
        var shipModel = $.readFile(elitePBPath + 'EDship.txt', 'utf8');
        var shipName = $.readFile(elitePBPath + 'EDshipname.txt', 'utf8');
        var inDock = $.readFile(elitePBPath + 'EDdocked.txt', 'utf8');
        var starSystem = $.readFile(elitePBPath + 'EDstarsystem.txt', 'utf8');
        var systemBody = $.readFile(elitePBPath + 'EDbody.txt', 'utf8');
        var inaraCmdrId = $.readFile(elitePBPath + 'Custom/Inara/CMDRID.txt');
        var inaraShipId = $.readFile(elitePBPath + 'Custom/Coriolis/' + shipName + '.txt');
        var currentGame;
        var strShip;
        var strShipInitial;

        // Determine whether the stream is online and if Elite: Dangerous is being played.
        currentGame = $.getGame($.channelName);
        if ($.isOnline($.channelName)) { 
            if (currentGame.equalsIgnoreCase('elite: dangerous')) { 
                if (shipName === undefined || shipName == null) {
                    shipName = '[SHIP NOT NAMED]';
                }
                // Construct the response for ClangNet to return, dependent on the command that is invoked.
                if (command.equalsIgnoreCase('edship')) {
                    strShip = String(shipModel);
                    strShipInitial = strShip.substr(0,1);
                    if (strShipInitial.equalsIgnoreCase('a')) {
                        $.say($.lang.get('edinfo.playing.shipwitha', shipModel, shipName));
                    } else {
                        $.say($.lang.get('edinfo.playing.shipwithouta', shipModel, shipName));
                    }
                }
                if (command.equalsIgnoreCase('edsystem')) {
                    if (inDock == 'Docked') {
                        $.say($.lang.get('edinfo.playing.systemdocked', starSystem, systemBody));
                    } else {
                        $.say($.lang.get('edinfo.playing.systemflying', starSystem));
                    }
                }
                if (command.equalsIgnoreCase('edshipbuild')) {
                    // $.say($.lang.get('edinfo.playing.shipbuild', shipModel, inaraCmdrId, inaraShipId));
                    // Check to see if there is a subcommand added to the command itself.
                    if (action === undefined) {
                        // Check to see if the ship build info exists in the ClangNet database.
                        if (!$.inidb.exists('edShipBuild', shipName)) {
                            $.say($.lang.get('edinfo.playing.shipbuild.notlogged'));
                            return;
                        } else {
                            var currentBuild = $.getIniDbString('edShipBuild', shipName);
                            $.say($.lang.get('edinfo.playing.shipbuild.current', shipModel, currentBuild));
                        }
                    } else {
                        // Add a ship to the database.
                        if (action.equalsIgnoreCase('add')) {
                            if (argShipName !== undefined || argShipName != null) {
                                    if (argBuildURL !== undefined || argBuildURL != null) {
                                    $.setIniDbString('edShipBuild', argShipName, argBuildURL);
                                    $.say($.lang.get('edinfo.playing.shipbuild.addsuccess', argShipName, argBuildURL));
                                } else {
                                    $.say($.lang.get('edinfo.playing.shipbuild.addnoURL'));
                                }
                            } else {
                                $.say($.lang.get('edinfo.playing.shipbuild.addnoname'));
                            }
                        }
                        // Delete a ship from the database.
                        if (action.equalsIgnoreCase('delete')) {
                            if (argShipName !== undefined || argShipName != null) {
                                $.inidb.del('edShipBuild', argShipName);
                                $.say($.lang.get('edinfo.playing.shipbuild.delsuccess', argShipName));
                            } else {
                                $.say($.lang.get('edinfo.playing.shipbuild.delnoname'));
                            }
                        }
                        // Update a ship within the database.
                        if (action.equalsIgnoreCase('update')) {
                            if (argShipName !== undefined || argShipName != null) {
                                if (argBuildURL !== undefined || argBuildURL != null) {
                                    $.getSetIniDbString('edShipBuild', argShipName, argBuildURL);
                                    $.say($.lang.get('edinfo.playing.shipbuild.updatesuccess', argShipName, argBuildURL));
                                } else {
                                    $.say($.lang.get('edinfo.playing.shipbuild.updatenoURL'));
                                }
                            } else {
                                $.say($.lang.get('edinfo.playing.shipbuild.updatenoname'));
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
        }
    });
}) ();

