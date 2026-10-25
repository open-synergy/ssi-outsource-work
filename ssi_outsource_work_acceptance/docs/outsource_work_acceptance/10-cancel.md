# Cancel Outsource Work Acceptance

> **Module:** `ssi_outsource_work_acceptance`
>
> **Model:** `outsource_work_acceptance`
>
> **Menu:** Outsource Work > Outsource Work Acceptances
>
> **Actor:** user in group _Outsource Work Acceptance — Validator_
>
> **State:** `draft` | `confirm` | `done` → `cancel`
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**, **Waiting for Approval**, or **Done**.
- **Config:** An active `policy.template` grants `cancel_ok` for that state to the
  actor's group.
- **Data:** At least one **Cancel Reason** is available for this model.
- **Access:** User is in group _Outsource Work Acceptance — Validator_.

## Flow

1. Open the **Outsource Work > Outsource Work Acceptances** menu.
2. Open the record to cancel.
3. Click the **Cancel** button.
4. In the wizard that appears, select the **Cancellation Reason**.
5. Click **Confirm**.
6. Click **OK** on the confirmation dialog.

## Post-Condition

- Status changes to **Cancelled**.
- Every attached Outsource Work line whose own policy allows it is cancelled with the
  same reason.
