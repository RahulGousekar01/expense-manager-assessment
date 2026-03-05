import dayjs from "dayjs";

export interface Organization {
  id: string;
  name: string;
  baseCurrency: string;
}

//example for organization object
// {
//  id: "org1",
//  name: "Global Finance Ltd",
//  baseCurrency: "USD"
// }

export interface Subsidiary {
  id: string;
  name: string;
  currency: string;
}

//example for subsidiary object
// {
//  id: "sub1",
//  name: "India Branch",
//  currency: "INR"
// }

export interface Expense {
  id: string;
  subsidiaryId: string;

  name: string;
  category: string;

  amount: number;
  currency: string;

  exchangeRate: number;

  date: string;
  notes?: string;
}

export type ExpenseCategory =
  | "Travel"
  | "Software"
  | "Hardware"
  | "Food"
  | "Other";

export interface OrganizationFormValues {
  name: string;
  baseCurrency: string;
}

export interface ExpenseFormValues {
  name: string;
  category: string;
  amount: number;
  date: dayjs.Dayjs;
  notes?: string;
}
