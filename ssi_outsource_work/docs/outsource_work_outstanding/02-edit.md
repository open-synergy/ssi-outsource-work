# Edit Outsource Work Outstanding

> **Module:** ssi_outsource_work
>
> **Model:** `outsource_work_outstanding`
>
> **Menu:** Outsource Work > Outstandings
>
> **Actor:** user in group _Outsource Work Outstanding — User_
>
> **Requires:** `01-create`
>
> **Inline Actions:** `action_populate` (Populate), `action_clear_work` (Clear),
> `action_compute_tax` (Recompute Tax)

## Pre-Condition

- **Record:** Status is **Draft**.
- **Access:** User is in group _Outsource Work Outstanding — User_.

## Flow

1. Open the **Outsource Work > Outstandings** menu.
2. Find and open the record to edit.
3. On the **Works** tab, click **Populate** to refresh the list with Outsource Work
   matching the current **Partner**, **Currency**, **Date Start**/**Date End**, and
   **Analytic Account**. Click **Clear** to detach all Outsource Work already listed.
   Click **Recompute Tax** to rebuild the **Accounting** tab's tax lines from the
   current Works list.
4. Change the required fields.
5. Click **Save**.

## Post-Condition

- The record is updated with the new values.
