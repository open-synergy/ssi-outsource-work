# Copyright 2024 OpenSynergy Indonesia
# Copyright 2024 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestOutsourceWork(YamlTransactionCase):
    """
    Covers ``outsource_work`` master data and the outstanding workflow.

    Runs the YAML scenarios in ``test_data_outsource_work.yaml``:
    creating the type/category/outstanding-type master data, then
    confirming an ``outsource_work_outstanding`` from draft.
    """

    def test_outsource_work(self):
        """Run the outsource work master data and workflow scenarios."""
        self.run_yaml_scenario("test_data_outsource_work.yaml")
