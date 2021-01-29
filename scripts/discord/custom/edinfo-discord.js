(function () {

    function formatState(incomingState) {
        var outgoingState;

        switch (incomingState) {
            case 'famine':
                outgoingState = 'Famine';
                break;
            case 'bust':
                outgoingState = 'Bust';
                break;
            case 'boom':
                outgoingState = 'Boom';
                break;
            case 'investment':
                outgoingState = 'Investment';
                break;
            case 'lockdown':
                outgoingState = 'Lockdown';
                break;
            case 'civilunrest':
                outgoingState = 'Civil Unrest';
                break;
            case 'civilliberty':
                outgoingState = 'Civil Liberty';
                break;
            case 'incursion':
                outgoingState = ':alien: Incursion';
                break;
            case 'infested':
                outgoingState = ':alien: Infested';
                break;
            case 'blight':
                outgoingState = ':warning: Blight';
                break;
            case 'drought':
                outgoingState = ':warning: Drought';
                break;
            case 'outbreak':
                outgoingState = ':warning: Outbreak';
                break;
            case 'infrastructurefailure':
                outgoingState = ':warning: Infrastructure Failure';
                break;
            case 'naturaldisaster':
                outgoingState = ':warning: Natural Disaster';
                break;
            case 'revolution':
                outgoingState = ':warning: Revolution';
                break;
            case 'coldwar':
                outgoingState = ':warning: Cold War';
                break;
            case 'tradewar':
                outgoingState = ':warning: Trade War';
                break;
            case 'pirateattack':
                outgoingState = ':warning: Pirate Attack';
                break;
            case 'terroristattack':
                outgoingState = ':warning: Terrorist Attack';
                break;
            case 'war':
                outgoingState = ':stop_sign: War';
                break;
            case 'civilwar':
                outgoingState = ':stop_sign: Civil War';
                break;
            case 'election':
                outgoingState = ':stop_sign: Elections';
                break;
            case 'retreat':
                outgoingState = 'Retreat';
                break;
            case 'expansion':
                outgoingState = 'Expansion';
                break;
            default:
                outgoingState = '';
        }
        return outgoingState;
    }

    function reqFS(channel, reqFaction) {
        const apiURL = 'https://elitebgs.app/api/ebgs/v5/systems?factionDetails=true&faction=';
        var factionData = { // Object that will be returned by the function call. 
            factionName: '',
            factionNameLower: '',
            systemString: ''
        };
        var systemsObj = { // Object that will colect the information for a single system.
            name: '',
            influence: '',
            states: '',
            closeCall: false,
            hasStates: false
        }
        var dataPackage;
        var jsonObject;
        var totalPages;
        var currentPage;
        var sysInfluence;
        var oppositionInfluence;
        var num;
        var upperThreshold;
        var lowerThreshold;
        var requestUrl;
        var x = 0; // Counter variable for pages
        var i = 0; // Counter variable for documents
        var j = 0; // Counter variable for faction manipulation - the requested faction
        var k = 0; // Counter variable for faction manipulation - all other factions
        var y = 0; // Counter variable for faction manipulation - active states
        var z = 0; // Counter variable for faction manipulation - pending states

        requestUrl = apiURL + reqFaction;
        dataPackage = $.cnGetJSONPackage(requestUrl);
        if (dataPackage.success) {
            jsonObject = JSON.parse(dataPackage.content);
            totalPages = jsonObject.pages;
            if (jsonObject.docs.length == 0) {
                $.discord.say(channel, $.lang.get('edinfo.discord.factionstatus.factionnotfound', reqFaction));
                factionData = null;
                return factionData;
            } else {
                $.discord.say(channel, $.lang.get('edinfo.discord.factionstatus.totalpages', totalPages.toString()));
                for (x = 0; x < totalPages; x++) { // Check each page until all of them are done
                    currentPage = x + 1;
                    requestUrl = apiURL + reqFaction + '&page=' + currentPage.toString();
                    dataPackage = $.cnGetJSONPackage(requestUrl);
                    if (dataPackage.success) {
                        $.discord.say(channel, $.lang.get('edinfo.discord.factionstatus.currentpage', currentPage.toString(), totalPages.toString()));
                        jsonObject = JSON.parse(dataPackage.content);
                        for (i = 0; i < jsonObject.docs.length; i++) { // Check each document within the page (max of 10)
                            systemsObj.name = jsonObject.docs[i].name; // Set the name of the current documents system to the systems object
                            for (j = 0; j < jsonObject.docs[i].factions.length; j++) { // Loop through the factions to find the requested faction's entry
                                if (jsonObject.docs[i].factions[j].name.equalsIgnoreCase(reqFaction)) { // Is the current faction ours?
                                    if (x == 0 && i == 0) { // Is this the first system that we have looked at? If so set the name of the requested faction
                                        factionData.factionName = jsonObject.docs[i].factions[j].name;
                                        factionData.factionNameLower = jsonObject.docs[i].factions[j].name_lower;
                                    }
                                    num = jsonObject.docs[i].factions[j].faction_details.faction_presence.influence * 100; // Convert the recorded value into a percentage number
                                    sysInfluence = num.toFixed(2); // Then set it to 2 decimal places.
                                    systemsObj.influence = sysInfluence.toString() + '%'; // Then convert it into a presentable string
                                    if (jsonObject.docs[i].factions[j].faction_details.faction_presence.active_states.length == 0 && jsonObject.docs[i].factions[j].faction_details.faction_presence.pending_states.length == 0) { // Has the requested faction have any states active or pending
                                        systemsObj.hasStates = false;
                                    } else {
                                        systemsObj.hasStates = true;
                                        systemsObj.states = '';
                                        if (jsonObject.docs[i].factions[j].faction_details.faction_presence.active_states.length > 0) { // Is there any active states
                                            systemsObj.states += 'ACTIVE: ';
                                            for (y = 0; y < jsonObject.docs[i].factions[j].faction_details.faction_presence.active_states.length; y++) {
                                                systemsObj.states += formatState(jsonObject.docs[i].factions[j].faction_details.faction_presence.active_states[y].state) + '; ';
                                            }
                                        }
                                        if (jsonObject.docs[i].factions[j].faction_details.faction_presence.pending_states.length > 0) { // Is there any pending states
                                            systemsObj.states += 'PENDING: ';
                                            for (z = 0; z < jsonObject.docs[i].factions[j].faction_details.faction_presence.pending_states.length; z++) {
                                                systemsObj.states += formatState(jsonObject.docs[i].factions[j].faction_details.faction_presence.pending_states[z].state) + '; ';
                                            }
                                        }
                                    }
                                }
                            }
                            for (k = 0; k < jsonObject.docs[i].factions.length; k++) { // loop through the factions again, but this time to find everyone else
                                if (jsonObject.docs[i].factions[k].name.equalsIgnoreCase(reqFaction)) {
                                    $.consoleDebug('Skipping our faction...'); // Dummy response as we want to accurately capture the negative of the condition.
                                } else {
                                    num = jsonObject.docs[i].factions[k].faction_details.faction_presence.influence * 100; // Convert the recorded value to a percentage number
                                    oppositionInfluence = num.toFixed(2); // Then set it to 2 decimal places
                                    upperThreshold = oppositionInfluence + 5; // Add 5 to the value to set the upper threshold for comparison
                                    lowerThreshold = oppositionInfluence - 5; // Subtract 5 from the value to set the lower threshold for comparison
                                    if ((sysInfluence >= lowerThreshold) && (sysInfluence <= upperThreshold)) { // Is our influence within the threshold, set a flag accordingly
                                        systemsObj.closeCall = true;
                                    } else {
                                        systemsObj.closeCall = false;
                                    }
                                }
                            }
                            $.consoleDebug('Page ' + currentPage + ', Doc ' + i + ', System: ' + systemsObj.name + ', Inf: ' + systemsObj.influence + ', States: ' + systemsObj.states + ', Close Flag: ' + systemsObj.close_call + ', States Flag: ' + systemsObj.hasStates);
                            if (systemsObj.closeCall || systemsObj.hasStates) { // If the flags are true, generate the string for the system
                                factionData.systemString += systemsObj.name + ' - ';
                                factionData.systemString += systemsObj.influence;
                                if (systemsObj.hasStates) {
                                    factionData.systemString += ' [ **' + systemsObj.states + '**]';
                                } else {
                                    factionData.systemString += ' [ __**Factions Close**__ ]';
                                }
                                factionData.systemString += '\n';
                            } else {
                                $.consoleDebug('Skipping system, nothing happening here!'); // Dummy response as the conditions have not been met
                            }
                        }
                    } else {
                        $.discord.say(channel, $.lang.get('edinfo.discord.common.apifail'));
                        factionData = null;
                        return factionData;
                    }
                }
            }
        } else {
            $.discord.say(channel, $.lang.get('edinfo.discord.common.apifail'));
            factionData = null;
            return factionData;
        }
        return factionData;
    }

    function reqFactionStatus(channel, reqFaction) {
        const apiURL = 'https://elitebgs.app/api/ebgs/v5/systems?factionDetails=true&faction=';
        var factionData = { // Object that will be returned by the function call. 
            faction_name: '',
            faction_name_lower: '',
            systemString: '',
            influenceString: '',
            closecallString: ''
        };
        var systemsObj = { // Object that will colect the information for a single system.
            name: '',
            influence: '',
            close_call: false
        };
        var dataPackage;
        var jsonObject;
        var totalPages;
        var currentPage;
        var sysInfluence;
        var oppositionInfluence;
        var num;
        var upperThreshold;
        var lowerThreshold;
        var requestUrl;
        var x = 0; // Counter variable for pages
        var i = 0; // Counter variable for documents
        var j = 0; // Counter variable for faction manipulation
        var k = 0; // counter variable for faction manipulation

        requestUrl = apiURL + reqFaction;
        dataPackage = $.cnGetJSONPackage(requestUrl);
        if (dataPackage.success) {
            jsonObject = JSON.parse(dataPackage.content);
            totalPages = jsonObject.pages;
            if (jsonObject.docs.length == 0) {
                $.discord.say(channel, $.lang.get('edinfo.discord.factionstatus.factionnotfound', reqFaction));
                factionData = null;
                return factionData;
            }
            $.discord.say(channel, $.lang.get('edinfo.discord.factionstatus.totalpages', totalPages.toString()));
            for (x = 0; x < totalPages; x++) {
                currentPage = x + 1;
                requestUrl = apiURL + reqFaction + '&page=' + currentPage.toString();
                dataPackage = $.cnGetJSONPackage(requestUrl);
                if (dataPackage.success) {
                    $.discord.say(channel, $.lang.get('edinfo.discord.factionstatus.currentpage', currentPage.toString(), totalPages.toString()));
                    jsonObject = JSON.parse(dataPackage.content);
                    for (i = 0; i < jsonObject.docs.length; i++) {
                        systemsObj.name = jsonObject.docs[i].name;
                        for (j = 0; j < jsonObject.docs[i].factions.length; j++) {
                            if (jsonObject.docs[i].factions[j].name.equalsIgnoreCase(reqFaction)) {
                                if (i == 0 && x == 0) {
                                    factionData.faction_name = jsonObject.docs[i].factions[j].name;
                                    factionData.faction_name_lower = jsonObject.docs[i].factions[j].name_lower;
                                }
                                num = jsonObject.docs[i].factions[j].faction_details.faction_presence.influence * 100;
                                sysInfluence = num.toFixed(2);
                                systemsObj.influence = sysInfluence.toString() + '%';
                            }
                        }
                        for (k = 0; k < jsonObject.docs[i].factions.length; k++) {
                            if (jsonObject.docs[i].factions[k].name.equalsIgnoreCase(reqFaction)) {
                                // Dummy response as we want to accurately capture the negative of the condition.
                                $.consoleDebug('Skipping our faction...');
                            } else {
                                num = jsonObject.docs[i].factions[k].faction_details.faction_presence.influence * 100;
                                oppositionInfluence = num.toFixed(2);
                                upperThreshold = oppositionInfluence + 5;
                                lowerThreshold = oppositionInfluence - 5;
                                if ((sysInfluence >= lowerThreshold) && (sysInfluence <= upperThreshold)) {
                                    systemsObj.close_call = true;
                                } else {
                                    systemsObj.close_call = false;
                                }
                            }
                        }
                        $.consoleDebug('Page ' + currentPage + ', Doc ' + i + ', System: ' + systemsObj.name + ', Inf: ' + systemsObj.influence + ', Close?: ' + systemsObj.close_call);
                        if (systemsObj.close_call) {
                            factionData.systemString += '**' + systemsObj.name + '**\n';
                            factionData.influenceString += '**' + systemsObj.influence + '**\n';
                            factionData.closecallString += ':exclamation:\n';
                        } else {
                            factionData.systemString += systemsObj.name + '\n';
                            factionData.influenceString += systemsObj.influence + '\n';
                            factionData.closecallString += ':white_check_mark:\n';
                        }
                    }
                } else {
                    $.discord.say($.lang.get('edinfo.discord.common.apifail'));
                    factionData = null;
                    return factionData;
                }
            }
        } else {
            $.discord.say(channel, $.lang.get('edinfo.discord.common.apifail'));
            factionData = null;
            return factionData;
        }
        return factionData;
    }

    // Command events
    $.bind('discordChannelCommand', function (event) {
        var command = event.getCommand();
        var sender = event.getSender();
        var channel = event.getDiscordChannel();
        var channelCheck = event.getChannel();
        var discordUser = event.getDiscordUser();
        var mention = event.getMention();
        var args = event.getArgs();
        var action = args[0];
        var reqFaction;
        var encodedFaction;
        var factionData;

        if (command.equalsIgnoreCase('edfactionstatus') && channelCheck.equalsIgnoreCase('elitedangerous-bgs')) {
            if (action !== undefined) {
                reqFaction = action;
                $.discord.say(channel, $.lang.get('edinfo.discord.factionstatus.startprocess'));
                factionData = reqFactionStatus(channel, reqFaction);
                if (factionData !== null) {
                    encodedFaction = encodeURI(factionData.faction_name_lower);
                    $.discordAPI.sendMessageEmbed(channel, new Packages.tv.phantombot.discord.util.EmbedBuilder()
                        .withColor(255, 128, 0)
                        .withTitle($.lang.get('edinfo.discord.factionstatus.bgsheader', factionData.faction_name))
                        .appendField('System', factionData.systemString, true)
                        .appendField('Influence', factionData.influenceString, true)
                        .appendField('Close', factionData.closecallString, true)
                        .withUrl('https://inara.cz/galaxy-minorfaction/?search=' + encodedFaction)
                        .build());
                }
            } else {
                $.discord.say(channel, $.lang.get('edinfo.discord.factionstatus.usage'));
            }
            return;
        }

        if (command.equalsIgnoreCase('edfs') && channelCheck.equalsIgnoreCase('elitedangerous-bgs')) {
            if (action !== undefined) {
                reqFaction = action;
                $.discord.say(channel, $.lang.get('edinfo.discord.factionstatus.startprocess'));
                factionData = reqFS(channel, reqFaction);
                if (factionData !== null) {
                    encodedFaction = encodeURI(factionData.factionNameLower);
                    $.discordAPI.sendMessageEmbed(channel, new Packages.tv.phantombot.discord.util.EmbedBuilder()
                        .withColor(255, 128, 0)
                        .withTitle($.lang.get('edinfo.discord.factionstatus.bgsheader', factionData.factionName))
                        .appendField('Systems', factionData.systemString, false)
                        .withUrl('https://inara.cz/galaxy-minorfaction/?search=' + encodedFaction)
                        .build());
                }
            } else {
                $.discord.say(channel, $.lang.get('edinfo.discord.edfs.usage'));
            }
            return;
        }

    });

    // initReady event to register the commands
    $.bind('initReady', function () {
        $.discord.registerCommand('./discord/custom/edinfo-discord.js', 'edfactionstatus', 0);
        $.discord.registerCommand('./discord/custom/edinfo-discord.js', 'edfs', 0);
    });

})();