# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import models


class OutsourceWorkAcceptance(models.Model):  # pylint: disable=too-few-public-methods
    """
    Ties each outsource work acceptance to a single operating unit.

    Adds ``mixin.single_operating_unit`` so every
    ``outsource_work_acceptance`` record carries an
    ``operating_unit_id``. As a result, the list of acceptances a user
    sees is filtered by operating unit through this module's record
    rule.

    The acceptance never creates another document: its workflow
    cascade only moves the ``outsource_work`` lines already attached
    to it. Those lines are documents with their own operating unit,
    owned by ``ssi_outsource_work_operating_unit``, so the operating
    unit of the acceptance is deliberately NOT copied onto them.
    """

    _name = "outsource_work_acceptance"
    _inherit = [
        "outsource_work_acceptance",
        "mixin.single_operating_unit",
    ]
