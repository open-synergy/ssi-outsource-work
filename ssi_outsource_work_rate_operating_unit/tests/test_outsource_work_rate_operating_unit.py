# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestOutsourceWorkRateOperatingUnit(YamlTransactionCase):
    """Cover the operating unit added to the outsource work rate document.

    Exercises ``outsource_work_rate``: that it stores an
    ``operating_unit_id``, and that the record rule actually
    restricts read and write between users of different operating
    units.
    """

    def test_outsource_work_rate_operating_unit(self):
        """Run ``test_data_outsource_work_rate_operating_unit.yaml``."""
        self.run_yaml_scenario("test_data_outsource_work_rate_operating_unit.yaml")
