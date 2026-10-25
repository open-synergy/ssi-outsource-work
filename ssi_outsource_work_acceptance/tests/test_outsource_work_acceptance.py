# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestOutsourceWorkAcceptance(YamlTransactionCase):
    """Scenario tests for the ``outsource_work_acceptance`` document."""

    def test_outsource_work_acceptance(self):
        """Run the acceptance totals, workflow cascade and analytic scenarios."""
        self.run_yaml_scenario("test_data_outsource_work_acceptance.yaml")
