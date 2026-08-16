# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestOutsourceWorkCreatePage(YamlTransactionCase):
    """Scenario tests for ``mixin.outsource_work_object`` gate attribute.

    Covers both the model that leaves ``_outsource_work_create_page`` at
    the mixin's own default and the model that explicitly enables it.
    """

    def test_outsource_work_create_page(self):
        """Run the ``fields_view_get`` no-error scenario for both models."""
        self.run_yaml_scenario("test_data_outsource_work_create_page.yaml")

    def test_arch_has_outsource_work_tab_only_when_enabled(self):
        """Assert the Outsource Work tab is inserted only when enabled.

        Pure Python — trigger P1 (L-01: ``action: call`` discards the
        ``fields_view_get`` return value, so the ``arch`` string it
        builds cannot be asserted from YAML at all).
        """
        default_record = self.env["test_outsource_work_object_default"].create(
            {"name": "Test Default"}
        )
        enabled_record = self.env["test_outsource_work_object_enabled"].create(
            {"name": "Test Enabled"}
        )

        default_res = default_record.fields_view_get(view_type="form")
        enabled_res = enabled_record.fields_view_get(view_type="form")

        self.assertNotIn('name="outsource_work"', default_res["arch"])
        self.assertIn('name="outsource_work"', enabled_res["arch"])
