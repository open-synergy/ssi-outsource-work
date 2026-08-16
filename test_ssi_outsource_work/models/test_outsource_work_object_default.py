# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import fields, models


class TestOutsourceWorkObjectDefault(models.Model):
    """
    Exercise ``mixin.outsource_work_object`` without overriding any of its
    class attributes.

    It never sets ``_outsource_work_create_page``, so opening its form
    view must rely entirely on the mixin's own default and must not raise
    ``AttributeError``.
    """

    _name = "test_outsource_work_object_default"
    _description = "Test Outsource Work Object Mixin - Default"
    _inherit = [
        "mixin.outsource_work_object",
    ]

    name = fields.Char(
        string="Name",
    )
