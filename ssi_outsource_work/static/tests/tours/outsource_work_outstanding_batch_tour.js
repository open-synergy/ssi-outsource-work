odoo.define("ssi_outsource_work.outsource_work_outstanding_batch_tour", function (
    require
) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/outsource_work_outstanding_batch/01-create.md
    tour.register(
        "ssi_outsource_work_outsource_work_outstanding_batch_create",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outstanding Batches menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            {
                content: "Open the Outstanding Batches menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.menu_outsource_work_outstanding_batch"]',
            },
            {
                content: "Outstanding Batches list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Outstanding Batches)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Click the New button
            {
                content: "Click Create",
                trigger: ".o_list_button_add",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Form is open in edit mode",
                trigger: ".o_form_view.o_form_editable",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Fill in the required fields
            {
                content: "Select the Type",
                trigger: ".o_field_many2one[name='type_id'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR Fixture Outstanding Type",
            },
            {
                content: "Pick the Type from the dropdown",
                trigger:
                    ".ui-autocomplete .ui-menu-item a:contains(TOUR Fixture Outstanding Type)",
                in_modal: false,
            },
            {
                content: "Fill in Date",
                trigger: ".o_field_widget[name='date'] input",
                run: "text 01/15/2026",
            },
            {
                content: "Fill in Date Due",
                trigger: ".o_field_widget[name='date_due'] input",
                run: "text 01/31/2026",
            },
            {
                content: "Fill in Date Start",
                trigger: ".o_field_widget[name='date_start'] input",
                run: "text 01/01/2026",
            },
            {
                content: "Fill in Date End",
                trigger: ".o_field_widget[name='date_end'] input",
                run: "text 01/31/2026",
            },

            // Flow 4 — Click Populate / Clear on the Outstandings tab
            {
                content: "Click Populate",
                trigger: ".o_form_view button[name='action_populate']",
            },
            {
                content: "Populate finished",
                trigger: ".o_form_view button[name='action_populate']:enabled",
                run: function () {
                    // Assertion only: Odoo disables the button synchronously
                    // while the RPC cycle of a type="object" button runs.
                },
            },
            {
                content: "Click Clear",
                trigger: ".o_form_view button[name='action_clear']",
            },
            {
                content: "Clear finished",
                trigger: ".o_form_view button[name='action_clear']:enabled",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 5 — Click Save
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
            },

            // Post-Condition — A new record is created in Draft status
            {
                content: "Status is Draft",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='draft'].btn-primary",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );

    // IK: docs/outsource_work_outstanding_batch/02-edit.md
    tour.register(
        "ssi_outsource_work_outsource_work_outstanding_batch_edit",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outstanding Batches menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            {
                content: "Open the Outstanding Batches menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.menu_outsource_work_outstanding_batch"]',
            },
            {
                content: "Outstanding Batches list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Outstanding Batches)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Find and open the record to edit
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-OWB-EDIT) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Click the Edit button",
                trigger: ".o_form_button_edit",
            },
            {
                content: "Form is now editable",
                trigger: ".o_form_view.o_form_editable",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Click Populate / Clear on the Outstandings tab
            //
            // Each button's own :enabled gate is sufficient: Odoo disables
            // a type="object" button synchronously when clicked and only
            // re-enables it in form_renderer.js after its whole save + RPC
            // + reload cycle — including the re-render of any x2many widget
            // the method touches (detail_ids) — has completed. See
            // odoo-development-ui-test skill, patterns.md §M.
            {
                content: "Click Populate",
                trigger: ".o_form_view button[name='action_populate']",
            },
            {
                content: "Populate finished",
                trigger: ".o_form_view button[name='action_populate']:enabled",
                run: function () {
                    // Assertion only: Odoo disables the button synchronously
                    // while the RPC cycle of a type="object" button runs.
                },
            },
            {
                content: "Click Clear",
                trigger: ".o_form_view button[name='action_clear']",
            },
            {
                content: "Clear finished",
                trigger: ".o_form_view button[name='action_clear']:enabled",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 4 — Change the required fields
            // The inline actions above are type="object" buttons that
            // auto-save and silently reload the record in place (their
            // Python side returns no action). That reload leaves stale
            // slots in the form renderer's field widget list (x2many
            // widgets like detail_ids get destroyed and rebuilt), and
            // touching Date Due + Save directly afterwards raced with
            // that cleanup: commitChanges() on the reload's leftover
            // widget threw and the form got stuck in edit mode. Force a
            // fully fresh widget tree instead — navigate back to the list
            // and reopen the same record — before touching any field.
            {
                content: "Back to the Outstanding Batches list",
                trigger:
                    ".breadcrumb-item.o_back_button a:contains(Outstanding Batches)",
            },
            {
                content: "Outstanding Batches list is displayed again",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Outstanding Batches)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },
            {
                content: "Reopen the record",
                trigger: ".o_data_row:contains(TOUR-OWB-EDIT) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Click the Edit button again",
                trigger: ".o_form_button_edit",
            },
            {
                content: "Form is editable on the fresh widget tree",
                trigger: ".o_form_view.o_form_editable",
                run: function () {
                    // Assertion only.
                },
            },
            {
                content: "Fill in Date Due",
                trigger: ".o_field_widget[name='date_due'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text 02/28/2026",
            },

            // Flow 5 — Click Save
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
                extra_trigger: "body:not(:has(.modal))",
            },

            // Post-Condition — The record is updated with the new values
            {
                content: "Record is saved",
                trigger: ".o_form_view.o_form_readonly",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );

    // IK: docs/outsource_work_outstanding_batch/03-delete.md
    tour.register(
        "ssi_outsource_work_outsource_work_outstanding_batch_delete",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outstanding Batches menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            {
                content: "Open the Outstanding Batches menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.menu_outsource_work_outstanding_batch"]',
            },
            {
                content: "Outstanding Batches list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Outstanding Batches)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Open the record to delete
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(04/04/2026) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Click Action > Delete
            {
                content: "Open the Action menu",
                trigger: ".o_cp_action_menus button:contains(Action)",
            },
            {
                content: "Click Delete",
                trigger: ".o_cp_action_menus .o_menu_item a",
                run: function () {
                    var $delete = $(".o_cp_action_menus .o_menu_item a").filter(
                        function () {
                            return $(this).text().trim() === "Delete";
                        }
                    );
                    $delete[0].click();
                },
            },

            // Flow 4 — Click OK to confirm
            {
                content: "Confirm deletion",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — The record is permanently removed
            {
                // Wait for the delete dialog to fully close and the form to
                // finish re-rendering (it may navigate to the next record in
                // the list instead of returning to the list) before touching
                // the breadcrumb — see patterns.md §K.
                content: "Delete dialog is closed",
                trigger: "body:not(:has(.modal))",
                run: function () {
                    // Assertion only.
                },
            },
            {
                content:
                    "Click the Outstanding Batches breadcrumb to return to the list",
                trigger:
                    ".breadcrumb-item.o_back_button a:contains(Outstanding Batches)",
            },
            {
                content: "Record no longer appears in the list",
                trigger: ".o_list_view:not(:has(.o_data_row:contains(04/04/2026)))",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );

    // IK: docs/outsource_work_outstanding_batch/04-confirm.md
    tour.register(
        "ssi_outsource_work_outsource_work_outstanding_batch_confirm",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outstanding Batches menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            {
                content: "Open the Outstanding Batches menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.menu_outsource_work_outstanding_batch"]',
            },
            {
                content: "Outstanding Batches list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Outstanding Batches)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Open the record to confirm
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-OWB-CONFIRM) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Click the Confirm button
            {
                content: "Click the Confirm button",
                trigger: ".o_statusbar_buttons button[name='action_confirm']",
                extra_trigger: ".o_form_view",
            },

            // Flow 4 — Click OK on the confirmation dialog
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — Status changes to Waiting for Approval
            {
                content: "Status is Waiting for Approval",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='confirm'].btn-primary",
                extra_trigger: "body:not(:has(.modal))",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );

    // IK: docs/outsource_work_outstanding_batch/05-approve.md
    tour.register(
        "ssi_outsource_work_outsource_work_outstanding_batch_approve",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outstanding Batches menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            {
                content: "Open the Outstanding Batches menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.menu_outsource_work_outstanding_batch"]',
            },
            {
                content: "Outstanding Batches list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Outstanding Batches)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Open the record to approve
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-OWB-APPROVE) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Click the Approve button
            {
                content: "Click the Approve button",
                trigger: ".o_statusbar_buttons button[name='action_approve_approval']",
                extra_trigger: ".o_form_view",
            },

            // Flow 4 — Click OK on the confirmation dialog
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — Fully approved: status automatically changes to
            // Done
            {
                content: "Status is Done",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='done'].btn-primary",
                extra_trigger: "body:not(:has(.modal))",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );

    // IK: docs/outsource_work_outstanding_batch/06-reject.md
    tour.register(
        "ssi_outsource_work_outsource_work_outstanding_batch_reject",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outstanding Batches menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            {
                content: "Open the Outstanding Batches menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.menu_outsource_work_outstanding_batch"]',
            },
            {
                content: "Outstanding Batches list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Outstanding Batches)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Open the record to reject
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-OWB-REJECT) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Click the Reject button
            {
                content: "Click the Reject button",
                trigger: ".o_statusbar_buttons button[name='action_reject_approval']",
                extra_trigger: ".o_form_view",
            },

            // Flow 4 — Click OK on the confirmation dialog
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — Status changes to Rejected
            // "reject" is not part of `_statusbar_visible_label`, so it only
            // renders once it becomes the record's actual current value.
            // Wait for the old "confirm" marker to be gone first — a data-
            // independent signal that the statusbar has actually re-rendered
            // from the reject RPC, not just that the dialog closed.
            {
                content: "Waiting for Approval marker is gone",
                trigger:
                    ".o_statusbar_status:not(:has(.o_arrow_button[data-value='confirm'].btn-primary))",
                extra_trigger: "body:not(:has(.modal))",
                run: function () {
                    // Assertion only.
                },
            },
            {
                content: "Status is Rejected",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='reject'].btn-primary",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );

    // IK: docs/outsource_work_outstanding_batch/10-cancel.md
    tour.register(
        "ssi_outsource_work_outsource_work_outstanding_batch_cancel",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outstanding Batches menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            {
                content: "Open the Outstanding Batches menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.menu_outsource_work_outstanding_batch"]',
            },
            {
                content: "Outstanding Batches list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Outstanding Batches)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Open the record to cancel
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-OWB-CANCEL) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Click the Cancel button
            // Cancel is a type="action" button — its `name` is a numeric
            // action id resolved at render time, so target it by label.
            {
                content: "Click the Cancel button",
                trigger: ".o_statusbar_buttons button:enabled:contains('Cancel')",
                extra_trigger: ".o_form_view",
            },

            // Flow 4 — Select the Cancellation Reason
            {
                content: "Wizard is open",
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },
            {
                // Cancel_reason_id uses widget="radio" (FieldRadio), not a
                // plain many2one input+autocomplete — select the option by
                // clicking its <label>.
                content: "Select the cancellation reason",
                trigger: "[name='cancel_reason_id'] label:contains(TOUR Cancel Reason)",
                run: "click",
            },

            // Flow 5 — Click Confirm
            {
                content: "Confirm the wizard",
                trigger: ".modal-footer button[name='action_confirm']",
            },

            // Flow 6 — Click OK on the confirmation dialog
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — Status changes to Cancelled
            {
                content: "Status is Cancelled",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='cancel'].btn-primary",
                extra_trigger: "body:not(:has(.modal))",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );

    // IK: docs/outsource_work_outstanding_batch/12-restart.md
    tour.register(
        "ssi_outsource_work_outsource_work_outstanding_batch_restart",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outstanding Batches menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            {
                content: "Open the Outstanding Batches menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.menu_outsource_work_outstanding_batch"]',
            },
            {
                content: "Outstanding Batches list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Outstanding Batches)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Open the record to restart
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-OWB-RESTART) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Click the Restart button
            {
                content: "Click the Restart button",
                trigger: ".o_statusbar_buttons button[name='action_restart']",
                extra_trigger: ".o_form_view",
            },

            // Flow 4 — Click OK on the confirmation dialog
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — Status returns to Draft
            {
                content: "Status is Draft",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='draft'].btn-primary",
                extra_trigger: "body:not(:has(.modal))",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );
});
