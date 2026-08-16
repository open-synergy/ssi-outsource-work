# Create Outsource Work Outstanding Type

> **Module:** ssi_outsource_work
>
> **Model:** `outsource_work_outstanding_type`
>
> **Menu:** Outsource Work > Configuration > Outstanding Types
>
> **Actor:** user in group _Outsource Work Outstanding Type_
>
> **State:** `—` → `draft`

## Pre-Condition

- **Access:** User is in group _Outsource Work Outstanding Type_.

## Flow

1. Open the **Outsource Work > Configuration > Outstanding Types** menu.
2. Click the **New** button. **(14.0: "Create")**
3. Fill in the required fields:
   - **Name**: name of the outstanding type.
   - **Code**: short code identifying the outstanding type.
   - **Payable Journal**: default journal used when posting the payable move of
     outstandings of this type.
   - **Payable Account**: default account used for the payable line of outstandings of
     this type.
4. Click **Save**.

## Post-Condition

- A new active record is created.
