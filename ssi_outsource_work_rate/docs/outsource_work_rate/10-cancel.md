# Cancel Outsource Work Rate

> **Module:** `ssi_outsource_work_rate`\
> **Model:** `outsource_work_rate`\
> **Menu:** Outsource Work > Outsource Work Rates\
> **Actor:** user in group _Outsource Work Rate — Validator_\
> **State:** `draft` | `ready` | `open` | `done` → `cancel`\
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status allows cancellation — **Draft**, **Ready to Start**, **In
  Progress**, or **Done**.
- **Config:** An active `policy.template` grants `cancel_ok` for that state to the
  actor's group.
- **Access:** User is in group _Outsource Work Rate — Validator_.

## Flow

1. Open the **Outsource Work > Outsource Work Rates** menu.
2. Open the record to cancel.
3. Click the **Cancel** button.
4. In the wizard that appears, select the **Cancellation Reason**.
5. Click **Confirm**.
6. Click **OK** on the confirmation dialog.

## Post-Condition

- Status changes to **Cancelled**.
