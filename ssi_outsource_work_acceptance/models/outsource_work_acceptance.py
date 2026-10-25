# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import _, api, fields, models
from odoo.exceptions import UserError, ValidationError

from odoo.addons.ssi_decorator import ssi_decorator


class OutsourceWorkAcceptance(models.Model):
    """
    Groups outsource work lines of one analytic account for joint approval.

    A generic submission document: every ``outsource_work`` line attached
    to it must use the same analytic account as the document. Confirming,
    approving, rejecting, cancelling or restarting the document moves
    every attached line whose own policy allows the same transition.
    """

    _name = "outsource_work_acceptance"
    _inherit = [
        "mixin.transaction_confirm",
        "mixin.transaction_cancel",
        "mixin.transaction_done",
        "mixin.outsource_work_object",
        "mixin.transaction_pricelist",
    ]
    _description = "Outsource Work Acceptance"

    # Multiple Approval Attribute
    _approval_from_state = "draft"
    _approval_to_state = "done"
    _approval_state = "confirm"
    _after_approved_method = "action_done"

    # Attributes related to add element on view automatically
    _automatically_insert_view_element = True
    _automatically_insert_done_button = False
    _automatically_insert_done_policy_fields = False

    # Attributes related to add element on form view automatically
    _automatically_insert_multiple_approval_page = True
    _outsource_work_create_page = True
    _statusbar_visible_label = "draft,confirm,done"
    _policy_field_order = [
        "confirm_ok",
        "approve_ok",
        "reject_ok",
        "restart_approval_ok",
        "cancel_ok",
        "restart_ok",
        "manual_number_ok",
    ]
    _header_button_order = [
        "action_confirm",
        "action_approve_approval",
        "action_reject_approval",
        "%(ssi_transaction_cancel_mixin.base_select_cancel_reason_action)d",
        "action_restart",
    ]

    # Attributes related to add element on search view automatically
    _state_filter_order = [
        "dom_draft",
        "dom_confirm",
        "dom_reject",
        "dom_done",
        "dom_cancel",
    ]

    # Sequence attribute
    _create_sequence_state = "done"

    # Override mixin outsource work
    outsource_work_ids = fields.One2many(
        readonly=True,
        states={
            "draft": [("readonly", False)],
        },
    )
    date = fields.Date(
        string="Date Acceptance",
        required=True,
        readonly=True,
        states={
            "draft": [("readonly", False)],
        },
        help="Date on which the outsource work lines are submitted.",
    )
    analytic_account_id = fields.Many2one(
        string="Analytic Account",
        comodel_name="account.analytic.account",
        required=True,
        ondelete="restrict",
        readonly=True,
        states={
            "draft": [("readonly", False)],
        },
        help="Analytic account shared by every outsource work line of this "
        "document. Lines using another analytic account are rejected.",
    )
    amount_untaxed = fields.Monetary(
        string="Untaxed",
        required=False,
        compute="_compute_total",
        store=True,
        currency_field="currency_id",
        help="Sum of the untaxed subtotal of every outsource work line.",
    )
    amount_tax = fields.Monetary(
        string="Tax",
        required=False,
        compute="_compute_total",
        store=True,
        currency_field="currency_id",
        help="Sum of the tax amount of every outsource work line.",
    )
    amount_total = fields.Monetary(
        string="Total",
        required=False,
        compute="_compute_total",
        store=True,
        currency_field="currency_id",
        help="Sum of the total amount of every outsource work line.",
    )
    reconciled = fields.Boolean(
        string="Reconciled",
        compute="_compute_reconciled",
        store=True,
        help="Checked when the document has lines and all of them are " "reconciled.",
    )
    state = fields.Selection(
        selection=[
            ("draft", "Draft"),
            ("confirm", "Waiting for Approval"),
            ("done", "Done"),
            ("reject", "Rejected"),
            ("cancel", "Cancelled"),
        ],
    )

    @api.depends(
        "outsource_work_ids",
        "outsource_work_ids.price_subtotal",
        "outsource_work_ids.price_tax",
        "outsource_work_ids.price_total",
    )
    def _compute_total(self):
        """Sum the untaxed, tax and total amounts of the lines.

        Each amount is the plain sum of the matching line field; a
        document without lines gets zero for all three.
        """
        for record in self:
            amount_untaxed = amount_tax = amount_total = 0.0
            for work in record.outsource_work_ids:
                amount_untaxed += work.price_subtotal
                amount_tax += work.price_tax
                amount_total += work.price_total

            record.amount_untaxed = amount_untaxed
            record.amount_tax = amount_tax
            record.amount_total = amount_total

    @api.depends(
        "outsource_work_ids",
        "outsource_work_ids.reconciled",
    )
    def _compute_reconciled(self):
        """Flag the document as reconciled when every line is reconciled.

        The result is ``False`` for a document without lines, and
        ``True`` only if each line has ``reconciled`` set.
        """
        for record in self:
            result = True

            if len(record.outsource_work_ids) == 0:
                result = False

            for work in record.outsource_work_ids:
                if not work.reconciled:
                    result = False

            record.reconciled = result

    @api.depends(
        "analytic_account_id",
    )
    def _compute_allowed_analytic_account_ids(self):
        """Restrict the allowed analytic accounts to the document's own.

        Overrides the mixin hook: the allowed set is the single
        ``analytic_account_id`` of the document, or empty when unset.
        """
        for record in self:
            result = []
            if record.analytic_account_id:
                result = [record.analytic_account_id.id]
            record.allowed_analytic_account_ids = result

    @api.model
    def _get_policy_field(self):
        res = super(OutsourceWorkAcceptance, self)._get_policy_field()
        policy_field = [
            "confirm_ok",
            "approve_ok",
            "done_ok",
            "cancel_ok",
            "reject_ok",
            "restart_ok",
            "restart_approval_ok",
            "manual_number_ok",
        ]
        res += policy_field
        return res

    @ssi_decorator.insert_on_form_view()
    def _insert_form_element(self, view_arch):
        if self._automatically_insert_view_element:
            view_arch = self._reconfigure_statusbar_visible(view_arch)
        return view_arch

    @api.onchange(
        "analytic_account_id",
    )
    def onchange_policy_template_id(self):
        """Reassign the policy template when the analytic account changes.

        Picks the first policy template matching the document through
        ``_get_template_policy``.
        """
        template_id = self._get_template_policy()
        self.policy_template_id = template_id

    def _get_mismatched_works(self):
        """Return the lines whose analytic account differs from the header.

        :return: ``outsource_work`` recordset of the lines that do not use
            ``analytic_account_id`` of this document
        """
        self.ensure_one()
        return self.outsource_work_ids.filtered(
            lambda work: work.analytic_account_id != self.analytic_account_id
        )

    def _prepare_mismatch_message(self, context):
        """Build the structured error text for mismatching lines.

        :param context: short description of the operation being done
        :return: the error message listing the offending lines
        """
        self.ensure_one()
        names = ", ".join(self._get_mismatched_works().mapped("name"))
        return _(
            """
Document Type: %s
Context: %s
Database ID: %s
Problem: Outsource work lines use a different analytic account than %s: %s
Solution: Change the analytic account of the lines or remove them
"""
            % (
                self._description,
                context,
                self.id,
                self.analytic_account_id.display_name,
                names,
            )
        )

    @api.constrains(
        "analytic_account_id",
        "outsource_work_ids",
    )
    def _constrains_work_analytic_account(self):
        """Reject lines whose analytic account differs from the header.

        Runs when the document or its line set is written. Lines
        created or edited directly through ``outsource_work`` do not
        trigger it; ``_10_check_work_analytic_account`` covers them
        at confirmation.

        :raises ValidationError: when any line uses another analytic
            account
        """
        for record in self:
            if record._get_mismatched_works():
                raise ValidationError(
                    record._prepare_mismatch_message("Save outsource work acceptance")
                )

    @ssi_decorator.pre_confirm_check()
    def _10_check_work_analytic_account(self):
        """Block confirmation while a line uses another analytic account.

        Runs before the state changes, so lines edited directly through
        the Outsource Work menu cannot slip past the save-time constraint.

        :raises UserError: when any line uses another analytic account
        """
        self.ensure_one()
        if self._get_mismatched_works():
            raise UserError(
                self._prepare_mismatch_message("Confirm outsource work acceptance")
            )

    @ssi_decorator.post_confirm_action()
    def _10_confirm_outsource_work(self):
        """Confirm every line whose policy allows it.

        Runs after the document enters ``confirm``.
        """
        self.ensure_one()
        for work in self.outsource_work_ids:
            if work.confirm_ok:
                work.action_confirm()

    @ssi_decorator.post_cancel_action()
    def _10_cancel_outsource_work(self):
        """Cancel every line whose policy allows it.

        The cancel reason of the document is passed on to each line.
        """
        self.ensure_one()
        for work in self.outsource_work_ids:
            if work.cancel_ok:
                work.action_cancel(self.cancel_reason_id)

    @ssi_decorator.post_restart_action()
    def _10_restart_outsource_work(self):
        """Restart every line whose policy allows it."""
        self.ensure_one()
        for work in self.outsource_work_ids:
            if work.restart_ok:
                work.action_restart()

    @ssi_decorator.post_approve_action()
    def _10_approve_outsource_work(self):
        """Approve every line whose policy allows it."""
        self.ensure_one()
        for work in self.outsource_work_ids:
            if work.approve_ok:
                work.action_approve_approval()

    @ssi_decorator.post_reject_action()
    def _10_reject_outsource_work(self):
        """Reject every line whose policy allows it."""
        self.ensure_one()
        for work in self.outsource_work_ids:
            if work.reject_ok:
                work.action_reject_approval()
