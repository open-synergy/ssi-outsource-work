# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).
#
# Migration: 14.0.1.16.1 -> 14.0.1.17.0
#
# Changes: the customer portal feature (controllers, portal templates, and
#          portal record rules) moved from this module to the new
#          ``ssi_outsource_work_portal`` module, so ``website`` no longer
#          needs to be a dependency here. The XML IDs below are renamed to
#          their new module so the data module loading picks up (adopts)
#          instead of dropping and recreating them with a different
#          database id.

import logging

from openupgradelib import openupgrade

_logger = logging.getLogger(__name__)

_XMLID_RENAMES = [
    (
        "ssi_outsource_work.portal_layout_outsource_work",
        "ssi_outsource_work_portal.portal_layout_outsource_work",
    ),
    (
        "ssi_outsource_work.portal_my_home_outsource_work",
        "ssi_outsource_work_portal.portal_my_home_outsource_work",
    ),
    (
        "ssi_outsource_work.portal_my_outsource_works",
        "ssi_outsource_work_portal.portal_my_outsource_works",
    ),
    (
        "ssi_outsource_work.portal_my_outsource_work",
        "ssi_outsource_work_portal.portal_my_outsource_work",
    ),
    (
        "ssi_outsource_work.portal_layout_outsource_work_outstanding",
        "ssi_outsource_work_portal.portal_layout_outsource_work_outstanding",
    ),
    (
        "ssi_outsource_work.portal_my_home_outsource_work_outstanding",
        "ssi_outsource_work_portal.portal_my_home_outsource_work_outstanding",
    ),
    (
        "ssi_outsource_work.portal_my_outsource_work_outstandings",
        "ssi_outsource_work_portal.portal_my_outsource_work_outstandings",
    ),
    (
        "ssi_outsource_work.portal_my_outsource_work_outstanding",
        "ssi_outsource_work_portal.portal_my_outsource_work_outstanding",
    ),
    (
        "ssi_outsource_work.outsource_work_portal_rule",
        "ssi_outsource_work_portal.outsource_work_portal_rule",
    ),
    (
        "ssi_outsource_work.outsource_work_outstanding_portal_rule",
        "ssi_outsource_work_portal.outsource_work_outstanding_portal_rule",
    ),
]


@openupgrade.migrate()
def migrate(env, version):
    """Rename the portal XML IDs onto their new ``ssi_outsource_work_portal``.

    Runs in the ``pre`` stage, before ``ssi_outsource_work_portal`` loads
    its own data, so the new module adopts the existing
    ``ir.model.data``/database rows instead of Odoo dropping them (because
    they are missing from this module's data files) and the new module
    recreating them with a different database id.

    :param env: the migration environment
    :param version: the version being migrated to (unused)
    :return: nothing; updates ``ir_model_data`` rows
    """
    openupgrade.rename_xmlids(env.cr, _XMLID_RENAMES)
    _logger.info(
        "Renamed %s portal XML ID(s) from ssi_outsource_work to "
        "ssi_outsource_work_portal.",
        len(_XMLID_RENAMES),
    )
