# Reject Outsource Work Rate

> **Module:** `ssi_outsource_work_rate`\
> **Model:** `outsource_work_rate`\
> **Menu:** Outsource Work > Outsource Work Rates\
> **Actor:** user registered as the pending approver (member of group _Outsource Work Rate
> — Validator_)\
> **State:** `confirm` → `reject`\
> **Requires:** `04-confirm`

## Pre-Condition

- **Record:** Status is **Waiting for Approval**.
- **Config:** An active `policy.template` grants `reject_ok` to the actor.
- **Access:** User is registered as an approver on the approval level that is currently
  pending.

## Flow

1. Open the **Outsource Work > Outsource Work Rates** menu.
2. Open the record to reject.
3. Click the **Reject** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Status changes to **Reject**.
