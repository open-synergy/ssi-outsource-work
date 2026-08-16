# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiOutsourceWorkOutstandingType(HttpSavepointCase):
    """Tour tests for the ``outsource_work_outstanding_type`` work instructions."""

    @classmethod
    def setUpClass(cls):
        """Create the journal, payable account, and types the tours rely on."""
        super().setUpClass()
        cls.journal = cls.env["account.journal"].create(
            {
                "name": "TOUR Fixture Journal",
                "code": "TFJ01",
                "type": "general",
            }
        )
        cls.payable_account = cls.env["account.account"].create(
            {
                "name": "TOUR Fixture Payable Account",
                "code": "TOURPAY",
                "user_type_id": cls.env.ref("account.data_account_type_payable").id,
                "reconcile": True,
            }
        )
        Type = cls.env["outsource_work_outstanding_type"]
        cls.type_edit = Type.create(
            {
                "name": "TOUR Edit Outstanding Type",
                "code": "TOUREDOT",
                "payable_journal_id": cls.journal.id,
                "payable_account_id": cls.payable_account.id,
            }
        )
        cls.type_delete = Type.create(
            {
                "name": "TOUR Delete Outstanding Type",
                "code": "TOURDELOT",
                "payable_journal_id": cls.journal.id,
                "payable_account_id": cls.payable_account.id,
            }
        )
        cls.type_deactivate = Type.create(
            {
                "name": "TOUR Deactivate Outstanding Type",
                "code": "TOURDEAOT",
                "payable_journal_id": cls.journal.id,
                "payable_account_id": cls.payable_account.id,
            }
        )
        cls.type_activate = Type.create(
            {
                "name": "TOUR Activate Outstanding Type",
                "code": "TOURACTOT",
                "payable_journal_id": cls.journal.id,
                "payable_account_id": cls.payable_account.id,
                "active": False,
            }
        )

    def test_create(self):
        """Run the create tour for ``outsource_work_outstanding_type``.

        IK: docs/outsource_work_outstanding_type/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_type_create",
            login="admin",
        )

    def test_edit(self):
        """Run the edit tour for ``outsource_work_outstanding_type``.

        IK: docs/outsource_work_outstanding_type/02-edit.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_type_edit",
            login="admin",
        )

    def test_delete(self):
        """Run the delete tour for ``outsource_work_outstanding_type``.

        IK: docs/outsource_work_outstanding_type/03-delete.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_type_delete",
            login="admin",
        )

    def test_deactivate(self):
        """Run the deactivate tour for ``outsource_work_outstanding_type``.

        IK: docs/outsource_work_outstanding_type/04-deactivate.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_type_deactivate",
            login="admin",
        )

    def test_activate(self):
        """Run the activate tour for ``outsource_work_outstanding_type``.

        IK: docs/outsource_work_outstanding_type/05-activate.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_outstanding_type_activate",
            login="admin",
        )
