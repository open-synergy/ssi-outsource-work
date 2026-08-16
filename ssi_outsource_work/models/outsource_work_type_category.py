# Copyright 2022 OpenSynergy Indonesia
# Copyright 2022 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).


from odoo import fields, models


class OutsourceWorkTypeCategory(models.Model):
    """
    Master data category grouping ``outsource_work_type`` records.

    Supports a self-referencing ``parent_id`` so categories can be
    organized hierarchically.
    """

    _name = "outsource_work_type_category"
    _inherit = ["mixin.master_data"]
    _description = "Outsource Work Type Category"

    parent_id = fields.Many2one(
        string="Parent",
        comodel_name="outsource_work_type_category",
        ondelete="restrict",
    )
