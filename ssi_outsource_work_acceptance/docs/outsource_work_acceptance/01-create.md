# Create Outsource Work Acceptance

> **Module:** `ssi_outsource_work_acceptance`
>
> **Model:** `outsource_work_acceptance`
>
> **Menu:** Outsource Work > Outsource Work Acceptances
>
> **Actor:** user in group _Outsource Work Acceptance — User_
>
> **State:** `—` → `draft`

## Pre-Condition

- **Config:** An active `policy.template` for this model.
- **Config:** An active `sequence.template` for this model.
- **Data:** At least one **Analytic Account**, one **Currency**, and one **Pricelist**
  in that currency exist.
- **Access:** User is in group _Outsource Work Acceptance — User_.

## Flow

1. Open the **Outsource Work > Outsource Work Acceptances** menu.
2. Click the **New** button. **(14.0: "Create")**
3. Fill in the required fields:
   - **Analytic Account**: the analytic account every attached Outsource Work line must
     use.
   - **Date Acceptance**.
   - **Currency**.
   - **Pricelist**: choose a pricelist in the selected currency.
4. Click **Save**.

## Post-Condition

- A new record is created in **Draft** status.
- Outsource Work lines attached on the **Outsource Work** tab must use the same
  **Analytic Account** as the document; otherwise saving is rejected.
