# Delete Outsource Work Outstanding Batch

> **Module:** `ssi_outsource_work`
>
> **Model:** `outsource_work_outstanding_batch`
>
> **Menu:** Outsource Work > Outstanding Batches
>
> **Actor:** user in group _Outsource Work Outstanding Batch — User_
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**.
- **Record:** No **Outstanding Detail** exists on the batch (click **Clear** first when
  **Populate** was used).
- **Access:** User is in group _Outsource Work Outstanding Batch — User_.

## Flow

1. Open the **Outsource Work > Outstanding Batches** menu.
2. Select one or more records to delete (check the checkbox).
3. Click **Action** > **Delete**.
4. Click **OK** to confirm.

## Post-Condition

- The selected records are permanently removed from the system.
