# Confirm Outsource Work Acceptance

> **Module:** `ssi_outsource_work_acceptance`
>
> **Model:** `outsource_work_acceptance`
>
> **Menu:** Outsource Work > Outsource Work Acceptances
>
> **Actor:** user in group _Outsource Work Acceptance — User_
>
> **State:** `draft` → `confirm`
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**.
- **Config:** An active `policy.template` for this model grants `confirm_ok` for state
  `draft` to the actor's group.
- **Config:** An active `approval.template` for this model matches this record.
- **Record:** Every attached Outsource Work line uses the **Analytic Account** of the
  document.
- **Access:** User is in group _Outsource Work Acceptance — User_.

## Flow

1. Open the **Outsource Work > Outsource Work Acceptances** menu.
2. Open the record to confirm.
3. Click the **Confirm** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Status changes to **Waiting for Approval**.
- Every attached Outsource Work line whose own policy allows it is confirmed too.
- Approval records are created for the approver level defined by the approval template.
