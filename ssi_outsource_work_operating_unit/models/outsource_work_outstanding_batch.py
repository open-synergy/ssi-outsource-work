# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import models


class OutsourceWorkOutstandingBatch(
    models.Model
):  # pylint: disable=too-few-public-methods
    """
    Ties each outstanding batch to a single operating unit.

    Adds ``mixin.single_operating_unit`` so every
    ``outsource_work_outstanding_batch`` record carries an
    ``operating_unit_id``. As a result, the list of batches a user sees
    is filtered by operating unit through this module's record rule.

    The operating unit chosen here is propagated to every
    ``outsource_work_outstanding`` the batch generates, through the
    override on ``outsource_work_outstanding_batch_detail``.
    """

    _name = "outsource_work_outstanding_batch"
    _inherit = [
        "outsource_work_outstanding_batch",
        "mixin.single_operating_unit",
    ]
