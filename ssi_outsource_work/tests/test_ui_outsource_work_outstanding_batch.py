# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiOutsourceWorkOutstandingBatch(HttpSavepointCase):
    """Tour tests for the ``outsource_work_outstanding_batch`` work
    instructions.
    """

    @classmethod
    def setUpClass(cls):
        """Create the type and per-state batches the tours use.

        Every fixture record is created with an explicit ``user_id`` (the
        admin running the tours): ``cls.env`` runs as SUPERUSER in
        ``setUpClass``, and the internal user record rule would otherwise
        hide these fixtures from the admin's tour session.
        """
        super().setUpClass()
        cls.admin = cls.env.ref("base.user_admin")
        journal = cls.env["account.journal"].search(
            [("type", "in", ["purchase", "general"])], limit=1
        )
        payable_account = cls.env["account.account"].search(
            [("internal_type", "=", "payable")], limit=1
        )
        cls.outstanding_type = cls.env["outsource_work_outstanding_type"].create(
            {
                "name": "TOUR Fixture Outstanding Type",
                "code": "TOURFIXBOT",
                "payable_journal_id": journal.id,
                "payable_account_id": payable_account.id,
            }
        )

        def _create_batch(name):
            """Create a draft batch owned by the admin tour user."""
            return cls.env["outsource_work_outstanding_batch"].create(
                {
                    "name": name,
                    "user_id": cls.admin.id,
                    "type_id": cls.outstanding_type.id,
                    "date": "2026-01-15",
                    "date_due": "2026-01-31",
                    "date_start": "2026-01-01",
                    "date_end": "2026-01-31",
                }
            )

        cls.batch_edit = _create_batch("TOUR-OWB-EDIT")
        cls.batch_delete = _create_batch("TOUR-OWB-DELETE")
        cls.batch_confirm = _create_batch("TOUR-OWB-CONFIRM")
        cls.batch_approve = _create_batch("TOUR-OWB-APPROVE")
        cls.batch_approve.action_confirm()
        cls.batch_reject = _create_batch("TOUR-OWB-REJECT")
        cls.batch_reject.action_confirm()
        cls.batch_cancel = _create_batch("TOUR-OWB-CANCEL")
        if not cls.env["base.cancel_reason"].search(
            [("name", "=", "TOUR Cancel Reason")]
        ):
            cls.env["base.cancel_reason"].create({"name": "TOUR Cancel Reason"})
        cls.batch_restart = _create_batch("TOUR-OWB-RESTART")
        cls.batch_restart.action_cancel()

    def test_create(self):
        """Run the create tour for ``outsource_work_outstanding_batch``.

        IK: docs/outsource_work_outstanding_batch/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_batch_create",
            login="admin",
        )

    def test_edit(self):
        """Run the edit tour for ``outsource_work_outstanding_batch``.

        IK: docs/outsource_work_outstanding_batch/02-edit.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_batch_edit",
            login="admin",
        )

    def test_delete(self):
        """Run the delete tour for ``outsource_work_outstanding_batch``.

        IK: docs/outsource_work_outstanding_batch/03-delete.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_batch_delete",
            login="admin",
        )

    def test_confirm(self):
        """Run the confirm tour for ``outsource_work_outstanding_batch``.

        IK: docs/outsource_work_outstanding_batch/04-confirm.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_batch_confirm",
            login="admin",
        )

    def test_approve(self):
        """Run the approve tour for ``outsource_work_outstanding_batch``.

        IK: docs/outsource_work_outstanding_batch/05-approve.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_batch_approve",
            login="admin",
        )

    def test_reject(self):
        """Run the reject tour for ``outsource_work_outstanding_batch``.

        IK: docs/outsource_work_outstanding_batch/06-reject.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_batch_reject",
            login="admin",
        )

    def test_cancel(self):
        """Run the cancel tour for ``outsource_work_outstanding_batch``.

        IK: docs/outsource_work_outstanding_batch/10-cancel.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_batch_cancel",
            login="admin",
        )

    def test_restart(self):
        """Run the restart tour for ``outsource_work_outstanding_batch``.

        IK: docs/outsource_work_outstanding_batch/12-restart.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_batch_restart",
            login="admin",
        )
