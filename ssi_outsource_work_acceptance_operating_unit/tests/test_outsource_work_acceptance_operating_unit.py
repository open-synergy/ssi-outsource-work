# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestOutsourceWorkAcceptanceOperatingUnit(YamlTransactionCase):
    """Cover the operating unit added to the outsource work acceptance.

    Exercises ``outsource_work_acceptance``: that it stores an
    ``operating_unit_id`` and that the record rule restricts read
    between users of different operating units.
    """

    def test_outsource_work_acceptance_operating_unit(self):
        """Run ``test_data_outsource_work_acceptance_operating_unit.yaml``."""
        self.run_yaml_scenario(
            "test_data_outsource_work_acceptance_operating_unit.yaml"
        )
