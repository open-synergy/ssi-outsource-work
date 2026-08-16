# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiOutsourceWorkOutstanding(HttpSavepointCase):
    """Tour tests for the ``outsource_work_outstanding`` work instructions."""

    @classmethod
    def setUpClass(cls):
        """Create the partner, type, and per-state outstandings the tours use.

        Every fixture record is created with an explicit ``user_id`` (the
        admin running the tours): ``cls.env`` runs as SUPERUSER in
        ``setUpClass``, and the ``outsource_work_outstanding_internal_user``
        record rule would otherwise hide these fixtures from the admin's
        tour session.
        """
        super().setUpClass()
        cls.admin = cls.env.ref("base.user_admin")
        cls.partner = cls.env["res.partner"].create(
            {"name": "TOUR Fixture Partner", "is_company": False}
        )
        journal = cls.env["account.journal"].search(
            [("type", "in", ["purchase", "general"])], limit=1
        )
        payable_account = cls.env["account.account"].search(
            [("internal_type", "=", "payable")], limit=1
        )
        cls.outstanding_type = cls.env["outsource_work_outstanding_type"].create(
            {
                "name": "TOUR Fixture Outstanding Type",
                "code": "TOURFIXOT",
                "payable_journal_id": journal.id,
                "payable_account_id": payable_account.id,
            }
        )

        def _create_outstanding(name):
            """Create a draft outstanding owned by the admin tour user."""
            return cls.env["outsource_work_outstanding"].create(
                {
                    "name": name,
                    "user_id": cls.admin.id,
                    "partner_id": cls.partner.id,
                    "type_id": cls.outstanding_type.id,
                    "date": "2026-01-15",
                    "date_due": "2026-01-31",
                    "date_start": "2026-01-01",
                    "date_end": "2026-01-31",
                    "currency_id": cls.env.ref("base.IDR").id,
                    "payable_journal_id": journal.id,
                    "payable_account_id": payable_account.id,
                }
            )

        cls.outstanding_edit = _create_outstanding("TOUR-OWO-EDIT")
        cls.outstanding_delete = _create_outstanding("TOUR-OWO-DELETE")
        cls.outstanding_confirm = _create_outstanding("TOUR-OWO-CONFIRM")
        cls.outstanding_approve = _create_outstanding("TOUR-OWO-APPROVE")
        cls.outstanding_approve.action_confirm()
        cls.outstanding_reject = _create_outstanding("TOUR-OWO-REJECT")
        cls.outstanding_reject.action_confirm()
        cls.outstanding_cancel = _create_outstanding("TOUR-OWO-CANCEL")
        cls.env["base.cancel_reason"].create(
            {"name": "TOUR Cancel Reason", "code": "TOUR-CANCEL"}
        )
        cls.outstanding_restart = _create_outstanding("TOUR-OWO-RESTART")
        cls.outstanding_restart.action_cancel()

    def test_create(self):
        """Run the create tour for ``outsource_work_outstanding``.

        IK: docs/outsource_work_outstanding/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_create",
            login="admin",
        )

    def test_edit(self):
        """Run the edit tour for ``outsource_work_outstanding``.

        IK: docs/outsource_work_outstanding/02-edit.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_edit",
            login="admin",
        )

    def test_delete(self):
        """Run the delete tour for ``outsource_work_outstanding``.

        IK: docs/outsource_work_outstanding/03-delete.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_delete",
            login="admin",
        )

    def test_confirm(self):
        """Run the confirm tour for ``outsource_work_outstanding``.

        IK: docs/outsource_work_outstanding/04-confirm.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_confirm",
            login="admin",
        )

    def test_approve(self):
        """Run the approve tour for ``outsource_work_outstanding``.

        IK: docs/outsource_work_outstanding/05-approve.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_approve",
            login="admin",
        )

    def test_reject(self):
        """Run the reject tour for ``outsource_work_outstanding``.

        IK: docs/outsource_work_outstanding/06-reject.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_reject",
            login="admin",
        )

    def test_cancel(self):
        """Run the cancel tour for ``outsource_work_outstanding``.

        IK: docs/outsource_work_outstanding/10-cancel.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_cancel",
            login="admin",
        )

    def test_restart(self):
        """Run the restart tour for ``outsource_work_outstanding``.

        IK: docs/outsource_work_outstanding/12-restart.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_restart",
            login="admin",
        )
