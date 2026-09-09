# Done Outsource Work Rate

> **Module:** `ssi_outsource_work_rate`\
> **Model:** `outsource_work_rate`\
> **Menu:** Outsource Work > Outsource Work Rates\
> **Actor:** user in group _Outsource Work Rate — User_\
> **State:** `open` → `done`\
> **Requires:** `08-open`

## Pre-Condition

- **Record:** Status is **In Progress**.
- **Config:** An active `policy.template` grants `done_ok` for state `open` to the
  actor's group.
- **Access:** User is in group _Outsource Work Rate — User_.

## Flow

1. Open the **Outsource Work > Outsource Work Rates** menu.
2. Open the record to finish.
3. Click the **Done** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Status changes to **Done**.
