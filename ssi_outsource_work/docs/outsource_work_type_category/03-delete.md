# Delete Outsource Work Type Category

> **Module:** ssi*outsource_work **Model:** `outsource_work_type_category` > **Menu:**
> Outsource Work > Configuration > Work Category Types **Actor:** user in group
> \_Outsource Work Type Category* > **Requires:** `01-create`

## Pre-Condition

- **Record:** The category is not used as a parent of another category, and is not
  referenced by any **Work Type**.
- **Access:** User is in group _Outsource Work Type Category_.

## Flow

1. Open the **Outsource Work > Configuration > Work Category Types** menu.
2. Select one or more records to delete (check the checkbox).
3. Click **Action** > **Delete**.
4. Click **OK** to confirm.

## Post-Condition

- The selected records are permanently removed from the system.
