# Delete Outsource Work Acceptance

> **Module:** `ssi_outsource_work_acceptance`
>
> **Model:** `outsource_work_acceptance`
>
> **Menu:** Outsource Work > Outsource Work Acceptances
>
> **Actor:** user in group _Outsource Work Acceptance — User_
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**, and the document number is still `/`.
- **Access:** User is in group _Outsource Work Acceptance — User_.

## Flow

1. Open the **Outsource Work > Outsource Work Acceptances** menu.
2. Open the record to delete.
3. Click **Action** > **Delete**.
4. Click **OK** to confirm.

## Post-Condition

- The record is permanently removed from the system.
- Outsource Work lines attached to it are removed as well.
