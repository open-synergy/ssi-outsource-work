# Approve Outsource Work Rate

> **Module:** `ssi_outsource_work_rate`\
> **Model:** `outsource_work_rate`\
> **Menu:** Outsource Work > Outsource Work Rates\
> **Actor:** user registered as the pending approver (member of group _Outsource Work Rate
> — Validator_)\
> **State:** `confirm` → `ready`\
> **Requires:** `04-confirm`

## Pre-Condition

- **Record:** Status is **Waiting for Approval**.
- **Config:** An active `policy.template` grants `approve_ok` to the actor.
- **Access:** User is registered as an approver on the approval level that is currently
  **pending**. When the template uses sequential approval, only the first unapproved
  level is pending.

## Flow

1. Open the **Outsource Work > Outsource Work Rates** menu.
2. Open the record to approve.
3. Click the **Approve** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- If all approval levels are fulfilled, status changes to **Ready to Start** and a
  document number is generated for the record (replacing the placeholder **/**).
- If there are still pending approval levels, status remains **Waiting for Approval**
  and the next level becomes pending.
