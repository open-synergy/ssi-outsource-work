# Deactivate Outsource Work Type

> **Module:** ssi*outsource_work **Model:** `outsource_work_type` > **Menu:** Outsource
> Work > Configuration > Work Types **Actor:** user in group \_Outsource Work Type* >
> **Active:** `true` → `false` > **Requires:** `01-create`

## Pre-Condition

- **Record:** The record is currently active.
- **Access:** User is in group _Outsource Work Type_.

## Flow

1. Open the **Outsource Work > Configuration > Work Types** menu.
2. Select one or more records to deactivate (check the checkbox).
3. Click **Action** > **Archive**.
4. Click **OK** to confirm.

## Post-Condition

- The records are archived and no longer appear in the default list view.
- Deactivated records cannot be selected as a **Type** on new **Outsource Work**
  documents.
- Outsource Work documents that already use this type can still be viewed.
