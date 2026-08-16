# Activate Outsource Work Type Category

> **Module:** ssi_outsource_work
>
> **Model:** `outsource_work_type_category`
>
> **Menu:** Outsource Work > Configuration > Work Category Types
>
> **Actor:** user in group _Outsource Work Type Category_
>
> **Active:** `false` → `true`
>
> **Requires:** `04-deactivate`

## Pre-Condition

- **Record:** The record is currently archived.
- **Access:** User is in group _Outsource Work Type Category_.

## Flow

1. Open the **Outsource Work > Configuration > Work Category Types** menu.
2. Enable the **Archived** filter in the search bar.
3. Select one or more records to reactivate (check the checkbox).
4. Click **Action** > **Unarchive**.

## Post-Condition

- The records are restored and appear again in the default list view.
- The records can be selected as a **Category** on new **Work Types**.
