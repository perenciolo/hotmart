export type Person = {
  id: number | null;
  name: string | null;
  email: string | null;
};
export type CostCenter = {
  id: number;
  manager: Person;
  name: string;
  percentage: number;
  reviser: Person;
  talentPartner: Person;
};

export type AccountabilityExtraInfo = {
  amountOfPeople: number;
  amountRequested: number | null;
  arrivalOn: Date | null;
  budgetForBreakfast: boolean | null;
  departureOn: Date | null;
  destination: string | null;
  eventDate: Date | null;
  requestedCurrency: string | null;
};

export type Currency = {
  id: number;
  name: string;
  code: string;
  symbol: string;
};

export type SidebarContent = {
  accountabilityId: number;
  accountabilityStatus: 'OPEN' | 'FINISHED' | 'PENDING';
  currency: Currency;
  declared: number;
  approved: number;
  received: number;
  returned: number;
  balance: number;
  updatedOn: Date;
};

export type Sort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

export type TimelineItem = {
  id: number,
  cardDate: 1585710000000,
  cardType: 'EXPENSE'|'EVALUATION'|'ACCOUNTABILITY_SUBMITTED'|'ACCOUNTABILITY_CREATED'
  expenseId: number
  invoiceDate: Date|null
  expenseTypeId: number
  expenseTypeCode: string
  expenseTypeIcon: string
  currencyId: number,
  currencyCode: string,
  currencySymbol: string,
  resourceUrl: string
  contentType: string
  amountSpent: number
  amountTotal: number
  notes: string
  status: 'PENDING'|'APPROVED'|'OPEN'
  updatedOn: Date|null
  expenseEvaluation: null
};
