# Create Outsource Work Acceptance

> **Module:** `ssi_outsource_work_acceptance_operating_unit`
>
> **Extends:** ssi_outsource_work_acceptance — model `outsource_work_acceptance`, aksi
> `01-create`

## Additional Pre-Condition

- **Access:** The user is a member of the **Operating Unit / Multiple Operating Units**
  group (`operating_unit.group_multi_operating_unit`). Without this group the Operating
  Unit field described below is not rendered on the form — there is no error message,
  the field simply does not appear.
- **Module:** `ssi_outsource_work_acceptance_operating_unit` is installed.

## Additional Fields

When this module is installed, the create form gains one additional field, visible only
to users in the **Multiple Operating Unit** group
(`operating_unit.group_multi_operating_unit`):

- **Operating Unit**: the operating unit that owns this acceptance. Not required.
  Automatically filled from the current user's default operating unit (falls back to an
  operating unit assigned to the user in the active company, if any). Change if needed.
  Displayed after the **Company** field. The Outsource Work lines attached to the
  acceptance keep their own Operating Unit; it is not copied from the acceptance.

## Modified — Record Visibility

- The **Outsource Work Acceptances** list is filtered by operating unit (record rule). A
  user in the **Operating Unit** data ownership group of this module only sees
  acceptances whose Operating Unit is one of the operating units assigned to them. This
  is not a Flow step.
