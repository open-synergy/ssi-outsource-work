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
3. On the **Outstandings** tab, click **Populate** to rebuild the details with Outsource
   Work matching the current **Currency**, **Date Start**/**Date End**, and **Analytic
   Account**. Click **Clear** to remove every detail and the outstanding it created.
4. Change the required fields.
5. Click **Save**.

## Post-Condition

- The record is updated with the new values.
