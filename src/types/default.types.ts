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
  accountabilityStatus: 'OPEN' | 'CLOSED' | 'FINISHED';
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
