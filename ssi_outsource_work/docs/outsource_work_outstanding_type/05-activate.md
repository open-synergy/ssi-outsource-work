# Activate Outsource Work Outstanding Type

> **Module:** `ssi_outsource_work`
>
> **Model:** `outsource_work_outstanding_type`
>
> **Menu:** Outsource Work > Configuration > Outstanding Types
>
> **Actor:** user in group _Outsource Work Outstanding Type_
>
> **Active:** `false` → `true`
>
> **Requires:** `04-deactivate`

## Pre-Condition

- **Record:** The record is currently archived.
- **Access:** User is in group _Outsource Work Outstanding Type_.

## Flow

1. Open the **Outsource Work > Configuration > Outstanding Types** menu.
2. Enable the **Archived** filter in the search bar.
3. Select one or more records to reactivate (check the checkbox).
4. Click **Action** > **Unarchive**.

## Post-Condition

- The records are restored and appear again in the default list view.
- The records can be selected as a **Type** on new **Outsource Work
  Outstanding**/**Outsource Work Outstanding Batch** documents.
