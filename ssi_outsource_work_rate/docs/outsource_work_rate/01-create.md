# Create Outsource Work Rate

> **Module:** `ssi_outsource_work_rate`\
> **Model:** `outsource_work_rate`\
> **Menu:** Outsource Work > Outsource Work Rates\
> **Actor:** user in group _Outsource Work Rate — User_\
> **State:** `—` → `draft`

## Pre-Condition

- **Data:** The **Partner** to bill exists as a `res.partner` record that is not a
  company and has no parent company.
- **Access:** User is in group _Outsource Work Rate — User_ (has create rights on
  Outsource Work Rate).

## Flow

1. Open the **Outsource Work > Outsource Work Rates** menu.
2. Click the **New** button. **(14.0: "Create")**
3. Fill in the required fields:
   - **Partner**: the partner this rate applies to.
   - **Date**: the reference date of the rate.
   - **Start Date**: the date the rate becomes effective.
4. On the **Rate** tab, add one or more rows with **Product** and **Price List** to
   define which product uses which price list under this rate.
5. Click **Save**.

## Post-Condition

- A new record is created in **Draft** status.
- The document number shows **/** until the record reaches **Ready to Start** status.
