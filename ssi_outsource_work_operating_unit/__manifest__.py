# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).
{
    "name": "Outsource Work + Operating Unit",
    "version": "14.0.1.0.0",
    "website": "https://simetri-sinergi.id",
    "author": "OpenSynergy Indonesia, PT. Simetri Sinergi Indonesia",
    "contributors": [
        "Andhitia Rama <andhitia.r@gmail.com>",
    ],
    "license": "AGPL-3",
    "installable": True,
    "depends": [
        "ssi_outsource_work",
        "ssi_operating_unit_mixin",
    ],
    "data": [
        "security/res_group/outsource_work.xml",
        "security/res_group/outsource_work_outstanding.xml",
        "security/res_group/outsource_work_outstanding_batch.xml",
        "security/ir_rule/outsource_work.xml",
        "security/ir_rule/outsource_work_outstanding.xml",
        "security/ir_rule/outsource_work_outstanding_batch.xml",
        "views/outsource_work_views.xml",
        "views/outsource_work_outstanding_views.xml",
        "views/outsource_work_outstanding_batch_views.xml",
    ],
}
