# Delete Outsource Work Outstanding

> **Module:** `ssi_outsource_work`
>
> **Model:** `outsource_work_outstanding`
>
> **Menu:** Outsource Work > Outstandings
>
> **Actor:** user in group _Outsource Work Outstanding — User_
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**.
- **Access:** User is in group _Outsource Work Outstanding — User_.

## Flow

1. Open the **Outsource Work > Outstandings** menu.
2. Select one or more records to delete (check the checkbox).
3. Click **Action** > **Delete**.
4. Click **OK** to confirm.

## Post-Condition

- The selected records are permanently removed from the system.
- Outsource Work documents that were linked to the deleted outstanding become unassigned
  again.
