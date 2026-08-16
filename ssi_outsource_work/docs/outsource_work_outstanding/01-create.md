# Create Outsource Work Outstanding

> **Module:** ssi*outsource_work **Model:** `outsource_work_outstanding` > **Menu:**
> Outsource Work > Outstandings **Actor:** user in group \_Outsource Work Outstanding —
> User* > **State:** `—` → `draft` > **Inline Actions:** `action_populate` (Populate),
> `action_clear_work` (Clear), `action_compute_tax` (Recompute Tax)

## Pre-Condition

- **Config:** An active `policy.template` for this model.
- **Data:** At least one **Outstanding Type** exists, with a **Payable Journal** and
  **Payable Account** configured.
- **Data:** At least one **Outsource Work** document exists in **Done** status for the
  chosen partner, currency, and date range, and is not yet linked to another
  outstanding.
- **Access:** User is in group _Outsource Work Outstanding — User_.

## Flow

1. Open the **Outsource Work > Outstandings** menu.
2. Click the **New** button. **(14.0: "Create")**
3. Fill in the required fields:
   - **Partner**: the partner this outstanding is billed for.
   - **Type**: automatically fills **Payable Journal** and **Payable Account** from the
     selected **Outstanding Type**. Change if needed.
   - **Date**, **Date Due**, **Date Start**, **Date End**, **Currency**.
   - **Analytic Account**: optional, further filters which Outsource Work is picked up
     by **Populate**.
4. On the **Works** tab, click **Populate** to automatically fill the list with
   completed Outsource Work matching this partner, currency, and date range. Click
   **Clear** to detach all Outsource Work already listed. Click **Recompute Tax** to
   rebuild the **Accounting** tab's tax lines from the current Works list.
5. Click **Save**.

## Post-Condition

- A new record is created in **Draft** status.
