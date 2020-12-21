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
