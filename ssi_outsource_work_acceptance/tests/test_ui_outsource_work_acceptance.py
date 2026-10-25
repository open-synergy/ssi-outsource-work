# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiOutsourceWorkAcceptance(HttpSavepointCase):
    """Tour tests for the ``outsource_work_acceptance`` work instructions."""

    @classmethod
    def setUpClass(cls):
        """Create the analytic account, pricelist and per-state fixtures.

        Every acceptance is created with an explicit ``user_id`` (the
        admin running the tours): ``cls.env`` runs as SUPERUSER in
        ``setUpClass``, and the ``outsource_work_acceptance_internal_user``
        record rule would otherwise hide the fixtures from the admin's
        tour session. Transitions are driven through the action methods
        as the admin, with a cache flush between them.
        """
        super().setUpClass()
        cls.admin = cls.env.ref("base.user_admin")
        cls.usd = cls.env.ref("base.USD")
        cls.analytic = cls.env["account.analytic.account"].create(
            {"name": "TOUR Fixture Analytic"}
        )
        cls.pricelist = cls.env["product.pricelist"].create(
            {"name": "TOUR Fixture Pricelist", "currency_id": cls.usd.id}
        )
        cls.cancel_reason = cls.env["base.cancel_reason"].create(
            {
                "name": "TOUR Cancel Reason",
                "code": "TOUR-CANCEL-OWA",
                "global_use": True,
            }
        )

        cls.acc_edit = cls._create_acceptance("TOUR-OWA-EDIT")
        # name is left at its default "/": mixin.transaction's unlink()
        # only allows deleting a record whose document number is still "/".
        # The row is found in the tour by its distinctive Date instead.
        cls.acc_delete = cls._create_acceptance("/", date="2026-03-03")
        cls.acc_confirm = cls._create_acceptance("TOUR-OWA-CONFIRM")
        cls.acc_approve = cls._create_acceptance("TOUR-OWA-APPROVE")
        cls.acc_approve.with_user(cls.admin).action_confirm()
        cls.acc_approve.invalidate_cache()
        cls.acc_reject = cls._create_acceptance("TOUR-OWA-REJECT")
        cls.acc_reject.with_user(cls.admin).action_confirm()
        cls.acc_reject.invalidate_cache()
        cls.acc_cancel = cls._create_acceptance("TOUR-OWA-CANCEL")
        cls.acc_restart = cls._create_acceptance("TOUR-OWA-RESTART")
        cls.acc_restart.with_user(cls.admin).action_cancel(cls.cancel_reason)
        cls.acc_restart.invalidate_cache()

        # IK Pre-Condition of 14-restart-approval: Status is Waiting for
        # Approval with NO approval template assigned. A normal Confirm
        # always assigns one, so the fixture clears it back out afterwards
        # (see docs/outsource_work_acceptance/14-restart-approval.md).
        cls.acc_reapproval = cls._create_acceptance("TOUR-OWA-REAPPROVAL")
        cls.acc_reapproval.with_user(cls.admin).action_confirm()
        cls.acc_reapproval.invalidate_cache()
        cls.acc_reapproval.write({"approval_template_id": False})
        cls.acc_reapproval.invalidate_cache()

    @classmethod
    def _create_acceptance(cls, name, **overrides):
        """Create one draft ``outsource_work_acceptance`` fixture.

        :param name: document number given to the record
        :param overrides: extra values overriding the defaults
        :return: the created ``outsource_work_acceptance`` record
        """
        vals = {
            "name": name,
            "user_id": cls.admin.id,
            "analytic_account_id": cls.analytic.id,
            "date": "2026-01-15",
            "currency_id": cls.usd.id,
            "pricelist_id": cls.pricelist.id,
        }
        vals.update(overrides)
        return cls.env["outsource_work_acceptance"].create(vals)

    def test_create(self):
        """Run the create tour for ``outsource_work_acceptance``.

        IK: docs/outsource_work_acceptance/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_acceptance_outsource_work_acceptance_create",
            login="admin",
        )

    def test_edit(self):
        """Run the edit tour for ``outsource_work_acceptance``.

        IK: docs/outsource_work_acceptance/02-edit.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_acceptance_outsource_work_acceptance_edit",
            login="admin",
        )

    def test_delete(self):
        """Run the delete tour for ``outsource_work_acceptance``.

        IK: docs/outsource_work_acceptance/03-delete.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_acceptance_outsource_work_acceptance_delete",
            login="admin",
        )

    def test_confirm(self):
        """Run the confirm tour for ``outsource_work_acceptance``.

        IK: docs/outsource_work_acceptance/04-confirm.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_acceptance_outsource_work_acceptance_confirm",
            login="admin",
        )

    def test_approve(self):
        """Run the approve tour for ``outsource_work_acceptance``.

        IK: docs/outsource_work_acceptance/05-approve.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_acceptance_outsource_work_acceptance_approve",
            login="admin",
        )

    def test_reject(self):
        """Run the reject tour for ``outsource_work_acceptance``.

        IK: docs/outsource_work_acceptance/06-reject.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_acceptance_outsource_work_acceptance_reject",
            login="admin",
        )

    def test_cancel(self):
        """Run the cancel tour for ``outsource_work_acceptance``.

        IK: docs/outsource_work_acceptance/10-cancel.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_acceptance_outsource_work_acceptance_cancel",
            login="admin",
        )

    def test_restart(self):
        """Run the restart tour for ``outsource_work_acceptance``.

        IK: docs/outsource_work_acceptance/12-restart.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_acceptance_outsource_work_acceptance_restart",
            login="admin",
        )

    def test_restart_approval(self):
        """Run the restart approval tour for ``outsource_work_acceptance``.

        IK: docs/outsource_work_acceptance/14-restart-approval.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_acceptance_outsource_work_acceptance_restart_approval",
            login="admin",
        )
