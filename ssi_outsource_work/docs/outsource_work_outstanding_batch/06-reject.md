# Reject Outsource Work Outstanding Batch

> **Module:** `ssi_outsource_work`
>
> **Model:** `outsource_work_outstanding_batch`
>
> **Menu:** Outsource Work > Outstanding Batches
>
> **Actor:** approver in group _Outsource Work Outstanding Batch — Validator_
>
> **State:** `confirm` → `reject`
>
> **Requires:** `04-confirm`

## Pre-Condition

- **Record:** Status is **Waiting for Approval**.
- **Config:** An active `policy.template` grants `reject_ok` to the actor's group.
- **Access:** User is registered as an approver of this record (member of group
  _Outsource Work Outstanding Batch — Validator_).

## Flow

1. Open the **Outsource Work > Outstanding Batches** menu.
2. Open the record to reject.
3. Click the **Reject** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Every **Outstanding Detail**'s outstanding is rejected, when its own `reject_ok`
  policy allows.
- Status changes to **Rejected**.
