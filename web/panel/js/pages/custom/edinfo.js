//
//  Handler script for the Elite: Dangerous information panel within
//  the Custom ClangNet part of the web interface.
//

// Function that queries all of the data that is required.
$(run = function () {
    // Get the settings for EDInfo.
    socket.getDBValues('edinfo_get_settings', {
        tables: ['modules'],
        keys: ['./custom/edinfo.js']
    }, true, function (e) {
            if (!helpers.getModuleStatus('edinfoModule', e['./custom/edinfo.js'], 'edinfo-Module-Toggle')) {
                return;
            }
            // Query ship builds.
            socket.getDBTableValues('get_all_builds', 'edShipBuild', function (results) {
                let builds = [];

                for (let i = 0; i < results.length; i++) {
                    builds.push([
                        (i + 1),
                        results[i].key,
                        results[i].value,
                        $('<div/>', {
                            'class': 'btn-group'
                        }).append($('<button/>', {
                            'type': 'button',
                            'class': 'btn btn-xs btn-danger',
                            'style': 'float: right',
                            'data-command': results[i].key,
                            'html': $('<i/>', {
                                'class': 'fa fa-trash'
                            })
                        })).append($('<button/>', {
                            'type': 'button',
                            'class': 'btn btn-xs btn-warning',
                            'style': 'float: right',
                            'data-command': results[i].key,
                            'html': $('<i/>', {
                                'class': 'fa fa-edit'
                            })
                        })).html()
                    ]);
                }

                // If the table exists, destroy it to start afresh.
                if ($.fn.DataTable.isDataTable('#shipBuildTable')) {
                    $('#shipBuildTable').DataTable().destroy();
                    // Remove all of the old events.
                    $('#shipBuildTable').off();
                }

                // Create the table.
                let table = $('#shipBuildTable').DataTable({
                    'searching': true,
                    'autoWidth': false,
                    'data': builds,
                    'columnDefs': [
                        { 'className': 'default-table', 'orderable': false, 'targets': 3 },
                        { 'width': '12%', 'targets': 0 }
                    ],
                    'columns': [
                        { 'title': 'Entry No.' },
                        { 'title': 'Ship Name' },
                        { 'title': 'Build URL' },
                        { 'title': 'Actions' }
                    ]
                });

                // On Delete button
                table.on('click', '.btn-danger', function () {
                    let shipbuild = $(this).data('command');
                    let row = $(this).parents('tr');

                    // Ask the user if they want to remove the ship build.
                    helpers.getConfirmDeleteModal('shipbuild_modal_remove', 'Are you sure you want to remove the ship build from the database?', true,
                        'The ship build: ' + shipbuild + ' has been successfully removed!', function () {
                            socket.removeDBValues('shipbuild_remove', {
                                tables: ['edShipBuild'],
                                keys: [shipbuild]
                            }, function () {
                                    // Remove the table row.
                                    table.row(row).remove().draw(false);
                            });
                        });
                });

                // On Edit button
                table.on('click', '.btn-warning', function () {
                    let shipbuild = $(this).data('command');
                    let t = $(this);

                    // Get all the info required about the ship build.
                    socket.getDBValues('shipbuild_edit', {
                        tables: ['edShipBuild'],
                        keys: [shipbuild]
                    }, function () {
                            // Get modal dialog box from Phantombot util functions in /utils/helpers.js
                            helpers.getModal('edit-shipbuild', 'Edit Ship Build', 'Save', $('<form/>', {
                                'role': 'form'
                            })
                                // Append an input box to show the name of the edited ship.
                                .append(helpers.getInputGroup('shipbuild-name', 'text', 'Ship Name', '', shipbuild, 'Name of the ship.  This cannot be edited.', true))
                                // Append an input box to allow for the changing of the build URL.
                                .append(helpers.getInputGroup('shipbuild-url', 'text', 'Build URL', 'URL to the ship build', '', 'URL to the ship build')), function () {
                                    let shipbuildName = $('#shipbuild-name');
                                    let shipbuildURL = $('#shipbuild-url');

                                    // Handle each input to make sure that they have a value.
                                    switch (false) {
                                        case helpers.handleInputString(shipbuildName):
                                        case helpers.handleInputString(shipbuildURL):
                                            break;
                                        default:
                                            // Save ship build information here and close the modal.
                                            socket.updateDBValues('shipbuild_edit', {
                                                tables: ['edShipBuild'],
                                                keys: [shipbuildName.val()],
                                                values: [shipbuildURL.val()]
                                            }, function () {
                                                    // Update the build URL.
                                                    t.parents('tr').find('td:eq(2)').text(shipbuildURL.val());
                                                    // Close the modal
                                                    $('#edit-shipbuild').modal('hide');
                                                    // Tell the user the ship build was edited.
                                                    toastr.success('Successfully edited the ship build: ' + shipbuildName.val());
                                            })
                                    }
                                }
                            ).modal('toggle');
                    });
                });
            });
    });
});

$(function () {
    // Allow for the toggle on/off of the module.
    $('#edinfoModuleToggle').on('change', function () {
        socket.sendCommandSync('edinfo_module_toggle_cmd', 'module ' + ($(this).is(':checked') ? 'enablesilent ' : 'disablesilent ') + './custom/edinfo.js', run);
    });

    // Add Ship Build button.
    $('#edshipbuild-add-button').on('click', function () {
        // Get advance modal from PhantomBot util functions in /utils/helpers.js
        helpers.getModal('add-shipbuild', 'Add Ship Build', 'Save', $('<form/>', {
            'role': 'form'
        })
            // Append input box for the ship name.
            .append(helpers.getInputGroup('shipbuild-name', 'text', 'Ship Name', 'The name of your ship', '', 'The name of your ship'))
            // Append input box for the URL of the ship build.
            .append(helpers.getInputGroup('shipbuild-url', 'text', 'Build URL', 'URL to the ship build', '', 'URL to the ship build')),
            function () {
                let shipbuildName = $('#shipbuild-name');
                let shipbuildURL = $('#shipbuild-url');

                // Handle each input to make sure they have a value.
                switch (false) {
                    case helpers.handleInputString(shipbuildName):
                    case helpers.handleInputString(shipbuildURL):
                        break;
                    default:
                        // Make sure that the ship build does not exist in the database already.
                        socket.getDBValue('shipbuild_name_exists', 'edShipBuild', shipbuildName.val(), function (e) {
                            // If the ship build exists stop all this malarkey here.
                            if (e.edShipBuild !== null) {
                                toastr.error('Failed to add the ship build as the entry already exists!');
                                return;
                            }

                            // Save the ship build information here and close the modal.
                            socket.updateDBValues('shipbuild_add', {
                                tables: ['edShipBuild'],
                                keys: [shipbuildName.val()],
                                values: [shipbuildURL.val()]
                            }, function () {
                                // Reload the table.
                                run();
                                // Close the modal.
                                $('#add-shipbuild').modal('hide');
                                // Tell the user the ship build was added.
                                toastr.success('Successfully added the ship build: ' + shipbuildName.val());
                            });
                        });
                }
            }
        ).modal('toggle');
    });

    // Settings button.
    $('#edinfo-settings-button').on('click', function () {
        socket.getDBValues('get_edinfo_settings', {
            tables: ['edInfo'],
            keys: ['allowOffline']
        }, true, function (e) {
            helpers.getModal('edinfo-settings', 'Elite: Dangerous Info Settings', 'Save', $('<form/>', {
                'role': 'form'
            })
                // Append a select option for the toggle.
                .append(helpers.getDropdownGroup('offline-toggle', 'Enable Offline Usage',
                    (e.allowOffline === 'true' ? 'Yes' : 'No'), ['Yes', 'No'])),
                function () { // Callback for when the user clicks save.
                    let offlineToggle = $('#offline-toggle').find(':selected').text() === 'Yes';

                    switch (false) {
                        default:
                            socket.updateDBValues('update_edinfo_settings', {
                                tables: ['edInfo'],
                                keys: ['allowOffline'],
                                values: [offlineToggle]
                            }, function () {
                                socket.sendCommand('update_edinfo_settings_cmd', 'reloadedinfo', function () {
                                    // Close the modal.
                                    $('#edinfo-settings').modal('toggle');
                                    // Alert the user.
                                    toastr.success('Successfully updated offline usage settings!');
                                });
                            });
                    }
                }).modal('toggle');
        });
    });
});