# Restart Outsource Work Rate

> **Module:** `ssi_outsource_work_rate`\
> **Model:** `outsource_work_rate`\
> **Menu:** Outsource Work > Outsource Work Rates\
> **Actor:** user in group _Outsource Work Rate — Validator_\
> **State:** `cancel` | `reject` → `draft`\
> **Requires:** `10-cancel`

## Pre-Condition

- **Record:** Status is **Cancelled** or **Reject**.
- **Config:** An active `policy.template` grants `restart_ok` for that state to the
  actor's group.
- **Access:** User is in group _Outsource Work Rate — Validator_.

## Flow

1. Open the **Outsource Work > Outsource Work Rates** menu.
2. Open the record to restart.
3. Click the **Restart** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Status returns to **Draft**.
- All approval records are removed and the approval template is cleared. A later Confirm
  starts the approval process from the beginning.
