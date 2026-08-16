# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import models


class OutsourceWork(models.Model):  # pylint: disable=too-few-public-methods
    """
    Ties each outsource work document to a single operating unit.

    Adds ``mixin.single_operating_unit`` so every ``outsource_work``
    record carries an ``operating_unit_id``. As a result, the list of
    outsource work documents a user sees is filtered by operating unit
    through this module's record rule.

    The journal item this document creates is deliberately NOT given
    the document's operating unit: its operating unit follows the
    accounting configuration of the journal it is posted to, which is
    owned by the accounting operating unit glue, not by this module.
    """

    _name = "outsource_work"
    _inherit = [
        "outsource_work",
        "mixin.single_operating_unit",
    ]
