# Cancel Outsource Work Outstanding Batch

> **Module:** `ssi_outsource_work`
>
> **Model:** `outsource_work_outstanding_batch`
>
> **Menu:** Outsource Work > Outstanding Batches
>
> **Actor:** user in group _Outsource Work Outstanding Batch — Validator_
>
> **State:** `draft` | `confirm` | `done` → `cancel`
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**, **Waiting for Approval**, or **Done**.
- **Config:** An active `policy.template` grants `cancel_ok` for that state to the
  actor's group.
- **Access:** User is in group _Outsource Work Outstanding Batch — Validator_.

## Flow

1. Open the **Outsource Work > Outstanding Batches** menu.
2. Open the record to cancel.
3. Click the **Cancel** button.
4. In the wizard that appears, select the **Cancellation Reason**.
5. Click **Confirm**.
6. Click **OK** on the confirmation dialog.

## Post-Condition

- Every **Outstanding Detail**'s outstanding is cancelled, when its own `cancel_ok`
  policy allows.
- Status changes to **Cancelled**.
