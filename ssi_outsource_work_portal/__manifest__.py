# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

{
    "name": "Outsource Work Portal",
    "version": "14.0.1.0.0",
    "website": "https://simetri-sinergi.id",
    "author": "OpenSynergy Indonesia, PT. Simetri Sinergi Indonesia",
    "license": "AGPL-3",
    "installable": True,
    "application": False,
    "depends": [
        "ssi_outsource_work",
        "portal",
    ],
    "data": [
        "security/ir_rule/outsource_work.xml",
        "security/ir_rule/outsource_work_outstanding.xml",
        "views/outsource_work_portal_templates.xml",
        "views/outsource_work_outstanding_portal_templates.xml",
    ],
    "demo": [],
    "contributors": [
        "Andhitia Rama <andhitia.r@gmail.com>",
    ],
}
