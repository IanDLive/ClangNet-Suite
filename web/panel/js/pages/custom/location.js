//
//  Handler script for the Stream Location information panel within
//  the Custom ClangNet part of the web interface.
//

// Function that queries all of the data that is required.
$(run = function () {
    // Get the setting for Location
    socket.getDBValues('location_get_settings', {
        tables: ['modules'],
        keys: ['./custom/locationSystem.js']
    }, true, function (e) {
        if (!helpers.getModuleStatus('locationModule', e['./custom/locationSystem.js'], 'location-Module-Toggle')) {
            return;
        }
        // Query stream location
        socket.getDBTableValues('get_table_location', 'locationSystem', function (results) {
            let locations = [];

            for (let i = 0; i < results.length; i++) {
                locations.push([
                    results[i].value
                ]);
            }

            // If the table exists, destroy it to start afresh.
            if ($.fn.DataTable.isDataTable('#locationTable')) {
                $('#locationTable').DataTable().destroy();
                // Remove all of the old events.
                $('#locationTable').off();
            }

            // Create the table
            let table = $('#locationTable').DataTable({
                'searching': false,
                'autoWidth': false,
                'data': locations,
                'columns': [
                    { 'title': 'Location' },
                ]
            });

        });
    })
});

$(function () {
    // Allow for the toggle on/off of the module.
    $('#locationModuleToggle').on('change', function () {
        socket.sendCommandSync('location_module_toggle_cmd', 'module ' + ($(this).is(':checked') ? 'enablesilent ' : 'disablesilent ') + './custom/locationSystem.js', run);
    });

    // Add Set Location button
    $('#location-set-button').on('click', function () {
        // Get advance modal from PhantomBot util functions in /utils/helpers.js
        helpers.getModal('set-location', 'Set Stream Location', 'Save', $('<form/>', {
            'role': 'form'
        })
            // Append input box for new location.
            .append(helpers.getInputGroup('new-location', 'text', 'Location', 'Current location', '', 'Current location')),
            function () {
                let curLocation = $('#new-location');

                // Handle each input to make sure they have a value.
                switch (false) {
                    case helpers.handleInputString(curLocation):
                        break;
                    default:
                        // Save the ship build information here and close the modal.
                        socket.updateDBValues('update_location', {
                            tables: ['locationSystem'],
                            keys: ['location'],
                            values: [curLocation.val()]
                        }, function () {
                            socket.sendCommandSync('location_reload_settings', 'reloadLocation', function () {
                                // Reload the table.
                                run();
                                // Close the modal.
                                $('#set-location').modal('hide');
                                // Tell the user the ship build was added.
                                toastr.success('Successfully updated the location to: ' + curLocation.val());
                            });
                        });
                }
            }).modal('toggle');
    });

    // Add Clear Location button
    $('#location-clear-button').on('click', function () {
        // Ask the user if they are sure that they want to clear the location.
        helpers.getConfirmDeleteModal('clear-location', 'Are you sure you want to reset the location back to home?', true,
            'The location has successfully been reset', function () {
                // Save the location data here and close the modal.
                socket.updateDBValues('update_location', {
                    tables: ['locationSystem'],
                    keys: ['location'],
                    values: ['Home']
                }, function () {
                    socket.sendCommandSync('location_reload_settings', 'reloadLocation', function () {
                        // Reload the table.
                        run();
                        // Close the modal.
                        $('#clear-location').modal('hide');
                        // Tell the user the ship build was added.
                        toastr.success('Successfully updated the location back to Home');
                    });
                });

            });
    });

});