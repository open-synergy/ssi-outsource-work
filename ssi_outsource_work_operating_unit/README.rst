.. image:: https://img.shields.io/badge/licence-AGPL--3-blue.svg
   :target: http://www.gnu.org/licenses/agpl-3.0-standalone.html
   :alt: License: AGPL-3

===============================
Outsource Work + Operating Unit
===============================

Glue module that adds Operating Unit support to the Outsource Work module.
Extends ``outsource_work``, ``outsource_work_outstanding``, and
``outsource_work_outstanding_batch`` with ``mixin.single_operating_unit``, and
restricts each of them to the operating units assigned to the user through a
record rule. When a batch generates its outstanding documents, the
``operating_unit_id`` of the batch is propagated to every generated
``outsource_work_outstanding``.


Work Instruction
================

* `Create Outsource Work Outstanding <docs/outsource_work_outstanding/index.html>`_
* `Create Outsource Work Outstanding Batch
  <docs/outsource_work_outstanding_batch/index.html>`_


Bug Tracker
===========

Bugs are tracked on `GitHub Issues
<https://github.com/open-synergy/ssi-outsource-work/issues>`_. In case of
trouble, please check there if your issue has already been reported. If you
spotted it first, help us smash it by providing detailed and welcomed feedback.


Credits
=======

Contributors
------------

* Andhitia Rama <andhitia.r@gmail.com>

Maintainer
----------

.. image:: https://simetri-sinergi.id/logo.png
   :alt: PT. Simetri Sinergi Indonesia
   :target: https://simetri-sinergi.id

This module is maintained by the PT. Simetri Sinergi Indonesia.
