/* Copyright 2026 OpenSynergy Indonesia
 * Copyright 2026 PT. Simetri Sinergi Indonesia
 * License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl). */
odoo.define(
    "ssi_outsource_work_acceptance_operating_unit.outsource_work_acceptance_tour",
    function (require) {
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
        // (E1 delta — Additional Fields)
        tour.register(
            "ssi_outsource_work_acceptance_operating_unit_outsource_work_acceptance_field_ou",
            {
                test: true,
                url: "/web",
            },
            [
                // Base Flow 1 — Open the Outsource Work > Outsource Work
                // Acceptances menu.
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
                    // Gate: wait for the Acceptances action to actually be
                    // mounted, not just any list view left over from the
                    // landing action.
                    content: "Outsource Work Acceptances list is displayed",
                    trigger:
                        ".o_control_panel .breadcrumb-item.active:contains('Outsource Work Acceptances')",
                    extra_trigger: ".o_list_view",
                    run: function () {
                        // Assertion only; do not trigger the default click.
                    },
                },

                // Base Flow 2 — Click the New button. (14.0: "Create")
                {
                    content: "Click Create",
                    trigger: ".o_list_button_add",
                    extra_trigger: ".o_list_view",
                },
                {
                    content: "Form is open in edit mode",
                    trigger: ".o_form_view.o_form_editable",
                    run: function () {
                        // Assertion only; do not trigger the default click.
                    },
                },

                // Additional Fields — the Operating Unit field added by
                // mixin.single_operating_unit is rendered on the create form
                // for a user in the multi operating unit group. Delta-only
                // tour: it stops here, it does not fill any field and does
                // not continue to Save (the Modified — Record Visibility
                // part of the IK is not covered by a tour).
                {
                    content: "Operating Unit field is displayed",
                    trigger: ".o_field_widget[name='operating_unit_id']",
                    run: function () {
                        // Assertion only; do not trigger the default click.
                    },
                },
            ]
        );
    }
);
