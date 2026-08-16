# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import fields, models


class TestOutsourceWorkObjectEnabled(models.Model):
    """
    Exercise ``mixin.outsource_work_object`` with the Outsource Work tab
    explicitly enabled.

    Sets ``_outsource_work_create_page = True`` so opening its form view
    must insert the Outsource Work tab and must not raise
    ``AttributeError``.
    """

    _name = "test_outsource_work_object_enabled"
    _description = "Test Outsource Work Object Mixin - Enabled"
    _inherit = [
        "mixin.outsource_work_object",
    ]

    _outsource_work_create_page = True

    name = fields.Char(
        string="Name",
    )
