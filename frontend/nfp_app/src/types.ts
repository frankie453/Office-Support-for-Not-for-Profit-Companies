export type Report = {
  metadata: {
    id: number;
    date: Date;
    type: ReportType;
  };
  content: ReportContentCalls | ReportContentEmails | ReportContentInPerson;
};

export type ReportContentCalls = {
  total: number;
  byDay: number[];
  byIssue: { label: string; value: number }[];
  byEmployee: { label: string; value: number }[];
};

export type ReportContentEmails = {
  incoming: {
    total: number;
    byWeek: number[];
    byCategory: { label: string; value: number }[];
  };

  outcoming: {
    total: number;
    byWeek: number[];
    byCategory: { label: string; value: number }[];
  };
};

export type ReportContentInPerson = {
  incoming: {
    total: number;
    byWeek: number[];
    byCategory: { label: string; value: number }[];
  };
};

export enum ReportType {
  CALLS,
  EMAILS,
  INPERSON,
}
