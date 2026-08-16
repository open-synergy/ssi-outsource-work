# Create Outsource Work Type Category

> **Module:** ssi_outsource_work
>
> **Model:** `outsource_work_type_category`
>
> **Menu:** Outsource Work > Configuration > Work Category Types
>
> **Actor:** user in group _Outsource Work Type Category_
>
> **State:** `—` → `draft`

## Pre-Condition

- **Access:** User is in group _Outsource Work Type Category_.

## Flow

1. Open the **Outsource Work > Configuration > Work Category Types** menu.
2. Click the **New** button. **(14.0: "Create")**
3. Fill in the required fields:
   - **Name**: name of the category.
   - **Code**: short code identifying the category.
   - **Parent**: parent category, when this category is a child of another one.
4. Click **Save**.

## Post-Condition

- A new active record is created.
