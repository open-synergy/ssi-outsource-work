# Approve Outsource Work Acceptance

> **Module:** `ssi_outsource_work_acceptance`
>
> **Model:** `outsource_work_acceptance`
>
> **Menu:** Outsource Work > Outsource Work Acceptances
>
> **Actor:** approver in group _Outsource Work Acceptance — Validator_
>
> **State:** `confirm` → `done`
>
> **Requires:** `04-confirm`

## Pre-Condition

- **Record:** Status is **Waiting for Approval**.
- **Config:** An active `policy.template` grants `approve_ok` to the actor's group.
- **Access:** User is registered as an approver of this record (member of group
  _Outsource Work Acceptance — Validator_).

## Flow

1. Open the **Outsource Work > Outsource Work Acceptances** menu.
2. Open the record to approve.
3. Click the **Approve** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Since the approval template has a single approval level, the document is fully
  approved and status automatically changes to **Done**.
- Every attached Outsource Work line whose own policy allows it is approved too.
