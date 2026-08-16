# Deactivate Outsource Work Outstanding Type

> **Module:** ssi*outsource_work **Model:** `outsource_work_outstanding_type` >
> **Menu:** Outsource Work > Configuration > Outstanding Types **Actor:** user in group
> \_Outsource Work Outstanding Type* > **Active:** `true` → `false` > **Requires:** >
> `01-create`

## Pre-Condition

- **Record:** The record is currently active.
- **Access:** User is in group _Outsource Work Outstanding Type_.

## Flow

1. Open the **Outsource Work > Configuration > Outstanding Types** menu.
2. Select one or more records to deactivate (check the checkbox).
3. Click **Action** > **Archive**.
4. Click **OK** to confirm.

## Post-Condition

- The records are archived and no longer appear in the default list view.
- Deactivated records cannot be selected as a **Type** on new **Outsource Work
  Outstanding**/**Outsource Work Outstanding Batch** documents.
- Documents that already use this type can still be viewed.
