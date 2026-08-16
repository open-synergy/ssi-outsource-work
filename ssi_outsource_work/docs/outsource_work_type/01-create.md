# Create Outsource Work Type

> **Module:** ssi_outsource_work
>
> **Model:** `outsource_work_type`
>
> **Menu:** Outsource Work > Configuration > Work Types
>
> **Actor:** user in group _Outsource Work Type_
>
> **State:** `—` → `draft`
>
> **Requires:** `outsource_work_type_category/01-create`

## Pre-Condition

- **Data:** At least one **Work Category Type** exists.
- **Access:** User is in group _Outsource Work Type_.

## Flow

1. Open the **Outsource Work > Configuration > Work Types** menu.
2. Click the **New** button. **(14.0: "Create")**
3. Fill in the required fields:
   - **Name**: name of the work type.
   - **Code**: short code identifying the work type.
   - **Category**: the **Work Category Type** this type belongs to.
   - **Product**: the product this outsource work is priced and invoiced against.
4. Click **Save**.

## Post-Condition

- A new active record is created.
