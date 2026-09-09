# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

# HttpSavepointCase — BUKAN HttpCase. 14.0's plain HttpCase does not set up
# cls.env in setUpClass, so every fixture below would fail before the
# browser even starts.
from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiOutsourceWorkRate(HttpSavepointCase):
    """Tour tests for the ``outsource_work_rate`` work instructions."""

    @classmethod
    def setUpClass(cls):
        """Create the partners, product, price list and rate fixtures.

        One dedicated partner is created per tour so each fixture record
        renders a unique, unambiguous row in the Outsource Work Rates list
        (``TOUR-OWR-<SLUG>``). ``user_id`` is set explicitly to ``admin``
        on every ``outsource_work_rate`` record: ``cls.env`` runs as
        SUPERUSER here, and ``outsource_work_rate_internal_user_rule``
        would otherwise hide these fixtures from the admin tour session.
        """
        super().setUpClass()
        cls.admin = cls.env.ref("base.user_admin")
        cls.product = cls.env["product.product"].create(
            {"name": "TOUR-OWR-PRODUCT", "type": "service"}
        )
        cls.pricelist = cls.env.ref("product.list0")
        cls.cancel_reason = cls.env["base.cancel_reason"].create(
            {
                "name": "TOUR Cancel Reason",
                "code": "TOUR-OWR-CANCEL-REASON",
                "global_use": True,
            }
        )

        # 01-create fills the Partner field manually; it needs no rate
        # record, only a partner to pick from the many2one dropdown.
        cls._create_partner("CREATE")

        cls.rate_edit = cls._create_rate("EDIT")
        cls.rate_delete = cls._create_rate("DELETE")
        cls.rate_confirm = cls._create_rate("CONFIRM")

        cls.rate_approve = cls._create_rate("APPROVE")
        cls.rate_approve.with_user(cls.admin).action_confirm()
        cls.rate_approve.invalidate_cache()

        cls.rate_reject = cls._create_rate("REJECT")
        cls.rate_reject.with_user(cls.admin).action_confirm()
        cls.rate_reject.invalidate_cache()

        # Pre-Condition of 07-restart-approval: the record is stuck in
        # Waiting for Approval with no approval template attached — as if
        # the approval.template that matched it was deactivated after
        # confirmation. This is the guard's "emergency door" scenario
        # (odoo-development 08-templates.md §"Apa yang guard
        # approval_template_id lakukan").
        cls.rate_restart_approval = cls._create_rate("RESTARTAPPR")
        cls.rate_restart_approval.with_user(cls.admin).action_confirm()
        cls.rate_restart_approval.invalidate_cache()
        cls.rate_restart_approval.sudo().write({"approval_template_id": False})
        cls.rate_restart_approval.invalidate_cache()

        cls.rate_open = cls._create_rate("OPEN")
        cls.rate_open.with_user(cls.admin).action_confirm()
        cls.rate_open.invalidate_cache()
        cls.rate_open.with_user(cls.admin).action_approve_approval()
        cls.rate_open.invalidate_cache()

        cls.rate_done = cls._create_rate("DONE")
        cls.rate_done.with_user(cls.admin).action_confirm()
        cls.rate_done.invalidate_cache()
        cls.rate_done.with_user(cls.admin).action_approve_approval()
        cls.rate_done.invalidate_cache()
        cls.rate_done.with_user(cls.admin).action_open()
        cls.rate_done.invalidate_cache()

        cls.rate_cancel = cls._create_rate("CANCEL")

        cls.rate_restart = cls._create_rate("RESTART")
        cls.rate_restart.with_user(cls.admin).action_cancel(cls.cancel_reason)
        cls.rate_restart.invalidate_cache()

    @classmethod
    def _create_partner(cls, suffix):
        """Create a uniquely-named partner used as an IK Pre-Condition.

        :param suffix: slug appended to ``TOUR-OWR-`` to keep list rows
            (and tour selectors) unambiguous.
        :return: the created ``res.partner`` record
        """
        return cls.env["res.partner"].create(
            {"name": "TOUR-OWR-%s" % suffix, "is_company": False}
        )

    @classmethod
    def _create_rate(cls, suffix):
        """Create a draft ``outsource_work_rate`` owned by ``admin``.

        :param suffix: slug identifying the tour this fixture is for.
        :return: the created ``outsource_work_rate`` record
        """
        partner = cls._create_partner(suffix)
        return cls.env["outsource_work_rate"].create(
            {
                "partner_id": partner.id,
                "date": "2024-01-01",
                "date_start": "2024-01-01",
                "user_id": cls.admin.id,
                "detail_ids": [
                    (
                        0,
                        0,
                        {
                            "product_id": cls.product.id,
                            "pricelist_id": cls.pricelist.id,
                        },
                    )
                ],
            }
        )

    def test_01_create(self):
        """Run the create tour for ``outsource_work_rate``.

        IK: docs/outsource_work_rate/01-create.md
        """
        self.start_tour("/web", "ssi_outsource_work_rate_01_create", login="admin")

    def test_02_edit(self):
        """Run the edit tour for ``outsource_work_rate``.

        IK: docs/outsource_work_rate/02-edit.md
        """
        self.start_tour("/web", "ssi_outsource_work_rate_02_edit", login="admin")

    def test_03_delete(self):
        """Run the delete tour for ``outsource_work_rate``.

        IK: docs/outsource_work_rate/03-delete.md
        """
        self.start_tour("/web", "ssi_outsource_work_rate_03_delete", login="admin")

    def test_04_confirm(self):
        """Run the confirm tour for ``outsource_work_rate``.

        IK: docs/outsource_work_rate/04-confirm.md
        """
        self.start_tour("/web", "ssi_outsource_work_rate_04_confirm", login="admin")

    def test_05_approve(self):
        """Run the approve tour for ``outsource_work_rate``.

        IK: docs/outsource_work_rate/05-approve.md
        """
        self.start_tour("/web", "ssi_outsource_work_rate_05_approve", login="admin")

    def test_06_reject(self):
        """Run the reject tour for ``outsource_work_rate``.

        IK: docs/outsource_work_rate/06-reject.md
        """
        self.start_tour("/web", "ssi_outsource_work_rate_06_reject", login="admin")

    def test_07_restart_approval(self):
        """Run the restart approval process tour for ``outsource_work_rate``.

        IK: docs/outsource_work_rate/07-restart-approval.md
        """
        self.start_tour(
            "/web", "ssi_outsource_work_rate_07_restart_approval", login="admin"
        )

    def test_08_open(self):
        """Run the open (start) tour for ``outsource_work_rate``.

        IK: docs/outsource_work_rate/08-open.md
        """
        self.start_tour("/web", "ssi_outsource_work_rate_08_open", login="admin")

    def test_09_done(self):
        """Run the done (finish) tour for ``outsource_work_rate``.

        IK: docs/outsource_work_rate/09-done.md
        """
        self.start_tour("/web", "ssi_outsource_work_rate_09_done", login="admin")

    def test_10_cancel(self):
        """Run the cancel tour for ``outsource_work_rate``.

        IK: docs/outsource_work_rate/10-cancel.md
        """
        self.start_tour("/web", "ssi_outsource_work_rate_10_cancel", login="admin")

    def test_12_restart(self):
        """Run the restart tour for ``outsource_work_rate``.

        IK: docs/outsource_work_rate/12-restart.md
        """
        self.start_tour("/web", "ssi_outsource_work_rate_12_restart", login="admin")
