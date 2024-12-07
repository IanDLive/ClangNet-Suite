/**
 * system-fettleSystem.js
 * 
 * Language file for fettleSystem.js
 * 
 */

/**
 * Main Fettle Strings
 */
$.lang.register('fettlesystem.fettle.usage', 'Usage: !$1 [ hydration | hunger | toggle ]');
$.lang.register('fettlesystem.fettle.offline', '!$1 $2 can only be used when $3 is live on Twitch!');
$.lang.register('fettlesystem.set.basecommand.failed', 'Unable to change the base command to: $1');

/**
 * Settings Fettle Strings
 */
// Usage Strings
$.lang.register('fettlesystem.settings.usage', 'Usage: !$1 [ set | check ]');
$.lang.register('fettlesystem.settings.usage.set', 'Usage: !$1 set [ hydration | hunger ]');
$.lang.register('fettlesystem.settings.usage.set.hydration', 'Usage: !$1 set hydration [ ml | timer ] <Integer>');
$.lang.register('fettlesystem.settings.usage.set.hunger', 'Usage: !$1 set hunger [ timer ] <Integer>');
// Check Strings
$.lang.register('fettlesystem.settings.check.usage', 'Usage: !$1 check [ hydration | hunger ]');
$.lang.register('fettlesystem.settings.check.hydration', '$1 settings set to: HydrationML: $2 HydrationTimer: $3 HydrationToggle: $4');
$.lang.register('fettlesystem.settings.check.hunger', '$1 settings set to: HungerTimer: $2 HungerToggle: $3');

/**
 * Hydration  strings
 */
$.lang.register('fettlesystem.hydration.reminder', 'You\'ve been live for just over $1. By this point in your broadcast you should have had at least $2ml ($3oz) of fluids! iandliDrinkMango');
$.lang.register('fettlesystem.hydration.command', '$1 has been live for just over $2. By this point he should have consumed at least $3ml ($4oz) fluids! iandliDrinkMango iandliTimmy');

/**
 * Hunger  strings
 */
$.lang.register('fettlesystem.hunger.reminder', 'You\'ve been live for just over $1, which is long enough!!  Take a break and get some food. copyThis pastaThat');
$.lang.register('fettlesystem.hunger.command', '$1 has been live for just over $2, and should take a break for food in $3 minutes. copyThis pastaThat');

/**
 * Fettle Toggle Strings
 */
$.lang.register('fettlesystem.toggle.usage', 'Usage: !$1 toggle [ hydrationtoggle | hungertoggle ].');
$.lang.register('fettlesystem.toggle.setting.pass', '$1 has been set to $2.');
$.lang.register('fettlesystem.toggle.setting.fail', '$1 toggle not found.');

/**
 * health set strings
 */
$.lang.register('fettlesystem.settings.set.hydration','$2 settings have been changed to Hydration $3: $4');
$.lang.register('fettlesystem.settings.set.hunger','$2 settings have been changed to Hunger $3: $4');
