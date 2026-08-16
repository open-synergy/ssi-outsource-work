# Confirm Outsource Work Outstanding

> **Module:** ssi*outsource_work **Model:** `outsource_work_outstanding` > **Menu:**
> Outsource Work > Outstandings **Actor:** user in group \_Outsource Work Outstanding —
> User* > **State:** `draft` → `confirm` > **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**.
- **Config:** An active `policy.template` for this model grants `confirm_ok` for state
  `draft` to the actor's group.
- **Config:** An active `approval.template` for this model matches this record.
- **Access:** User is in group _Outsource Work Outstanding — User_.

## Flow

1. Open the **Outsource Work > Outstandings** menu.
2. Open the record to confirm.
3. Click the **Confirm** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Status changes to **Waiting for Approval**.
- Approval records are created for the approver level defined by the approval template.
