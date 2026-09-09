# Open Outsource Work Rate

> **Module:** `ssi_outsource_work_rate`\
> **Model:** `outsource_work_rate`\
> **Menu:** Outsource Work > Outsource Work Rates\
> **Actor:** user in group _Outsource Work Rate — User_\
> **State:** `ready` → `open`\
> **Requires:** `05-approve`

## Pre-Condition

- **Record:** Status is **Ready to Start**.
- **Config:** An active `policy.template` grants `open_ok` for state `ready` to the
  actor's group.
- **Access:** User is in group _Outsource Work Rate — User_.

## Flow

1. Open the **Outsource Work > Outsource Work Rates** menu.
2. Open the record to start.
3. Click the **Start** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Status changes to **In Progress**.
