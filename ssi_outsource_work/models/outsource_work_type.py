# Copyright 2022 OpenSynergy Indonesia
# Copyright 2022 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).


from odoo import fields, models


class OutsourceWorkType(models.Model):
    """
    Master data type for ``outsource_work`` documents.

    Links a category and the product an outsource work of this type
    is priced and invoiced against.
    """

    _name = "outsource_work_type"
    _inherit = ["mixin.master_data"]
    _description = "Outsource Work Type"

    category_id = fields.Many2one(
        string="Category",
        comodel_name="outsource_work_type_category",
        required=True,
        ondelete="restrict",
    )
    product_id = fields.Many2one(
        string="Product",
        comodel_name="product.product",
        required=True,
        ondelete="restrict",
    )
