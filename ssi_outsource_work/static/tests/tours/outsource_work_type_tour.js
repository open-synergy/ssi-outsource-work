odoo.define("ssi_outsource_work.outsource_work_type_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/outsource_work_type/01-create.md
    tour.register(
        "ssi_outsource_work_outsource_work_type_create",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Configuration > Work Types menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            {
                content: "Open the Configuration menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.menu_outsource_work_configuration"]',
            },
            {
                content: "Open the Work Types menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.outsource_work_type_menu"]',
            },
            {
                content: "Work Types list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Work Types)",
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
                content: "Fill in Name",
                trigger: ".o_field_widget[name='name']",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR Work Type",
            },
            {
                content: "Fill in Code",
                trigger: ".o_field_widget[name='code']",
                run: "text TOURWT",
            },
            {
                content: "Select the Category",
                trigger: ".o_field_many2one[name='category_id'] input",
                run: "text TOUR Fixture Category",
            },
            {
                content: "Pick the Category from the dropdown",
                trigger:
                    ".ui-autocomplete .ui-menu-item a:contains(TOUR Fixture Category)",
                in_modal: false,
            },
            {
                content: "Select the Product",
                trigger: ".o_field_many2one[name='product_id'] input",
                run: "text TOUR Fixture Product",
            },
            {
                content: "Pick the Product from the dropdown",
                trigger:
                    ".ui-autocomplete .ui-menu-item a:contains(TOUR Fixture Product)",
                in_modal: false,
            },

            // Flow 4 — Click Save
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
            },

            // Post-Condition — A new active record is created
            {
                content: "Record is saved",
                trigger: ".o_form_view.o_form_readonly",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );

    // IK: docs/outsource_work_type/02-edit.md
    tour.register(
        "ssi_outsource_work_outsource_work_type_edit",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Configuration > Work Types menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            {
                content: "Open the Configuration menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.menu_outsource_work_configuration"]',
            },
            {
                content: "Open the Work Types menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.outsource_work_type_menu"]',
            },
            {
                content: "Work Types list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Work Types)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Find and open the record to edit
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR Edit Work Type) .o_data_cell:first",
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

            // Flow 3 — Change the Name field
            {
                content: "Change the Name",
                trigger: ".o_field_widget[name='name']",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR Edit Work Type Renamed",
            },

            // Flow 4 — Click Save
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
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

    // IK: docs/outsource_work_type/03-delete.md
    tour.register(
        "ssi_outsource_work_outsource_work_type_delete",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Configuration > Work Types menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            {
                content: "Open the Configuration menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.menu_outsource_work_configuration"]',
            },
            {
                content: "Open the Work Types menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.outsource_work_type_menu"]',
            },
            {
                content: "Work Types list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Work Types)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Open the record to delete
            {
                content: "Open the record",
                trigger:
                    ".o_data_row:contains(TOUR Delete Work Type) .o_data_cell:first",
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
                content: "Click the Work Types breadcrumb to return to the list",
                trigger: ".breadcrumb-item.o_back_button a:contains(Work Types)",
            },
            {
                content: "Record no longer appears in the list",
                trigger:
                    ".o_list_view:not(:has(.o_data_row:contains(TOUR Delete Work Type)))",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );

    // IK: docs/outsource_work_type/04-deactivate.md
    tour.register(
        "ssi_outsource_work_outsource_work_type_deactivate",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Configuration > Work Types menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            {
                content: "Open the Configuration menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.menu_outsource_work_configuration"]',
            },
            {
                content: "Open the Work Types menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.outsource_work_type_menu"]',
            },
            {
                content: "Work Types list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Work Types)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Open the record and click Edit
            {
                content: "Open the record",
                trigger:
                    ".o_data_row:contains(TOUR Deactivate Work Type) .o_data_cell:first",
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

            // Flow 3 — Uncheck Active and save
            {
                content: "Uncheck Active",
                trigger: ".o_field_widget[name='active'] input",
                run: "click",
            },
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
            },

            // Post-Condition — The record is archived
            {
                content: "Archived ribbon is displayed",
                trigger: ".o_form_view .ribbon:visible:contains(Archived)",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );

    // IK: docs/outsource_work_type/05-activate.md
    tour.register(
        "ssi_outsource_work_outsource_work_type_activate",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Outsource Work > Configuration > Work Types menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Outsource Work app",
                trigger:
                    '.o_app[data-menu-xmlid="ssi_outsource_work.menu_root_outsource_work"]',
            },
            {
                content: "Open the Configuration menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.menu_outsource_work_configuration"]',
            },
            {
                content: "Open the Work Types menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_outsource_work.outsource_work_type_menu"]',
            },
            {
                content: "Work Types list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Work Types)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Enable the Archived filter
            {
                content: "Open the Filters menu",
                trigger: ".o_filter_menu .o_dropdown_toggler_btn",
                run: function () {
                    this.$anchor[0].click();
                },
            },
            {
                content: "Enable the Archived filter",
                trigger: ".o_filter_menu .o_menu_item a:contains(Archived)",
                run: function () {
                    this.$anchor[0].click();
                },
            },
            {
                content: "Archived filter is active",
                trigger:
                    ".o_filter_menu .o_menu_item a:contains(Archived)[aria-checked='true']",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Select the record and unarchive it
            {
                content: "Select the record",
                trigger:
                    ".o_data_row:contains(TOUR Activate Work Type) .o_list_record_selector input",
                run: "click",
            },
            {
                content: "Open the Action menu",
                trigger: ".o_cp_action_menus button:contains(Action)",
            },
            {
                content: "Click Unarchive",
                trigger: ".o_cp_action_menus .o_menu_item a",
                run: function () {
                    var $unarchive = $(".o_cp_action_menus .o_menu_item a").filter(
                        function () {
                            return $(this).text().trim() === "Unarchive";
                        }
                    );
                    $unarchive[0].click();
                },
            },

            // Post-Condition — The record is restored and appears again in the
            // default list view (it drops out of the Archived-only list).
            {
                content: "Record no longer listed as Archived",
                trigger:
                    ".o_list_view:not(:has(.o_data_row:contains(TOUR Activate Work Type)))",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );
});
