# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiOutsourceWorkAcceptance(HttpSavepointCase):
    """Tour tests for the ``outsource_work_acceptance`` OU delta."""

    @classmethod
    def setUpClass(cls):
        """Grant admin the groups needed to see the Operating Unit field.

        The menu is already covered by the default membership of
        ``outsource_work_acceptance_validator_group`` (which implies the
        viewer group), but the grant is repeated explicitly here so the
        tour does not depend on that implication chain. The multi
        operating unit group is required for the Operating Unit field
        itself to be rendered on the form.
        """
        super().setUpClass()
        cls.user_admin = cls.env.ref("base.user_admin")
        cls.env.ref(
            "ssi_outsource_work_acceptance.outsource_work_acceptance_viewer_group"
        ).sudo().write({"users": [(4, cls.user_admin.id)]})
        cls.env.ref("operating_unit.group_multi_operating_unit").sudo().write(
            {"users": [(4, cls.user_admin.id)]}
        )

    def test_field_ou(self):
        """Run the delta tour for the acceptance create form.

        IK: docs/outsource_work_acceptance/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_acceptance_operating_unit_"
            "outsource_work_acceptance_field_ou",
            login="admin",
        )
