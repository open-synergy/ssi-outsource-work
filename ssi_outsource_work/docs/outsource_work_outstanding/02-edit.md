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
3. Change the required fields.
4. On the **Works** tab, click **Populate** again after changing **Partner**,
   **Currency**, **Date Start**/**Date End**, or **Analytic Account**, to refresh the
   list with the newly matching Outsource Work. Click **Clear** to detach all Outsource
   Work already listed. Click **Recompute Tax** after the Works list changes, to rebuild
   the **Accounting** tab's tax lines.
5. Click **Save**.

## Post-Condition

- The record is updated with the new values.
