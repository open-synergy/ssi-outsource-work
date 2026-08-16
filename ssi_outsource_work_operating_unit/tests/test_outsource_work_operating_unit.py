# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestOutsourceWorkOperatingUnit(YamlTransactionCase):
    """Cover the operating unit added to the outsource work documents.

    Exercises ``outsource_work``, ``outsource_work_outstanding``, and
    ``outsource_work_outstanding_batch``: that each of them stores an
    ``operating_unit_id``, that a batch hands its operating unit to
    the outstanding it generates, and that the record rule actually
    restricts read and write between users of different operating
    units.
    """

    def test_outsource_work_operating_unit(self):
        """Run ``test_data_outsource_work_operating_unit.yaml``."""
        self.run_yaml_scenario("test_data_outsource_work_operating_unit.yaml")
