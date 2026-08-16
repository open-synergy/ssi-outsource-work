# Restart Outsource Work Outstanding Batch

> **Module:** ssi_outsource_work
>
> **Model:** `outsource_work_outstanding_batch`
>
> **Menu:** Outsource Work > Outstanding Batches
>
> **Actor:** user in group _Outsource Work Outstanding Batch — Validator_
>
> **State:** `cancel` | `reject` → `draft`
>
> **Requires:** `10-cancel`

## Pre-Condition

- **Record:** Status is **Cancelled** or **Rejected**.
- **Config:** An active `policy.template` grants `restart_ok` for that state to the
  actor's group.
- **Access:** User is in group _Outsource Work Outstanding Batch — Validator_.

## Flow

1. Open the **Outsource Work > Outstanding Batches** menu.
2. Open the record to restart.
3. Click the **Restart** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Status returns to **Draft**.
- All approval records are removed and the approval template is cleared. A later Confirm
  starts the approval process from the beginning.
- Every **Outstanding Detail**'s outstanding is restarted, when its own `restart_ok`
  policy allows.
