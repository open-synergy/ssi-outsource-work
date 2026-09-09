# Restart Approval Process — Outsource Work Rate

> **Module:** `ssi_outsource_work_rate`\
> **Model:** `outsource_work_rate`\
> **Menu:** Outsource Work > Outsource Work Rates\
> **Actor:** user in group _Outsource Work Rate — Validator_\
> **Requires:** `04-confirm`

## Pre-Condition

- **Record:** Status is **Waiting for Approval**.
- **Record:** No approval template is currently attached to the record (the record is
  stuck without an approver — for example because the `approval.template` that used to
  match it was deactivated or removed after the record was confirmed).
- **Config:** An active `policy.template` grants `restart_approval_ok` for state
  `confirm` to the actor's group.
- **Access:** User is in group _Outsource Work Rate — Validator_.

## Flow

1. Open the **Outsource Work > Outsource Work Rates** menu.
2. Open the record that is stuck in **Waiting for Approval** without an approver.
3. Click the **Restart Approval Process** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- The record is re-matched against the currently active `approval.template` records.
- If a matching template is found, new approval records are created for each approver
  level, and the record can be approved again (`05-approve`).
