# Restart Approval Process of Outsource Work Acceptance

> **Module:** `ssi_outsource_work_acceptance`
>
> **Model:** `outsource_work_acceptance`
>
> **Menu:** Outsource Work > Outsource Work Acceptances
>
> **Actor:** user in group _Outsource Work Acceptance — Validator_
>
> **State:** `confirm` → `confirm`
>
> **Requires:** `04-confirm`

## Pre-Condition

- **Record:** Status is **Waiting for Approval**.
- **Record:** The record has no approval template assigned, so the approval process is
  stalled without any approver. The button is hidden while an approval template is
  assigned.
- **Config:** An active `approval.template` for this model matches this record and has
  at least one approver level.
- **Config:** An active `policy.template` for this model grants `restart_approval_ok`
  for state `confirm` to the actor's group.
- **Access:** User is in group _Outsource Work Acceptance — Validator_.

## Flow

1. Open the **Outsource Work > Outsource Work Acceptances** menu.
2. Open the record whose approval process is stalled.
3. Click the **Restart Approval Process** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Status remains **Waiting for Approval**.
- The **Approvals** tab shows the approval list newly formed from the approval template.
