odoo.define("ssi_outsource_work_acceptance.outsource_work_acceptance_tour", function (
    require
) {
    "use strict";

    var tour = require("web_tour.tour");

    /**
     * Build a step that reveals a navbar section even when it overflows.
     *
     * When the navbar is too narrow, Odoo moves the last sections into the
     * ``o_extra_menu_items`` dropdown, where nested dropdowns are always
     * shown once it is open. The step matches either the section itself
     * (visible in the bar) or the overflow toggle (section hidden).
     *
     * @param {String} content Step description.
     * @param {String} xmlid Section menu xmlid.
     * @param {Boolean} clickSection Click the section when it is in the bar.
     * @returns {Object} The tour step.
     */
    function openMenuSectionStep(content, xmlid, clickSection) {
        var section = '.o_menu_sections [data-menu-xmlid="' + xmlid + '"]';
        var toggle = ".o_menu_sections .o_extra_menu_items > a.dropdown-toggle";
        return {
            content: content,
            trigger: section + ", " + toggle,
            run: function () {
                var $anchor = this.$anchor;
                if ($anchor.is(toggle) || clickSection) {
                    $anchor[0].click();
                }
            },
        };
    }

    // IK: docs/outsource_work_acceptance/01-create.md
    tour.register(
        "ssi_outsource_work_acceptance_outsource_work_acceptance_create",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outsource Work Acceptances menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            openMenuSectionStep(
                "Reveal the Outsource Work Acceptances menu",
                "ssi_outsource_work_acceptance.menu_outsource_work_acceptance",
                false
            ),
            {
                content: "Open the Outsource Work Acceptances menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work_acceptance.menu_outsource_work_acceptance"]',
            },
            {
                content: "Outsource Work Acceptances list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains('Outsource Work Acceptances')",
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
                content: "Select the Analytic Account",
                trigger: ".o_field_many2one[name='analytic_account_id'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR Fixture Analytic",
            },
            {
                content: "Pick the Analytic Account from the dropdown",
                trigger:
                    ".ui-autocomplete .ui-menu-item a:contains(TOUR Fixture Analytic)",
                in_modal: false,
            },
            {
                content: "Fill in Date Acceptance",
                trigger: ".o_field_widget[name='date'] input",
                run: "text 01/15/2026",
            },
            {
                content: "Select the Currency",
                trigger: ".o_field_many2one[name='currency_id'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text USD",
            },
            {
                content: "Pick the Currency from the dropdown",
                trigger: ".ui-autocomplete .ui-menu-item a:contains(USD)",
                in_modal: false,
            },
            {
                content: "Select the Pricelist",
                trigger: ".o_field_many2one[name='pricelist_id'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR Fixture Pricelist",
            },
            {
                content: "Pick the Pricelist from the dropdown",
                trigger:
                    ".ui-autocomplete .ui-menu-item a:contains(TOUR Fixture Pricelist)",
                in_modal: false,
            },

            // Flow 4 — Click Save
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
            },

            // Post-Condition — A new record is created in Draft status
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

    // IK: docs/outsource_work_acceptance/02-edit.md
    tour.register(
        "ssi_outsource_work_acceptance_outsource_work_acceptance_edit",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outsource Work Acceptances menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            openMenuSectionStep(
                "Reveal the Outsource Work Acceptances menu",
                "ssi_outsource_work_acceptance.menu_outsource_work_acceptance",
                false
            ),
            {
                content: "Open the Outsource Work Acceptances menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work_acceptance.menu_outsource_work_acceptance"]',
            },
            {
                content: "Outsource Work Acceptances list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains('Outsource Work Acceptances')",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },
            // Flow 2 — Find and open the record to edit
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-OWA-EDIT) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Click the Edit button
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

            // Flow 4 — Change the Date Acceptance
            {
                content: "Fill in Date Acceptance",
                trigger: ".o_field_widget[name='date'] input",
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

    // IK: docs/outsource_work_acceptance/03-delete.md
    tour.register(
        "ssi_outsource_work_acceptance_outsource_work_acceptance_delete",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outsource Work Acceptances menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            openMenuSectionStep(
                "Reveal the Outsource Work Acceptances menu",
                "ssi_outsource_work_acceptance.menu_outsource_work_acceptance",
                false
            ),
            {
                content: "Open the Outsource Work Acceptances menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work_acceptance.menu_outsource_work_acceptance"]',
            },
            {
                content: "Outsource Work Acceptances list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains('Outsource Work Acceptances')",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },
            // Flow 2 — Open the record
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(03/03/2026) .o_data_cell:first",
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
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — The record is permanently removed
            {
                content: "Delete dialog is closed",
                trigger: "body:not(:has(.modal))",
                run: function () {
                    // Assertion only.
                },
            },
            {
                content:
                    "Click the Outsource Work Acceptances breadcrumb to return to the list",
                trigger:
                    ".breadcrumb-item.o_back_button a:contains('Outsource Work Acceptances')",
            },
            {
                content: "Record no longer appears in the list",
                trigger: ".o_list_view:not(:has(.o_data_row:contains(03/03/2026)))",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );

    // IK: docs/outsource_work_acceptance/04-confirm.md
    tour.register(
        "ssi_outsource_work_acceptance_outsource_work_acceptance_confirm",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outsource Work Acceptances menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            openMenuSectionStep(
                "Reveal the Outsource Work Acceptances menu",
                "ssi_outsource_work_acceptance.menu_outsource_work_acceptance",
                false
            ),
            {
                content: "Open the Outsource Work Acceptances menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work_acceptance.menu_outsource_work_acceptance"]',
            },
            {
                content: "Outsource Work Acceptances list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains('Outsource Work Acceptances')",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },
            // Flow 2 — Open the record
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-OWA-CONFIRM) .o_data_cell:first",
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

            // Post-Condition — Status is Waiting for Approval
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

    // IK: docs/outsource_work_acceptance/05-approve.md
    tour.register(
        "ssi_outsource_work_acceptance_outsource_work_acceptance_approve",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outsource Work Acceptances menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            openMenuSectionStep(
                "Reveal the Outsource Work Acceptances menu",
                "ssi_outsource_work_acceptance.menu_outsource_work_acceptance",
                false
            ),
            {
                content: "Open the Outsource Work Acceptances menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work_acceptance.menu_outsource_work_acceptance"]',
            },
            {
                content: "Outsource Work Acceptances list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains('Outsource Work Acceptances')",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },
            // Flow 2 — Open the record
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-OWA-APPROVE) .o_data_cell:first",
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

            // Post-Condition — Status is Done
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

    // IK: docs/outsource_work_acceptance/06-reject.md
    tour.register(
        "ssi_outsource_work_acceptance_outsource_work_acceptance_reject",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outsource Work Acceptances menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            openMenuSectionStep(
                "Reveal the Outsource Work Acceptances menu",
                "ssi_outsource_work_acceptance.menu_outsource_work_acceptance",
                false
            ),
            {
                content: "Open the Outsource Work Acceptances menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work_acceptance.menu_outsource_work_acceptance"]',
            },
            {
                content: "Outsource Work Acceptances list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains('Outsource Work Acceptances')",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },
            // Flow 2 — Open the record
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-OWA-REJECT) .o_data_cell:first",
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

            // Post-Condition — Status is Rejected
            {
                content: "Status is Rejected",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='reject'].btn-primary",
                extra_trigger: "body:not(:has(.modal))",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );

    // IK: docs/outsource_work_acceptance/10-cancel.md
    tour.register(
        "ssi_outsource_work_acceptance_outsource_work_acceptance_cancel",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outsource Work Acceptances menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            openMenuSectionStep(
                "Reveal the Outsource Work Acceptances menu",
                "ssi_outsource_work_acceptance.menu_outsource_work_acceptance",
                false
            ),
            {
                content: "Open the Outsource Work Acceptances menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work_acceptance.menu_outsource_work_acceptance"]',
            },
            {
                content: "Outsource Work Acceptances list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains('Outsource Work Acceptances')",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },
            // Flow 2 — Open the record
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-OWA-CANCEL) .o_data_cell:first",
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
                // Cancel_reason_id uses widget="radio": select the option by
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

    // IK: docs/outsource_work_acceptance/12-restart.md
    tour.register(
        "ssi_outsource_work_acceptance_outsource_work_acceptance_restart",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outsource Work Acceptances menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            openMenuSectionStep(
                "Reveal the Outsource Work Acceptances menu",
                "ssi_outsource_work_acceptance.menu_outsource_work_acceptance",
                false
            ),
            {
                content: "Open the Outsource Work Acceptances menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work_acceptance.menu_outsource_work_acceptance"]',
            },
            {
                content: "Outsource Work Acceptances list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains('Outsource Work Acceptances')",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },
            // Flow 2 — Open the record
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-OWA-RESTART) .o_data_cell:first",
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

            // Post-Condition — Status is Draft
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

    // IK: docs/outsource_work_acceptance/14-restart-approval.md
    tour.register(
        "ssi_outsource_work_acceptance_outsource_work_acceptance_restart_approval",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Outsource Work Acceptances menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            openMenuSectionStep(
                "Reveal the Outsource Work Acceptances menu",
                "ssi_outsource_work_acceptance.menu_outsource_work_acceptance",
                false
            ),
            {
                content: "Open the Outsource Work Acceptances menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work_acceptance.menu_outsource_work_acceptance"]',
            },
            {
                content: "Outsource Work Acceptances list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains('Outsource Work Acceptances')",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },
            // Flow 2 — Open the record
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-OWA-REAPPROVAL) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },
            // Flow 3 — Click the Restart Approval Process button
            {
                content: "Click the Restart Approval Process button",
                trigger:
                    ".o_statusbar_buttons button[name='action_reload_approval_template']",
                extra_trigger: ".o_form_view",
            },

            // Flow 4 — Click OK on the confirmation dialog
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — Status is Waiting for Approval
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
});
