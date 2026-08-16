# Create Outsource Work Outstanding Batch

> **Module:** ssi*outsource_work **Model:** `outsource_work_outstanding_batch` >
> **Menu:** Outsource Work > Outstanding Batches **Actor:** user in group \_Outsource
> Work Outstanding Batch — User* > **State:** `—` → `draft` > **Inline Actions:** >
> `action_populate` (Populate), `action_clear` (Clear)

## Pre-Condition

- **Config:** An active `policy.template` for this model.
- **Data:** At least one **Outstanding Type** exists, with a **Payable Journal** and
  **Payable Account** configured.
- **Data:** At least one **Outsource Work** document exists in **Done** status, within
  the chosen currency and date range, not yet linked to another outstanding.
- **Access:** User is in group _Outsource Work Outstanding Batch — User_.

## Flow

1. Open the **Outsource Work > Outstanding Batches** menu.
2. Click the **New** button. **(14.0: "Create")**
3. Fill in the required fields:
   - **Type**: automatically fills **Payable Journal** and **Payable Account** (through
     each generated outstanding).
   - **Date**, **Date Due**, **Date Start**, **Date End**, **Currency**.
   - **Analytic Account**: optional, further filters which Outsource Work is picked up
     by **Populate**.
4. On the **Outstandings** tab, click **Populate** to automatically create one
   **Outstanding Detail** per partner with completed Outsource Work matching this
   currency and date range — each detail creates and populates its own **Outsource Work
   Outstanding**. Click **Clear** to remove every detail and the outstanding it created.
5. Click **Save**.

## Post-Condition

- A new record is created in **Draft** status.
