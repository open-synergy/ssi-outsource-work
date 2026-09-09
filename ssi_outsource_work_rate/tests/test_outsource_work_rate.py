# Copyright 2024 OpenSynergy Indonesia
# Copyright 2024 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestOutsourceWorkRate(YamlTransactionCase):
    """Cover the ``outsource_work_rate`` workflow and required fields."""

    def test_outsource_work_rate(self):
        """Run the create/confirm/approve/reject/open/done scenarios."""
        self.run_yaml_scenario("test_data_outsource_work_rate.yaml")
