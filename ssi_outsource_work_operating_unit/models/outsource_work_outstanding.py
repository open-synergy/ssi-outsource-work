# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import models


class OutsourceWorkOutstanding(models.Model):  # pylint: disable=too-few-public-methods
    """
    Ties each outstanding document to a single operating unit.

    Adds ``mixin.single_operating_unit`` so every
    ``outsource_work_outstanding`` record carries an
    ``operating_unit_id``. As a result, the list of outstanding
    documents a user sees is filtered by operating unit through this
    module's record rule.

    The account move and journal items this document creates are
    deliberately NOT given the document's operating unit: their
    operating unit follows the accounting configuration of the payable
    journal they are posted to, which is owned by the accounting
    operating unit glue, not by this module.
    """

    _name = "outsource_work_outstanding"
    _inherit = [
        "outsource_work_outstanding",
        "mixin.single_operating_unit",
    ]
