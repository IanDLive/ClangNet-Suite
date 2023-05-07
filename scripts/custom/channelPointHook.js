(function () {
    var clip1Toggle = $.getSetIniDbBoolean('channelPointsHookSettings', 'clip1Toggle', false),
        clip1ID = $.getSetIniDbString('channelPointsHookSettings', 'clip1ID', 'noIDSet'),
        clip1Config = $.getSetIniDbBoolean('channelPointsHookSettings', 'clip1Config', false),
        clip1Hook = $.getSetIniDbString('channelPointsHookSettings', 'clip1Hook', 'noHookSet'),
        clip1Reward = $.getSetIniDbString('channelPointsHookSettings', 'clip1Reward', 'noNameSet'),
        clip2Toggle = $.getSetIniDbBoolean('channelPointsHookSettings', 'clip2Toggle', false),
        clip2ID = $.getSetIniDbString('channelPointsHookSettings', 'clip2ID', 'noIDSet'),
        clip2Config = $.getSetIniDbBoolean('channelPointsHookSettings', 'clip2Config', false),
        clip2Hook = $.getSetIniDbString('channelPointsHookSettings', 'clip2Hook', 'noHookSet'),
        clip2Reward = $.getSetIniDbString('channelPointsHookSettings', 'clip2Reward', 'noNameSet'),
        clip3Toggle = $.getSetIniDbBoolean('channelPointsHookSettings', 'clip3Toggle', false),
        clip3ID = $.getSetIniDbString('channelPointsHookSettings', 'clip3ID', 'noIDSet'),
        clip3Config = $.getSetIniDbBoolean('channelPointsHookSettings', 'clip3Config', false),
        clip3Hook = $.getSetIniDbString('channelPointsHookSettings', 'clip3Hook', 'noHookSet'),
        clip3Reward = $.getSetIniDbString('channelPointsHookSettings', 'clip3Reward', 'noNameSet'),
        clip4Toggle = $.getSetIniDbBoolean('channelPointsHookSettings', 'clip4Toggle', false),
        clip4ID = $.getSetIniDbString('channelPointsHookSettings', 'clip4ID', 'noIDSet'),
        clip4Config = $.getSetIniDbBoolean('channelPointsHookSettings', 'clip4Config', false),
        clip4Hook = $.getSetIniDbString('channelPointsHookSettings', 'clip4Hook', 'noHookSet'),
        clip4Reward = $.getSetIniDbString('channelPointsHookSettings', 'clip4Reward', 'noNameSet'),
        clip5Toggle = $.getSetIniDbBoolean('channelPointsHookSettings', 'clip5Toggle', false),
        clip5ID = $.getSetIniDbString('channelPointsHookSettings', 'clip5ID', 'noIDSet'),
        clip5Config = $.getSetIniDbBoolean('channelPointsHookSettings', 'clip5Config', false),
        clip5Hook = $.getSetIniDbString('channelPointsHookSettings', 'clip5Hook', 'noHookSet'),
        clip5Reward = $.getSetIniDbString('channelPointsHookSettings', 'clip5Reward', 'noNameSet'),
        clip6Toggle = $.getSetIniDbBoolean('channelPointsHookSettings', 'clip6Toggle', false),
        clip6ID = $.getSetIniDbString('channelPointsHookSettings', 'clip6ID', 'noIDSet'),
        clip6Config = $.getSetIniDbBoolean('channelPointsHookSettings', 'clip6Config', false),
        clip6Hook = $.getSetIniDbString('channelPointsHookSettings', 'clip6Hook', 'noHookSet'),
        clip6Reward = $.getSetIniDbString('channelPointsHookSettings', 'clip6Reward', 'noNameSet'),
        clip7Toggle = $.getSetIniDbBoolean('channelPointsHookSettings', 'clip7Toggle', false),
        clip7ID = $.getSetIniDbString('channelPointsHookSettings', 'clip7ID', 'noIDSet'),
        clip7Config = $.getSetIniDbBoolean('channelPointsHookSettings', 'clip7Config', false),
        clip7Hook = $.getSetIniDbString('channelPointsHookSettings', 'clip7Hook', 'noHookSet'),
        clip7Reward = $.getSetIniDbString('channelPointsHookSettings', 'clip7Reward', 'noNameSet');

    function updateChannelPointsHookConfig() {
        clip1Toggle = $.getIniDbBoolean('channelPointsHookSettings', 'clip1Toggle', false);
        clip1ID = $.getIniDbString('channelPointsHookSettings', 'clip1ID', 'noIDSet');
        clip1Config = $.getIniDbBoolean('channelPointsHookSettings', 'clip1Config', false);
        clip1Hook = $.getIniDbString('channelPointsHookSettings', 'clip1Hook', 'noHookSet');
        clip1Reward = $.getIniDbString('channelPointsHookSettings', 'clip1Reward', 'noNameSet');
        clip2Toggle = $.getIniDbBoolean('channelPointsHookSettings', 'clip2Toggle', false);
        clip2ID = $.getIniDbString('channelPointsHookSettings', 'clip2ID', 'noIDSet');
        clip2Config = $.getIniDbBoolean('channelPointsHookSettings', 'clip2Config', false);
        clip2Hook = $.getIniDbString('channelPointsHookSettings', 'clip2Hook', 'noHookSet');
        clip2Reward = $.getIniDbString('channelPointsHookSettings', 'clip2Reward', 'noNameSet');
        clip3Toggle = $.getIniDbBoolean('channelPointsHookSettings', 'clip3Toggle', false);
        clip3ID = $.getIniDbString('channelPointsHookSettings', 'clip3ID', 'noIDSet');
        clip3Config = $.getIniDbBoolean('channelPointsHookSettings', 'clip3Config', false);
        clip3Hook = $.getIniDbString('channelPointsHookSettings', 'clip3Hook', 'noHookSet');
        clip3Reward = $.getIniDbString('channelPointsHookSettings', 'clip3Reward', 'noNameSet');
        clip4Toggle = $.getIniDbBoolean('channelPointsHookSettings', 'clip4Toggle', false);
        clip4ID = $.getIniDbString('channelPointsHookSettings', 'clip4ID', 'noIDSet');
        clip4Config = $.getIniDbBoolean('channelPointsHookSettings', 'clip4Config', false);
        clip4Hook = $.getIniDbString('channelPointsHookSettings', 'clip4Hook', 'noHookSet');
        clip4Reward = $.getIniDbString('channelPointsHookSettings', 'clip4Reward', 'noNameSet');
        clip5Toggle = $.getIniDbBoolean('channelPointsHookSettings', 'clip5Toggle', false);
        clip5ID = $.getIniDbString('channelPointsHookSettings', 'clip5ID', 'noIDSet');
        clip5Config = $.getIniDbBoolean('channelPointsHookSettings', 'clip5Config', false);
        clip5Hook = $.getIniDbString('channelPointsHookSettings', 'clip5Hook', 'noHookSet');
        clip5Reward = $.getIniDbString('channelPointsHookSettings', 'clip5Reward', 'noNameSet');
        clip6Toggle = $.getIniDbBoolean('channelPointsHookSettings', 'clip6Toggle', false);
        clip6ID = $.getIniDbString('channelPointsHookSettings', 'clip6ID', 'noIDSet');
        clip6Config = $.getIniDbBoolean('channelPointsHookSettings', 'clip6Config', false);
        clip6Hook = $.getIniDbString('channelPointsHookSettings', 'clip6Hook', 'noHookSet');
        clip6Reward = $.getIniDbString('channelPointsHookSettings', 'clip6Reward', 'noNameSet');
        clip7Toggle = $.getIniDbBoolean('channelPointsHookSettings', 'clip7Toggle', false);
        clip7ID = $.getIniDbString('channelPointsHookSettings', 'clip7ID', 'noIDSet');
        clip7Config = $.getIniDbBoolean('channelPointsHookSettings', 'clip7Config', false);
        clip7Hook = $.getIniDbString('channelPointsHookSettings', 'clip7Hook', 'noHookSet');
        clip7Reward = $.getIniDbString('channelPointsHookSettings', 'clip7Reward', 'noNameSet');
    }

    /*
     * @event command
     */
    $.bind('command', function (event) {
        var sender = event.getSender(),
            command = event.getCommand(),
            args = event.getArgs(),
            action = args[0];

        if (command.equalsIgnoreCase('channelpointshook')) {
            if (action === undefined) {
                if (clip1Toggle === false && clip2Toggle === false && clip3Toggle === false && clip4Toggle === false && clip5Toggle === false && clip6Toggle === false && clip7Toggle === false) {
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.notenabled'));
                    return;
                }
                var config = '';
                if (clip1Toggle === true) {
                    config += ' clip1';
                }
                if (clip2Toggle === true) {
                    config += ' clip2';
                }
                if (clip3Toggle === true) {
                    config += ' clip3';
                }
                if (clip4Toggle === true) {
                    config += ' clip4';
                }
                if (clip5Toggle === true) {
                    config += ' clip5';
                }
                if (clip6Toggle === true) {
                    config += ' clip6';
                }
                if (clip7Toggle == true) {
                    config += ' clip7';
                }
                $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.current', config));
                return;
            }

            /*
             * @commandpath usage
             */
            if (action.equalsIgnoreCase('usage')) {
                $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.usage'));
                return;
            }

            /*
             * @commandpath info
             */
            if (action.equalsIgnoreCase('info')) {
                $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.info'));
                return;
            }

            /*
             * @commandpath clip1
             */
            if (action.equalsIgnoreCase('clip1')) {
                if (args[1] === undefined) {
                    if (clip1Toggle === false) {
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip1.info'));
                        return;
                    }
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip1.current', clip1Reward, clip1Hook));
                    return;
                }

                /*
                 * @commandpath clip1 usage
                 */
                if (args[1].equalsIgnoreCase('usage')) {
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip1.usage'));
                    return;
                }

                /*
                 * @commandpath clip1 config
                 */
                if (args[1].equalsIgnoreCase('config')) {
                    clip1Config = !clip1Config;
                    $.getSetIniDbBoolean('channelPointsHookSettings', 'clip1Config', clip1Config);
                    if (clip1Config === true) {
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip1.config.start'));
                        clip1ID = 'noIDSet';
                        clip1Reward = 'noNameSet';
                        $.setIniDbString('channelPointsHookSettings', 'clip1ID', clip1ID);
                        $.setIniDbString('channelPointsHookSettings', 'clip1Reward', clip1Reward);
                        return;
                    }
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.config.failed'));
                    // config is closed when the reward is successfully redeemed - see the reward ID config in channel points events below.
                    return;
                }

                /*
                 * @commandpath clip1 hook
                 */
                if (args[1].equalsIgnoreCase('hook')) {
                    if (args[2] === undefined) {
                        if (clip1Hook.equals('noHookSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip1.hook.notset'));
                            return;
                        }
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip1.hook.usage', clip1Hook));
                        return;
                    }
                    clip1Hook = args[2];
                    $.setIniDbString('channelPointsHookSettings', 'clip1Hook', clip1Hook);
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip1.hook.message', clip1Hook));
                    return;
                }

                /*
                 * @commandpath clip1 toggle
                 */
                if (args[1].equalsIgnoreCase('toggle')) {
                    if (clip1Toggle === false) {
                        if (clip1ID.equals('noIDSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip1.toggle.id'));
                            return;
                        }
                        if (clip1Hook.equals('noHookSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip1.toggle.hook'));
                            return;
                        }
                    }
                    clip1Toggle = !clip1Toggle;
                    $.setIniDbBoolean('channelPointsHookSettings', 'clip1Toggle', clip1Toggle);
                    $.say($.whisperPrefix(sender) + (clip1Toggle ? $.lang.get('channelpointshook.clip1.enabled', clip1Reward) : $.lang.get('channelpointshook.clip1.disabled')));
                    return;
                }
            }

            /*
             * @commandpath clip2
             */
            if (action.equalsIgnoreCase('clip2')) {
                if (args[1] === undefined) {
                    if (clip2Toggle === false) {
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip2.info'));
                        return;
                    }
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip2.current', clip2Reward, clip2Hook));
                    return;
                }

                /*
                 * @commandpath clip2 usage
                 */
                if (args[1].equalsIgnoreCase('usage')) {
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip2.usage'));
                    return;
                }

                /*
                 * @commandpath clip2 config
                 */
                if (args[1].equalsIgnoreCase('config')) {
                    clip2Config = !clip2Config;
                    $.getSetIniDbBoolean('channelPointsHookSettings', 'clip2Config', clip2Config);
                    if (clip2Config === true) {
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip2.config.start'));
                        clip2ID = 'noIDSet';
                        clip2Reward = 'noNameSet';
                        $.setIniDbString('channelPointsHookSettings', 'clip2ID', clip2ID);
                        $.setIniDbString('channelPointsHookSettings', 'clip2Reward', clip2Reward);
                        return;
                    }
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.config.failed'));
                    // config is closed when the reward is successfully redeemed - see the reward ID config in channel points events below.
                    return;
                }

                /*
                 * @commandpath clip2 hook
                 */
                if (args[1].equalsIgnoreCase('hook')) {
                    if (args[2] === undefined) {
                        if (clip2Hook.equals('noHookSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip2.hook.notset'));
                            return;
                        }
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip2.hook.usage', clip2Hook));
                        return;
                    }
                    clip2Hook = args[2];
                    $.setIniDbString('channelPointsHookSettings', 'clip2Hook', clip2Hook);
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip2.hook.message', clip2Hook));
                    return;
                }

                /*
                 * @commandpath clip2 toggle
                 */
                if (args[1].equalsIgnoreCase('toggle')) {
                    if (clip2Toggle === false) {
                        if (clip2ID.equals('noIDSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip2.toggle.id'));
                            return;
                        }
                        if (clip2Hook.equals('noHookSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip2.toggle.hook'));
                            return;
                        }
                    }
                    clip2Toggle = !clip2Toggle;
                    $.setIniDbBoolean('channelPointsHookSettings', 'clip2Toggle', clip2Toggle);
                    $.say($.whisperPrefix(sender) + (clip2Toggle ? $.lang.get('channelpointshook.clip2.enabled', clip2Reward) : $.lang.get('channelpointshook.clip2.disabled')));
                    return;
                }
            }

            /*
             * @commandpath clip3
             */
            if (action.equalsIgnoreCase('clip3')) {
                if (args[1] === undefined) {
                    if (clip3Toggle === false) {
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip3.info'));
                        return;
                    }
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip3.current', clip3Reward, clip3Hook));
                    return;
                }

                /*
                 * @commandpath clip3 usage
                 */
                if (args[1].equalsIgnoreCase('usage')) {
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip3.usage'));
                    return;
                }

                /*
                 * @commandpath clip3 config
                 */
                if (args[1].equalsIgnoreCase('config')) {
                    clip3Config = !clip3Config;
                    $.getSetIniDbBoolean('channelPointsHookSettings', 'clip3Config', clip3Config);
                    if (clip3Config === true) {
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip3.config.start'));
                        clip3ID = 'noIDSet';
                        clip3Reward = 'noNameSet';
                        $.setIniDbString('channelPointsHookSettings', 'clip3ID', clip3ID);
                        $.setIniDbString('channelPointsHookSettings', 'clip3Reward', clip3Reward);
                        return;
                    }
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.config.failed'));
                    // config is closed when the reward is successfully redeemed - see the reward ID config in channel points events below.
                    return;
                }

                /*
                 * @commandpath clip3 hook
                 */
                if (args[1].equalsIgnoreCase('hook')) {
                    if (args[2] === undefined) {
                        if (clip3Hook.equals('noHookSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip3.hook.notset'));
                            return;
                        }
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip3.hook.usage', clip3Hook));
                        return;
                    }
                    clip3Hook = args[2];
                    $.setIniDbString('channelPointsHookSettings', 'clip3Hook', clip3Hook);
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip3.hook.message', clip3Hook));
                    return;
                }

                /*
                 * @commandpath clip3 toggle
                 */
                if (args[1].equalsIgnoreCase('toggle')) {
                    if (clip3Toggle === false) {
                        if (clip3ID.equals('noIDSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip3.toggle.id'));
                            return;
                        }
                        if (clip3Hook.equals('noHookSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip3.toggle.hook'));
                            return;
                        }
                    }
                    clip3Toggle = !clip3Toggle;
                    $.setIniDbBoolean('channelPointsHookSettings', 'clip3Toggle', clip3Toggle);
                    $.say($.whisperPrefix(sender) + (clip3Toggle ? $.lang.get('channelpointshook.clip3.enabled', clip3Reward) : $.lang.get('channelpointshook.clip3.disabled')));
                    return;
                }
            }

            /*
             * @commandpath clip4
             */
            if (action.equalsIgnoreCase('clip4')) {
                if (args[1] === undefined) {
                    if (clip4Toggle === false) {
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip4.info'));
                        return;
                    }
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip4.current', clip4Reward, clip4Hook));
                    return;
                }

                /*
                 * @commandpath clip4 usage
                 */
                if (args[1].equalsIgnoreCase('usage')) {
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip4.usage'));
                    return;
                }

                /*
                 * @commandpath clip4 config
                 */
                if (args[1].equalsIgnoreCase('config')) {
                    clip4Config = !clip4Config;
                    $.getSetIniDbBoolean('channelPointsHookSettings', 'clip4Config', clip4Config);
                    if (clip4Config === true) {
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip4.config.start'));
                        clip4ID = 'noIDSet';
                        clip4Reward = 'noNameSet';
                        $.setIniDbString('channelPointsHookSettings', 'clip4ID', clip4ID);
                        $.setIniDbString('channelPointsHookSettings', 'clip4Reward', clip4Reward);
                        return;
                    }
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.config.failed'));
                    // config is closed when the reward is successfully redeemed - see the reward ID config in channel points events below.
                    return;
                }

                /*
                 * @commandpath clip4 hook
                 */
                if (args[1].equalsIgnoreCase('hook')) {
                    if (args[2] === undefined) {
                        if (clip4Hook.equals('noHookSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip4.hook.notset'));
                            return;
                        }
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip4.hook.usage', clip4Hook));
                        return;
                    }
                    clip4Hook = args[2];
                    $.setIniDbString('channelPointsHookSettings', 'clip4Hook', clip4Hook);
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip4.hook.message', clip4Hook));
                    return;
                }

                /*
                 * @commandpath clip4 toggle
                 */
                if (args[1].equalsIgnoreCase('toggle')) {
                    if (clip4Toggle === false) {
                        if (clip4ID.equals('noIDSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip4.toggle.id'));
                            return;
                        }
                        if (clip4Hook.equals('noHookSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip4.toggle.hook'));
                            return;
                        }
                    }
                    clip4Toggle = !clip4Toggle;
                    $.setIniDbBoolean('channelPointsHookSettings', 'clip4Toggle', clip4Toggle);
                    $.say($.whisperPrefix(sender) + (clip4Toggle ? $.lang.get('channelpointshook.clip4.enabled', clip4Reward) : $.lang.get('channelpointshook.clip4.disabled')));
                    return;
                }
            }

            /*
             * @commandpath clip5
             */
            if (action.equalsIgnoreCase('clip5')) {
                if (args[1] === undefined) {
                    if (clip5Toggle === false) {
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip5.info'));
                        return;
                    }
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip5.current', clip5Reward, clip5Hook));
                    return;
                }

                /*
                 * @commandpath clip5 usage
                 */
                if (args[1].equalsIgnoreCase('usage')) {
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip5.usage'));
                    return;
                }

                /*
                 * @commandpath clip5 config
                 */
                if (args[1].equalsIgnoreCase('config')) {
                    clip5Config = !clip5Config;
                    $.getSetIniDbBoolean('channelPointsHookSettings', 'clip5Config', clip5Config);
                    if (clip5Config === true) {
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip5.config.start'));
                        clip5ID = 'noIDSet';
                        clip5Reward = 'noNameSet';
                        $.setIniDbString('channelPointsHookSettings', 'clip5ID', clip5ID);
                        $.setIniDbString('channelPointsHookSettings', 'clip5Reward', clip5Reward);
                        return;
                    }
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.config.failed'));
                    // config is closed when the reward is successfully redeemed - see the reward ID config in channel points events below.
                    return;
                }

                /*
                 * @commandpath clip5 hook
                 */
                if (args[1].equalsIgnoreCase('hook')) {
                    if (args[2] === undefined) {
                        if (clip5Hook.equals('noHookSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip5.hook.notset'));
                            return;
                        }
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip5.hook.usage', clip5Hook));
                        return;
                    }
                    clip5Hook = args[2];
                    $.setIniDbString('channelPointsHookSettings', 'clip5Hook', clip5Hook);
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip5.hook.message', clip5Hook));
                    return;
                }

                /*
                 * @commandpath clip5 toggle
                 */
                if (args[1].equalsIgnoreCase('toggle')) {
                    if (clip5Toggle === false) {
                        if (clip5ID.equals('noIDSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip5.toggle.id'));
                            return;
                        }
                        if (clip5Hook.equals('noHookSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip5.toggle.hook'));
                            return;
                        }
                    }
                    clip5Toggle = !clip5Toggle;
                    $.setIniDbBoolean('channelPointsHookSettings', 'clip5Toggle', clip5Toggle);
                    $.say($.whisperPrefix(sender) + (clip5Toggle ? $.lang.get('channelpointshook.clip5.enabled', clip5Reward) : $.lang.get('channelpointshook.clip5.disabled')));
                    return;
                }
            }

            /*
             * @commandpath clip6
             */
            if (action.equalsIgnoreCase('clip6')) {
                if (args[1] === undefined) {
                    if (clip6Toggle === false) {
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip6.info'));
                        return;
                    }
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip6.current', clip6Reward, clip6Hook));
                    return;
                }

                /*
                 * @commandpath clip6 usage
                 */
                if (args[1].equalsIgnoreCase('usage')) {
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip6.usage'));
                    return;
                }

                /*
                 * @commandpath clip6 config
                 */
                if (args[1].equalsIgnoreCase('config')) {
                    clip6Config = !clip6Config;
                    $.getSetIniDbBoolean('channelPointsHookSettings', 'clip6Config', clip6Config);
                    if (clip6Config === true) {
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip6.config.start'));
                        clip6ID = 'noIDSet';
                        clip6Reward = 'noNameSet';
                        $.setIniDbString('channelPointsHookSettings', 'clip6ID', clip6ID);
                        $.setIniDbString('channelPointsHookSettings', 'clip6Reward', clip6Reward);
                        return;
                    }
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.config.failed'));
                    // config is closed when the reward is successfully redeemed - see the reward ID config in channel points events below.
                    return;
                }

                /*
                 * @commandpath clip6 hook
                 */
                if (args[1].equalsIgnoreCase('hook')) {
                    if (args[2] === undefined) {
                        if (clip6Hook.equals('noHookSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip6.hook.notset'));
                            return;
                        }
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip6.hook.usage', clip6Hook));
                        return;
                    }
                    clip6Hook = args[2];
                    $.setIniDbString('channelPointsHookSettings', 'clip6Hook', clip6Hook);
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip6.hook.message', clip6Hook));
                    return;
                }

                /*
                 * @commandpath clip6 toggle
                 */
                if (args[1].equalsIgnoreCase('toggle')) {
                    if (clip6Toggle === false) {
                        if (clip6ID.equals('noIDSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip6.toggle.id'));
                            return;
                        }
                        if (clip6Hook.equals('noHookSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip6.toggle.hook'));
                            return;
                        }
                    }
                    clip6Toggle = !clip6Toggle;
                    $.setIniDbBoolean('channelPointsHookSettings', 'clip6Toggle', clip6Toggle);
                    $.say($.whisperPrefix(sender) + (clip6Toggle ? $.lang.get('channelpointshook.clip6.enabled', clip6Reward) : $.lang.get('channelpointshook.clip6.disabled')));
                    return;
                }
            }

            /*
             * @commandpath clip7
             */
            if (action.equalsIgnoreCase('clip7')) {
                if (args[1] === undefined) {
                    if (clip7Toggle === false) {
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip7.info'));
                        return;
                    }
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip7.current', clip7Reward, clip7Hook));
                    return;
                }

                /*
                 * @commandpath clip7 usage
                 */
                if (args[1].equalsIgnoreCase('usage')) {
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip7.usage'));
                    return;
                }

                /*
                 * @commandpath clip7 config
                 */
                if (args[1].equalsIgnoreCase('config')) {
                    clip7Config = !clip7Config;
                    $.getSetIniDbBoolean('channelPointsHookSettings', 'clip7Config', clip7Config);
                    if (clip7Config === true) {
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip7.config.start'));
                        clip7ID = 'noIDSet';
                        clip7Reward = 'noNameSet';
                        $.setIniDbString('channelPointsHookSettings', 'clip7ID', clip7ID);
                        $.setIniDbString('channelPointsHookSettings', 'clip7Reward', clip7Reward);
                        return;
                    }
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.config.failed'));
                    // config is closed when the reward is successfully redeemed - see the reward ID config in channel points events below.
                    return;
                }

                /*
                 * @commandpath clip7 hook
                 */
                if (args[1].equalsIgnoreCase('hook')) {
                    if (args[2] === undefined) {
                        if (clip7Hook.equals('noHookSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip7.hook.notset'));
                            return;
                        }
                        $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip7.hook.usage', clip7Hook));
                        return;
                    }
                    clip7Hook = args[2];
                    $.setIniDbString('channelPointsHookSettings', 'clip7Hook', clip7Hook);
                    $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip7.hook.message', clip7Hook));
                    return;
                }

                /*
                 * @commandpath clip7 toggle
                 */
                if (args[1].equalsIgnoreCase('toggle')) {
                    if (clip7Toggle === false) {
                        if (clip7ID.equals('noIDSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip7.toggle.id'));
                            return;
                        }
                        if (clip7Hook.equals('noHookSet')) {
                            $.say($.whisperPrefix(sender) + $.lang.get('channelpointshook.clip7.toggle.hook'));
                            return;
                        }
                    }
                    clip7Toggle = !clip7Toggle;
                    $.setIniDbBoolean('channelPointsHookSettings', 'clip7Toggle', clip7Toggle);
                    $.say($.whisperPrefix(sender) + (clip7Toggle ? $.lang.get('channelpointshook.clip7.enabled', clip7Reward) : $.lang.get('channelpointshook.clip7.disabled')));
                    return;
                }
            }
        }
    })

    /*
     * @event channelPointsRedemptions
     */
    $.bind('PubSubChannelPoints', function (event) {
        var redemptionID = event.getRedemptionID(),
            rewardID = event.getRewardID(),
            userID = event.getUserID(),
            username = event.getUsername(),
            displayName = event.getDisplayName(),
            rewardTitle = event.getRewardTitle(),
            cost = event.getCost(),
            inputPrompt = event.getInputPrompt(),
            userInput = event.getUserInput(),
            fulfillmentStatus = event.getFulfillmentStatus();

        $.consoleDebug('Channel Point event ' + rewardTitle + ' parsed to JavaScript. ID is: ' + rewardID);

        /*
         * rewardID config
         */
        if (clip1Config === true) {
            clip1ID = rewardID;
            clip1Reward = rewardTitle;
            $.setIniDbString('channelPointsHookSettings', 'clip1ID', clip1ID);
            $.setIniDbString('channelPointsHookSettings', 'clip1Reward', clip1Reward);
            clip1Config = false;
            $.setIniDbBoolean('channelPointsHookSettings', 'clip1Config', clip1Config);
            $.say($.lang.get('channelpointshook.clip1.config.complete', clip1Reward));
            return;
        }

        if (clip2Config === true) {
            clip2ID = rewardID;
            clip2Reward = rewardTitle;
            $.setIniDbString('channelPointsHookSettings', 'clip2ID', clip2ID);
            $.setIniDbString('channelPointsHookSettings', 'clip2Reward', clip2Reward);
            clip2Config = false;
            $.setIniDbBoolean('channelPointsHookSettings', 'clip2Config', clip2Config);
            $.say($.lang.get('channelpointshook.clip2.config.complete', clip2Reward));
            return;
        }

        if (clip3Config === true) {
            clip3ID = rewardID;
            clip3Reward = rewardTitle;
            $.setIniDbString('channelPointsHookSettings', 'clip3ID', clip3ID);
            $.setIniDbString('channelPointsHookSettings', 'clip3Reward', clip3Reward);
            clip3Config = false;
            $.setIniDbBoolean('channelPointsHookSettings', 'clip3Config', clip3Config);
            $.say($.lang.get('channelpointshook.clip3.config.complete', clip3Reward));
            return;
        }

        if (clip4Config === true) {
            clip4ID = rewardID;
            clip4Reward = rewardTitle;
            $.setIniDbString('channelPointsHookSettings', 'clip4ID', clip4ID);
            $.setIniDbString('channelPointsHookSettings', 'clip4Reward', clip4Reward);
            clip4Config = false;
            $.setIniDbBoolean('channelPointsHookSettings', 'clip4Config', clip4Config);
            $.say($.lang.get('channelpointshook.clip4.config.complete', clip4Reward));
            return;
        }

        if (clip5Config === true) {
            clip5ID = rewardID;
            clip5Reward = rewardTitle;
            $.setIniDbString('channelPointsHookSettings', 'clip5ID', clip5ID);
            $.setIniDbString('channelPointsHookSettings', 'clip5Reward', clip5Reward);
            clip5Config = false;
            $.setIniDbBoolean('channelPointsHookSettings', 'clip5Config', clip5Config);
            $.say($.lang.get('channelpointshook.clip5.config.complete', clip5Reward));
            return;
        }

        if (clip6Config === true) {
            clip6ID = rewardID;
            clip6Reward = rewardTitle;
            $.setIniDbString('channelPointsHookSettings', 'clip6ID', clip6ID);
            $.setIniDbString('channelPointsHookSettings', 'clip6Reward', clip6Reward);
            clip6Config = false;
            $.setIniDbBoolean('channelPointsHookSettings', 'clip6Config', clip6Config);
            $.say($.lang.get('channelpointshook.clip6.config.complete', clip6Reward));
            return;
        }

        if (clip7Config === true) {
            clip7ID = rewardID;
            clip7Reward = rewardTitle;
            $.setIniDbString('channelPointsHookSettings', 'clip7ID', clip7ID);
            $.setIniDbString('channelPointsHookSettings', 'clip7Reward', clip7Reward);
            clip7Config = false;
            $.setIniDbBoolean('channelPointsHookSettings', 'clip7Config', clip7Config);
            $.say($.lang.get('channelpointshook.clip7.config.complete', clip7Reward));
            return;
        }

        /*
         * rewardID redemption
         */
        if (rewardID.equals(clip1ID)) {
            if (clip1Toggle === true) {
                $.consoleDebug('clip1RunStart');
                if (!$.audioHookExists(clip1Hook)) {
                    $.say($.lang.get('channelpointshook.audiohook.failed'));
                } else {
                    $.alertspollssocket.triggerAudioPanel(clip1Hook);
                }
                return;
            }
        }

        if (rewardID.equals(clip2ID)) {
            if (clip2Toggle === true) {
                $.consoleDebug('clip2RunStart');
                if (!$.audioHookExists(clip2Hook)) {
                    $.say($.lang.get('channelpointshook.audiohook.failed'));
                } else {
                    //$.alertspollssocket.triggerAudioPanel(clip2Hook);
                    $.alertspollssocket.alertImage('cn_NootNoot.gif');
                }
                return;
            }
        }

        if (rewardID.equals(clip3ID)) {
            if (clip3Toggle === true) {
                $.consoleDebug('clip3RunStart');
                if (!$.audioHookExists(clip3Hook)) {
                    $.say($.lang.get('channelpointshook.audiohook.failed'));
                } else {
                    $.alertspollssocket.triggerAudioPanel(clip3Hook);
                }
                return;
            }
        }

        if (rewardID.equals(clip4ID)) {
            if (clip4Toggle === true) {
                $.consoleDebug('clip4RunStart');
                if (!$.audioHookExists(clip4Hook)) {
                    $.say($.lang.get('channelpointshook.audiohook.failed'));
                } else {
                    $.alertspollssocket.triggerAudioPanel(clip4Hook);
                }
                return;
            }
        }

        if (rewardID.equals(clip5ID)) {
            if (clip5Toggle === true) {
                $.consoleDebug('clip5RunStart');
                if (!$.audioHookExists(clip5Hook)) {
                    $.say($.lang.get('channelpointshook.audiohook.failed'));
                } else {
                    $.alertspollssocket.triggerAudioPanel(clip5Hook);
                }
                return;
            }
        }

        if (rewardID.equals(clip6ID)) {
            if (clip6Toggle === true) {
                $.consoleDebug('clip6RunStart');
                if (!$.audioHookExists(clip6Hook)) {
                    $.say($.lang.get('channelpointshook.audiohook.failed'));
                } else {
                    $.alertspollssocket.triggerAudioPanel(clip6Hook);
                }
                return;
            }
        }

        if (rewardID.equals(clip7ID)) {
            if (clip7Toggle === true) {
                $.consoleDebug('clip7RunStart');
                if (!$.audioHookExists(clip7Hook)) {
                    $.say($.lang.get('channelpointshook.audiohook.failed'));
                } else {
                    $.alertspollssocket.triggerAudioPanel(clip7Hook);
                }
                return;
            }
        }
    });

    /*
     * Add chat commands
     */
    $.bind('initReady', function () {
        $.registerChatCommand('./custom/channelPointHook.js', 'channelpointshook', 1);
    });

    /*
     * Update the API
     */
    $.updateChannelPointsHookConfig = updateChannelPointsHookConfig();

})();