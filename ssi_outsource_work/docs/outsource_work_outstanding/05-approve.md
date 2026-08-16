# Approve Outsource Work Outstanding

> **Module:** ssi_outsource_work
>
> **Model:** `outsource_work_outstanding`
>
> **Menu:** Outsource Work > Outstandings
>
> **Actor:** approver in group _Outsource Work Outstanding — Validator_
>
> **State:** `confirm` → `done`
>
> **Requires:** `04-confirm`

## Pre-Condition

- **Record:** Status is **Waiting for Approval**.
- **Config:** An active `policy.template` grants `approve_ok` to the actor's group.
- **Access:** User is registered as an approver of this record (member of group
  _Outsource Work Outstanding — Validator_).

## Flow

1. Open the **Outsource Work > Outstandings** menu.
2. Open the record to approve.
3. Click the **Approve** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Since the approval template of this model has a single approval level, the document is
  fully approved: the payable `account.move` is created and posted, and status
  automatically changes to **Done**.
