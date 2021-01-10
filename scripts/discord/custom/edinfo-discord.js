(function () {

    function reqFactionStatus(channel, reqFaction) {
        var factionData = {
            faction_name: '',
            faction_name_lower: '',
            systemString: '',
            influenceString: '',
            closecallString: ''
        };
        var systemsObj = {
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
        var x = 0;
        var i = 0;
        var j = 0;
        var k = 0;

        requestUrl = 'https://elitebgs.app/api/ebgs/v5/systems?factionDetails=true&faction=' + reqFaction;
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
                requestUrl = 'https://elitebgs.app/api/ebgs/v5/systems?factionDetails=true&faction=' + reqFaction + '&page=' + currentPage.toString();
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
                                $.consoleLn('Skipping our faction...');
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
                        $.consoleLn('Page ' + currentPage + ', Doc ' + i + ', System: ' + systemsObj.name + ', Inf: ' + systemsObj.influence + ', Close?: ' + systemsObj.close_call);
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
            $.discord.say($.lang.get('edinfo.discord.common.apifail'));
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

        if (command.equalsIgnoreCase('edfactionstatus') && channelCheck.equalsIgnoreCase('elitedangerous-bgs')) {
            var reqFaction;
            var encodedFaction;
            var factionData;

            if (action !== undefined) {
                reqFaction = action;
            } else {
                reqFaction = 'xebon syndicate';
            }
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
            return;
        }

    });

    // initReady event to register the commands
    $.bind('initReady', function () {
        $.discord.registerCommand('./discord/custom/edinfo-discord.js', 'edfactionstatus', 0);
    });

})();