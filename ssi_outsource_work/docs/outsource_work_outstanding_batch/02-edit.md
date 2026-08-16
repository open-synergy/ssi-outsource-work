# Edit Outsource Work Outstanding Batch

> **Module:** ssi_outsource_work
>
> **Model:** `outsource_work_outstanding_batch`
>
> **Menu:** Outsource Work > Outstanding Batches
>
> **Actor:** user in group _Outsource Work Outstanding Batch — User_
>
> **Requires:** `01-create`
>
> **Inline Actions:** `action_populate` (Populate), `action_clear` (Clear)

## Pre-Condition

- **Record:** Status is **Draft**.
- **Access:** User is in group _Outsource Work Outstanding Batch — User_.

## Flow

1. Open the **Outsource Work > Outstanding Batches** menu.
2. Find and open the record to edit.
3. Change the required fields.
4. On the **Outstandings** tab, click **Populate** again after changing **Currency**,
   **Date Start**/**Date End**, or **Analytic Account**, to rebuild the details with the
   newly matching Outsource Work. Click **Clear** to remove every detail and the
   outstanding it created.
5. Click **Save**.

## Post-Condition

- The record is updated with the new values.
