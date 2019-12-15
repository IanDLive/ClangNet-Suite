//
//  Abstract version of the Health/Wellbeing system
//  Modified to go hand in hand with the ClangNet 'fettle' command.
//

// Function that queries all of the data that is required.
$(run = function() {
    // Get fettle settings
    socket.getDBValues('fettle_get_settings', {
        tables: ['modules', 'fettleSettings', 'fettleSettings', 'fettleSettings', 'fettleSettings', 'fettleSettings', 'fettleSettings'],
        keys: ['./custom/fettleSystem.js', 'baseCommand', 'hydrationml', 'hydrationtimer', 'hydrationtoggle', 'hungertimer', 'hungertoggle']
    }, true, function(e) {
        if (!helpers.getModuleStatus('fettleModule', e['./custom/fettleSystem.js'], 'fettleModuleToggle')) {
            return;
        }
        // Set the fettle system settings
        $('#baseCommand').val(e.baseCommand);
        $('#hydrationml').val(e.hydrationml);
        $('#hydrationtimer').val(e.hydrationtimer);
        $('#hydration').val((e.hydrationtoggle === 'true' ? 'Yes' : 'No'));
        $('#hungertimer').val(e.hungertimer);
        $('#hunger').val((e.hungertoggle === 'true' ? 'Yes' : 'No'));
    });
});

// Function that handles the loading of events
$(function() {
    $('#fettleModuleToggle').on('change', function() {
        socket.sendCommandSync('fettle_module_toggle_cmd', 'module ' + ($(this).is('checked') ? 'enablesilent' : 'disablesilent') + './custom/fettleSystem.js', run);
    });
    // Save time settings
    $('#fettle-save-all').on('click', function() {
        let baseCommand = $('#baseCommand'),
            hydrationml = $('#hydrationml'),
            hydrationtimer = $('#hydrationtimer'),
            hydration = $('#hydration').find(':selected').text() === 'Yes',
            hungertimer = $('#hungertimer'),
            hunger = $('#hunger').find(':selected').text() === 'Yes';
        // Make sure that everything has a value
        switch(false) {
            case helpers.handleInputString(baseCommand):
            case helpers.handleInputNumber(hydrationml, 100):
            case helpers.handleInputNumber(hydrationtimer, 30):
            case helpers.handleInputNumber(hungertimer, 30):
                break;
            default:
                // Update the database
                socket.updateDBValues('fettle_update_settings', {
                    tables: ['fettleSettings', 'fettleSettings', 'fettleSettings', 'fettleSettings', 'fettleSettings', 'fettleSettings'],
                    keys: ['baseCommand', 'hydrationml', 'hydrationtimer', 'hydrationtoggle', 'hungertimer', 'hungertoggle'],
                    values: [baseCommand.val(), hydrationml.val(), hydrationtimer.val(), hydration, hungertimer.val(), hunger]
                }, function() {
                    socket.sendCommand('fettle_reload_settings', 'reloadFettle', function() {
                        run();
                        toastr.success('Successfully updated fettle system settings!');
                    });
                });
        }
    });
});