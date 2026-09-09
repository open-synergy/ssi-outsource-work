odoo.define("ssi_outsource_work_rate.outsource_work_rate_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // ── Shared step builders — kept in one place so every tour below stays
    //    a 1:1 mapping of its IK Flow instead of re-deriving selectors.

    function openMenuSteps() {
        return [
            // Flow 1 — Open the Outsource Work > Outsource Work Rates menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            {
                content: "Open the Outsource Work Rates menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work_rate.outsource_work_rate_menu"]',
            },
            {
                // Gerbang: judul action tujuan, bukan sekadar ".o_list_view".
                content: "Outsource Work Rates list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Outsource Work Rates)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },
        ];
    }

    function openRecordSteps(token) {
        return [
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(" + token + ") .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                content: "The record form is displayed",
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },
        ];
    }

    function confirmDialogStep() {
        return {
            content: "Click OK on the confirmation dialog",
            trigger: ".modal-footer button.btn-primary",
            in_modal: true,
        };
    }

    function statusbarButtonStep(content, name) {
        return {
            content: content,
            trigger: ".o_statusbar_buttons button[name='" + name + "']",
            extra_trigger: ".o_form_view",
        };
    }

    function statusStep(content, value) {
        return {
            content: content,
            trigger:
                ".o_statusbar_status .o_arrow_button[data-value='" +
                value +
                "'].btn-primary",
            extra_trigger: "body:not(:has(.modal))",
            run: function () {
                // Assertion only.
            },
        };
    }

    // ── 01-create ───────────────────────────────────────────────────────
    // IK: docs/outsource_work_rate/01-create.md
    tour.register(
        "ssi_outsource_work_rate_01_create",
        {test: true, url: "/web"},
        [].concat(openMenuSteps(), [
            // Flow 2 — Click the New button
            {
                content: "Click New",
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
                content: "Select the Partner",
                trigger: ".o_field_many2one[name='partner_id'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR-OWR-CREATE",
            },
            {
                content: "Pick the Partner from the dropdown",
                trigger: ".ui-autocomplete .ui-menu-item a:contains(TOUR-OWR-CREATE)",
                in_modal: false,
            },
            {
                content: "Fill in the Date field",
                trigger: ".o_field_widget[name='date'] input",
                run: "text 01/15/2024",
            },
            {
                content: "Fill in the Start Date field",
                trigger: ".o_field_widget[name='date_start'] input",
                run: "text 01/15/2024",
            },
            // Flow 4 — Add a Rate row with Product and Price List
            {
                content: "Add a Rate row",
                trigger:
                    ".o_field_x2many[name='detail_ids'] .o_field_x2many_list_row_add a",
                extra_trigger: ".o_form_view.o_form_editable",
            },
            {
                content: "Select the Product",
                trigger: ".o_selected_row .o_field_widget[name='product_id'] input",
                run: "text TOUR-OWR-PRODUCT",
            },
            {
                content: "Pick the Product from the dropdown",
                trigger: ".ui-autocomplete .ui-menu-item a:contains(TOUR-OWR-PRODUCT)",
                in_modal: false,
            },
            {
                content: "Select the Price List",
                trigger: ".o_selected_row .o_field_widget[name='pricelist_id'] input",
                run: "text Public Pricelist",
            },
            {
                content: "Pick the Price List from the dropdown",
                trigger: ".ui-autocomplete .ui-menu-item a:contains(Public Pricelist)",
                in_modal: false,
            },
            // Flow 5 — Click Save
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
            },
            // Post-Condition — A new record is created in Draft status.
            {
                content: "Record is saved in Draft status",
                trigger: ".o_form_view.o_form_readonly",
                run: function () {
                    // Assertion only.
                },
            },
        ])
    );

    // ── 02-edit ─────────────────────────────────────────────────────────
    // IK: docs/outsource_work_rate/02-edit.md
    tour.register(
        "ssi_outsource_work_rate_02_edit",
        {test: true, url: "/web"},
        [].concat(openMenuSteps(), openRecordSteps("TOUR-OWR-EDIT"), [
            // Flow 3 — Change the required fields
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
            {
                content: "Change the Date field",
                trigger: ".o_field_widget[name='date'] input",
                run: "text 01/20/2024",
            },
            // Flow 4 — Add a Rate row
            {
                content: "Add a Rate row",
                trigger:
                    ".o_field_x2many[name='detail_ids'] .o_field_x2many_list_row_add a",
                extra_trigger: ".o_form_view.o_form_editable",
            },
            {
                content: "Select the Product",
                trigger: ".o_selected_row .o_field_widget[name='product_id'] input",
                run: "text TOUR-OWR-PRODUCT",
            },
            {
                content: "Pick the Product from the dropdown",
                trigger: ".ui-autocomplete .ui-menu-item a:contains(TOUR-OWR-PRODUCT)",
                in_modal: false,
            },
            {
                content: "Select the Price List",
                trigger: ".o_selected_row .o_field_widget[name='pricelist_id'] input",
                run: "text Public Pricelist",
            },
            {
                content: "Pick the Price List from the dropdown",
                trigger: ".ui-autocomplete .ui-menu-item a:contains(Public Pricelist)",
                in_modal: false,
            },
            // Flow 5 — Click Save
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
            },
            // Post-Condition — The record is updated with the new values.
            {
                content: "Record is saved",
                trigger: ".o_form_view.o_form_readonly",
                run: function () {
                    // Assertion only.
                },
            },
        ])
    );

    // ── 03-delete ───────────────────────────────────────────────────────
    // IK: docs/outsource_work_rate/03-delete.md
    tour.register(
        "ssi_outsource_work_rate_03_delete",
        {test: true, url: "/web"},
        [].concat(openMenuSteps(), openRecordSteps("TOUR-OWR-DELETE"), [
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
            // 14.0 can land on the next record instead of the list — return
            // to the list explicitly before asserting it.
            {
                content: "Back to the Outsource Work Rates list",
                trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },
            // Post-Condition — The record is permanently removed.
            {
                content: "The deleted record no longer appears in the list",
                trigger:
                    ".o_list_view:not(:has(.o_data_row:contains(TOUR-OWR-DELETE)))",
                run: function () {
                    // Assertion only.
                },
            },
        ])
    );

    // ── 04-confirm ──────────────────────────────────────────────────────
    // IK: docs/outsource_work_rate/04-confirm.md
    tour.register(
        "ssi_outsource_work_rate_04_confirm",
        {test: true, url: "/web"},
        [].concat(openMenuSteps(), openRecordSteps("TOUR-OWR-CONFIRM"), [
            // Flow 3 — Click the Confirm button
            statusbarButtonStep("Click the Confirm button", "action_confirm"),
            // Flow 4 — Click OK on the confirmation dialog
            confirmDialogStep(),
            // Post-Condition — Status changes to Waiting for Approval.
            statusStep("Status is Waiting for Approval", "confirm"),
        ])
    );

    // ── 05-approve ──────────────────────────────────────────────────────
    // IK: docs/outsource_work_rate/05-approve.md
    tour.register(
        "ssi_outsource_work_rate_05_approve",
        {test: true, url: "/web"},
        [].concat(openMenuSteps(), openRecordSteps("TOUR-OWR-APPROVE"), [
            // Flow 3 — Click the Approve button
            statusbarButtonStep("Click the Approve button", "action_approve_approval"),
            // Flow 4 — Click OK on the confirmation dialog
            confirmDialogStep(),
            // Post-Condition — Status changes to Ready to Start.
            statusStep("Status is Ready to Start", "ready"),
        ])
    );

    // ── 06-reject ───────────────────────────────────────────────────────
    // IK: docs/outsource_work_rate/06-reject.md
    tour.register(
        "ssi_outsource_work_rate_06_reject",
        {test: true, url: "/web"},
        [].concat(openMenuSteps(), openRecordSteps("TOUR-OWR-REJECT"), [
            // Flow 3 — Click the Reject button
            statusbarButtonStep("Click the Reject button", "action_reject_approval"),
            // Flow 4 — Click OK on the confirmation dialog
            confirmDialogStep(),
            // Post-Condition — Status changes to Reject.
            statusStep("Status is Reject", "reject"),
        ])
    );

    // ── 07-restart-approval ─────────────────────────────────────────────
    // IK: docs/outsource_work_rate/07-restart-approval.md
    tour.register(
        "ssi_outsource_work_rate_07_restart_approval",
        {test: true, url: "/web"},
        [].concat(openMenuSteps(), openRecordSteps("TOUR-OWR-RESTARTAPPR"), [
            // Flow 3 — Click the Restart Approval Process button
            statusbarButtonStep(
                "Click the Restart Approval Process button",
                "action_reload_approval_template"
            ),
            // Flow 4 — Click OK on the confirmation dialog
            confirmDialogStep(),
            // Post-Condition — the record stays Waiting for Approval,
            // re-matched against the active approval.template.
            statusStep("Status is still Waiting for Approval", "confirm"),
        ])
    );

    // ── 08-open ─────────────────────────────────────────────────────────
    // IK: docs/outsource_work_rate/08-open.md
    tour.register(
        "ssi_outsource_work_rate_08_open",
        {test: true, url: "/web"},
        [].concat(openMenuSteps(), openRecordSteps("TOUR-OWR-OPEN"), [
            // Flow 3 — Click the Start button
            statusbarButtonStep("Click the Start button", "action_open"),
            // Flow 4 — Click OK on the confirmation dialog
            confirmDialogStep(),
            // Post-Condition — Status changes to In Progress.
            statusStep("Status is In Progress", "open"),
        ])
    );

    // ── 09-done ─────────────────────────────────────────────────────────
    // IK: docs/outsource_work_rate/09-done.md
    tour.register(
        "ssi_outsource_work_rate_09_done",
        {test: true, url: "/web"},
        [].concat(openMenuSteps(), openRecordSteps("TOUR-OWR-DONE"), [
            // Flow 3 — Click the Done button
            statusbarButtonStep("Click the Done button", "action_done"),
            // Flow 4 — Click OK on the confirmation dialog
            confirmDialogStep(),
            // Post-Condition — Status changes to Done.
            statusStep("Status is Done", "done"),
        ])
    );

    // ── 10-cancel ───────────────────────────────────────────────────────
    // IK: docs/outsource_work_rate/10-cancel.md
    tour.register(
        "ssi_outsource_work_rate_10_cancel",
        {test: true, url: "/web"},
        [].concat(openMenuSteps(), openRecordSteps("TOUR-OWR-CANCEL"), [
            // Flow 3 — Click the Cancel button
            {
                content: "Click the Cancel button",
                trigger: ".o_statusbar_buttons button:enabled:contains('Cancel')",
                extra_trigger: ".o_form_view",
            },
            // Flow 4 — In the wizard, select the Cancellation Reason
            {
                content: "The cancel reason wizard is displayed",
                // 14.0: no ".modal" prefix — searched inside the modal already.
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },
            {
                content: "Select the Cancellation Reason",
                trigger:
                    ".o_field_widget[name='cancel_reason_id'] .o_radio_item:contains(TOUR Cancel Reason) input",
            },
            // Flow 5 — Click Confirm
            {
                content: "Confirm the wizard",
                trigger: ".modal-footer button[name='action_confirm']",
            },
            // Flow 6 — Click OK on the confirmation dialog
            confirmDialogStep(),
            // Post-Condition — Status changes to Cancelled.
            statusStep("Status is Cancelled", "cancel"),
        ])
    );

    // ── 12-restart ──────────────────────────────────────────────────────
    // IK: docs/outsource_work_rate/12-restart.md
    tour.register(
        "ssi_outsource_work_rate_12_restart",
        {test: true, url: "/web"},
        [].concat(openMenuSteps(), openRecordSteps("TOUR-OWR-RESTART"), [
            // Flow 3 — Click the Restart button
            statusbarButtonStep("Click the Restart button", "action_restart"),
            // Flow 4 — Click OK on the confirmation dialog
            confirmDialogStep(),
            // Post-Condition — Status returns to Draft.
            statusStep("Status is back to Draft", "draft"),
        ])
    );
});
