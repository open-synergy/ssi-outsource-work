# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiOutsourceWorkType(HttpSavepointCase):
    """Tour tests for the ``outsource_work_type`` work instructions."""

    @classmethod
    def setUpClass(cls):
        """Create the category, product, and types the tours rely on."""
        super().setUpClass()
        cls.category = cls.env["outsource_work_type_category"].create(
            {"name": "TOUR Fixture Category", "code": "TOURFIXCAT"}
        )
        cls.product = cls.env["product.product"].create(
            {"name": "TOUR Fixture Product"}
        )
        Type = cls.env["outsource_work_type"]
        cls.type_edit = Type.create(
            {
                "name": "TOUR Edit Work Type",
                "code": "TOUREDWT",
                "category_id": cls.category.id,
                "product_id": cls.product.id,
            }
        )
        cls.type_delete = Type.create(
            {
                "name": "TOUR Delete Work Type",
                "code": "TOURDELWT",
                "category_id": cls.category.id,
                "product_id": cls.product.id,
            }
        )
        cls.type_deactivate = Type.create(
            {
                "name": "TOUR Deactivate Work Type",
                "code": "TOURDEAWT",
                "category_id": cls.category.id,
                "product_id": cls.product.id,
            }
        )
        cls.type_activate = Type.create(
            {
                "name": "TOUR Activate Work Type",
                "code": "TOURACTWT",
                "category_id": cls.category.id,
                "product_id": cls.product.id,
                "active": False,
            }
        )

    def test_create(self):
        """Run the create tour for ``outsource_work_type``.

        IK: docs/outsource_work_type/01-create.md
        """
        self.start_tour(
            "/web", "ssi_outsource_work_outsource_work_type_create", login="admin"
        )

    def test_edit(self):
        """Run the edit tour for ``outsource_work_type``.

        IK: docs/outsource_work_type/02-edit.md
        """
        self.start_tour(
            "/web", "ssi_outsource_work_outsource_work_type_edit", login="admin"
        )

    def test_delete(self):
        """Run the delete tour for ``outsource_work_type``.

        IK: docs/outsource_work_type/03-delete.md
        """
        self.start_tour(
            "/web", "ssi_outsource_work_outsource_work_type_delete", login="admin"
        )

    def test_deactivate(self):
        """Run the deactivate tour for ``outsource_work_type``.

        IK: docs/outsource_work_type/04-deactivate.md
        """
        self.start_tour(
            "/web", "ssi_outsource_work_outsource_work_type_deactivate", login="admin"
        )

    def test_activate(self):
        """Run the activate tour for ``outsource_work_type``.

        IK: docs/outsource_work_type/05-activate.md
        """
        self.start_tour(
            "/web", "ssi_outsource_work_outsource_work_type_activate", login="admin"
        )
