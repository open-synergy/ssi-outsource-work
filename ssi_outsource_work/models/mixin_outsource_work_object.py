# Copyright 2022 OpenSynergy Indonesia
# Copyright 2022 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from lxml import etree

from odoo import api, fields, models


class MixinOutsourceWorkObject(models.AbstractModel):
    """
    Adds an Outsource Work tab to a document's form view.

    Inheriting models get an ``outsource_work_ids`` one2many and the tab
    insertion logic in ``fields_view_get``. Every class attribute the
    insertion logic reads (``_outsource_work_create_page``,
    ``_work_log_page_xpath``, ``_work_log_template_position``) is declared
    here with a safe default, so a model that does not override any of
    them can still open its form without raising ``AttributeError``.
    """

    _name = "mixin.outsource_work_object"
    _description = "Outsource Work Object Mixin"

    _outsource_work_create_page = False
    _work_log_page_xpath = "//page[1]"
    _work_log_template_position = "before"

    outsource_work_ids = fields.One2many(
        string="Outsource Work Logs",
        comodel_name="outsource_work",
        inverse_name="work_object_id",
        domain=lambda self: [("model_name", "=", self._name)],
        auto_join=True,
        readonly=False,
    )

    @api.model
    def fields_view_get(
        self, view_id=None, view_type="form", toolbar=False, submenu=False
    ):
        """Insert the Outsource Work tab into the form view on the fly.

        Overridden so models with ``_outsource_work_create_page = True``
        get the ``outsource_work_template`` QWeb snippet spliced into
        their form arch at ``_work_log_page_xpath``, without every
        inheriting model having to redeclare the tab in its own view.

        :param view_id: id of the view being rendered
        :param view_type: type of view requested (only ``"form"`` is
            affected by this override)
        :param toolbar: whether to include the toolbar in the result
        :param submenu: whether to include the submenu in the result
        :return: the view description dict, with ``arch``/``fields``
            patched when the tab was inserted
        """
        res = super().fields_view_get(
            view_id=view_id, view_type=view_type, toolbar=toolbar, submenu=submenu
        )
        if view_type == "form" and self._outsource_work_create_page:
            doc = etree.XML(res["arch"])
            node_xpath = doc.xpath(self._work_log_page_xpath)
            if node_xpath:
                str_element = self.env["ir.qweb"]._render(
                    "ssi_outsource_work.outsource_work_template"
                )
                for node in node_xpath:
                    new_node = etree.fromstring(str_element)
                    if self._work_log_template_position == "after":
                        node.addnext(new_node)
                    elif self._work_log_template_position == "before":
                        node.addprevious(new_node)

            View = self.env["ir.ui.view"]

            if view_id and res.get("base_model", self._name) != self._name:
                View = View.with_context(base_model_name=res["base_model"])
            new_arch, new_fields = View.postprocess_and_fields(doc, self._name)
            res["arch"] = new_arch
            new_fields.update(res["fields"])
            res["fields"] = new_fields
        return res

    @api.depends(
        "outsource_work_ids",
        "outsource_work_ids.analytic_account_id",
    )
    def _compute_allowed_analytic_account_ids(self):
        """Compute the analytic accounts allowed on outsource work logs.

        Base implementation always resolves to an empty recordset;
        inheriting models override this to filter analytic accounts
        based on their own ``ir.model`` configuration.
        """
        for document in self:
            document.allowed_analytic_account_ids = []

    allowed_analytic_account_ids = fields.Many2many(
        string="Analytic Accounts",
        comodel_name="account.analytic.account",
        compute="_compute_allowed_analytic_account_ids",
    )

    def unlink(self):
        """Delete related outsource work logs before deleting the record.

        Overridden so ``outsource_work_ids`` do not become orphaned
        (dangling ``model_name``/``res_id`` reference) once the parent
        document is removed.

        :return: result of the ``super().unlink()`` call
        """
        outsource_works = self.mapped("outsource_work_ids")
        outsource_works.unlink()
        return super(MixinOutsourceWorkObject, self).unlink()
