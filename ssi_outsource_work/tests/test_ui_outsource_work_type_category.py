# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiOutsourceWorkTypeCategory(HttpSavepointCase):
    """Tour tests for the ``outsource_work_type_category`` work instructions."""

    @classmethod
    def setUpClass(cls):
        """Create the categories required by the edit/delete/archive tours."""
        super().setUpClass()
        Category = cls.env["outsource_work_type_category"]
        cls.category_edit = Category.create(
            {"name": "TOUR Edit Category", "code": "TOUREDCAT"}
        )
        cls.category_delete = Category.create(
            {"name": "TOUR Delete Category", "code": "TOURDELCAT"}
        )
        cls.category_deactivate = Category.create(
            {"name": "TOUR Deactivate Category", "code": "TOURDEACAT"}
        )
        cls.category_activate = Category.create(
            {
                "name": "TOUR Activate Category",
                "code": "TOURACTCAT",
                "active": False,
            }
        )

    def test_create(self):
        """Run the create tour for ``outsource_work_type_category``.

        IK: docs/outsource_work_type_category/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_type_category_create",
            login="admin",
        )

    def test_edit(self):
        """Run the edit tour for ``outsource_work_type_category``.

        IK: docs/outsource_work_type_category/02-edit.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_type_category_edit",
            login="admin",
        )

    def test_delete(self):
        """Run the delete tour for ``outsource_work_type_category``.

        IK: docs/outsource_work_type_category/03-delete.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_type_category_delete",
            login="admin",
        )

    def test_deactivate(self):
        """Run the deactivate tour for ``outsource_work_type_category``.

        IK: docs/outsource_work_type_category/04-deactivate.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_type_category_deactivate",
            login="admin",
        )

    def test_activate(self):
        """Run the activate tour for ``outsource_work_type_category``.

        IK: docs/outsource_work_type_category/05-activate.md
        """
        self.start_tour(
            "/web",
            "ssi_outsource_work_outsource_work_type_category_activate",
            login="admin",
        )
