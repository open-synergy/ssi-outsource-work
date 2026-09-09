# Deactivate Outsource Work Type Category

> **Module:** `ssi_outsource_work`
>
> **Model:** `outsource_work_type_category`
>
> **Menu:** Outsource Work > Configuration > Work Category Types
>
> **Actor:** user in group _Outsource Work Type Category_
>
> **Active:** `true` → `false`
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** The record is currently active.
- **Access:** User is in group _Outsource Work Type Category_.

## Flow

1. Open the **Outsource Work > Configuration > Work Category Types** menu.
2. Select one or more records to deactivate (check the checkbox).
3. Click **Action** > **Archive**.
4. Click **OK** to confirm.

## Post-Condition

- The records are archived and no longer appear in the default list view.
- Deactivated records cannot be selected as a **Category** on new **Work Types**.
- Work Types that already use this category can still be viewed.
