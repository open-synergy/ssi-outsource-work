# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import models


class OutsourceWorkRate(models.Model):  # pylint: disable=too-few-public-methods
    """
    Ties each outsource work rate document to a single operating unit.

    Adds ``mixin.single_operating_unit`` so every ``outsource_work_rate``
    record carries an ``operating_unit_id``. As a result, the list of
    rate documents a user sees is filtered by operating unit through
    this module's record rule.

    ``outsource_work_rate_detail`` is not covered by this module: its
    rows are scoped by their parent ``rate_id``, so it inherits the
    restriction through the parent and does not need its own
    ``operating_unit_id``.
    """

    _name = "outsource_work_rate"
    _inherit = [
        "outsource_work_rate",
        "mixin.single_operating_unit",
    ]
