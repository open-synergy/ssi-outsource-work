# Confirm Outsource Work Outstanding Batch

> **Module:** ssi_outsource_work
>
> **Model:** `outsource_work_outstanding_batch`
>
> **Menu:** Outsource Work > Outstanding Batches
>
> **Actor:** user in group _Outsource Work Outstanding Batch — User_
>
> **State:** `draft` → `confirm`
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**.
- **Config:** An active `policy.template` for this model grants `confirm_ok` for state
  `draft` to the actor's group.
- **Config:** An active `approval.template` for this model matches this record.
- **Access:** User is in group _Outsource Work Outstanding Batch — User_.

## Flow

1. Open the **Outsource Work > Outstanding Batches** menu.
2. Open the record to confirm.
3. Click the **Confirm** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Every **Outstanding Detail**'s outstanding is populated (`action_populate`) and, when
  its own `confirm_ok` policy allows, confirmed as well.
- Status changes to **Waiting for Approval**.
- Approval records are created for the approver level defined by the approval template.
