# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import models


class OutsourceWorkOutstandingBatchDetail(models.Model):
    """
    Propagates the batch operating unit to the outstanding it creates.

    This detail model carries no operating unit of its own: it belongs
    to exactly one ``outsource_work_outstanding_batch``, so the batch
    is the single source of truth. Without this override the generated
    ``outsource_work_outstanding`` would fall back to the operating
    unit of the user who pressed the button, hiding the outstanding
    from the owner of the batch it came from.
    """

    _name = "outsource_work_outstanding_batch_detail"
    _inherit = "outsource_work_outstanding_batch_detail"

    def _prepare_outstanding_data(self):
        """Add the batch operating unit to the outstanding values.

        The batch is the only owner of this detail, so its operating
        unit is copied without a guard: an empty operating unit on the
        batch is itself the answer and must not be replaced by the
        creating user's default.

        :return: dict of ``outsource_work_outstanding`` values
        """
        result = super()._prepare_outstanding_data()
        result["operating_unit_id"] = self.batch_id.operating_unit_id.id
        return result
