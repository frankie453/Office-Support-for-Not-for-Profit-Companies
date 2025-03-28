import { Report, ReportType } from "./types";

export const reportsExamples: Report[] = [
  {
    metadata: {
      id: 4,
      date: new Date(),
      type: ReportType.EMAILS,
    },
    content: {
      incoming: {
        total: 200,
        byWeek: [10, 40, 100, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 100 },
        ],
      },
      outcoming: {
        total: 300,
        byWeek: [10, 40, 200, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
    },
  },
  {
    metadata: {
      id: 4,
      date: new Date(),
      type: ReportType.CALLS,
    },
    content: {
      incoming: {
        total: 200,
        byWeek: [10, 40, 100, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 100 },
        ],
      },
      outcoming: {
        total: 300,
        byWeek: [10, 40, 200, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
    },
  },
  {
    metadata: {
      id: 1,
      date: (() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 3);
        return date;
      })(),
      type: ReportType.EMAILS,
    },
    content: {
      incoming: {
        total: 200,
        byWeek: [10, 40, 100, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 100 },
        ],
      },
      outcoming: {
        total: 300,
        byWeek: [10, 40, 200, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
    },
  },
  {
    metadata: {
      id: 1,
      date: (() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 3);
        return date;
      })(),
      type: ReportType.CALLS,
    },
    content: {
      incoming: {
        total: 200,
        byWeek: [10, 40, 100, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 100 },
        ],
      },
      outcoming: {
        total: 300,
        byWeek: [10, 40, 200, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
    },
  },
  {
    metadata: {
      id: 3,
      date: (() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date;
      })(),
      type: ReportType.EMAILS,
    },
    content: {
      incoming: {
        total: 200,
        byWeek: [10, 40, 100, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
      outcoming: {
        total: 300,
        byWeek: [10, 40, 200, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
    },
  },
  {
    metadata: {
      id: 3,
      date: (() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date;
      })(),
      type: ReportType.CALLS,
    },
    content: {
      incoming: {
        total: 200,
        byWeek: [10, 40, 100, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 100 },
        ],
      },
      outcoming: {
        total: 300,
        byWeek: [10, 40, 200, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
    },
  },
  {
    metadata: {
      id: 1,
      date: (() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 3);
        return date;
      })(),
      type: ReportType.EMAILS,
    },
    content: {
      incoming: {
        total: 200,
        byWeek: [10, 40, 100, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 100 },
        ],
      },
      outcoming: {
        total: 300,
        byWeek: [10, 40, 200, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
    },
  },
  {
    metadata: {
      id: 1,
      date: (() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 3);
        return date;
      })(),
      type: ReportType.CALLS,
    },
    content: {
      incoming: {
        total: 200,
        byWeek: [10, 40, 100, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 100 },
        ],
      },
      outcoming: {
        total: 300,
        byWeek: [10, 40, 200, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
    },
  },
  {
    metadata: {
      id: 2,
      date: (() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 2);
        return date;
      })(),
      type: ReportType.EMAILS,
    },
    content: {
      incoming: {
        total: 200,
        byWeek: [10, 40, 100, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 100 },
        ],
      },
      outcoming: {
        total: 300,
        byWeek: [10, 40, 200, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
    },
  },
  {
    metadata: {
      id: 2,
      date: (() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 2);
        return date;
      })(),
      type: ReportType.CALLS,
    },
    content: {
      incoming: {
        total: 200,
        byWeek: [10, 40, 100, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 100 },
        ],
      },
      outcoming: {
        total: 300,
        byWeek: [10, 40, 200, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
    },
  },
  {
    metadata: {
      id: 1,
      date: (() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 3);
        return date;
      })(),
      type: ReportType.EMAILS,
    },
    content: {
      incoming: {
        total: 200,
        byWeek: [10, 40, 100, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 100 },
        ],
      },
      outcoming: {
        total: 300,
        byWeek: [10, 40, 200, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
    },
  },
  {
    metadata: {
      id: 1,
      date: (() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 3);
        return date;
      })(),
      type: ReportType.CALLS,
    },
    content: {
      incoming: {
        total: 200,
        byWeek: [10, 40, 100, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 100 },
        ],
      },
      outcoming: {
        total: 300,
        byWeek: [10, 40, 200, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
    },
  },
  {
    metadata: {
      id: 1,
      date: (() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 3);
        return date;
      })(),
      type: ReportType.EMAILS,
    },
    content: {
      incoming: {
        total: 200,
        byWeek: [10, 40, 100, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 100 },
        ],
      },
      outcoming: {
        total: 300,
        byWeek: [10, 40, 200, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
    },
  },
  {
    metadata: {
      id: 1,
      date: (() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 3);
        return date;
      })(),
      type: ReportType.CALLS,
    },
    content: {
      incoming: {
        total: 200,
        byWeek: [10, 40, 100, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 100 },
        ],
      },
      outcoming: {
        total: 300,
        byWeek: [10, 40, 200, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
    },
  },
  {
    metadata: {
      id: 1,
      date: (() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 3);
        return date;
      })(),
      type: ReportType.EMAILS,
    },
    content: {
      incoming: {
        total: 200,
        byWeek: [10, 40, 100, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 100 },
        ],
      },
      outcoming: {
        total: 300,
        byWeek: [10, 40, 200, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
    },
  },
  {
    metadata: {
      id: 1,
      date: (() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 3);
        return date;
      })(),
      type: ReportType.CALLS,
    },
    content: {
      incoming: {
        total: 200,
        byWeek: [10, 40, 100, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 100 },
        ],
      },
      outcoming: {
        total: 300,
        byWeek: [10, 40, 200, 50],
        byDay: Array(31).fill(0),
        byCategory: [
          { label: "category1", value: 35 },
          { label: "category2", value: 45 },
          { label: "category3", value: 20 },
          { label: "category4", value: 200 },
        ],
      },
    },
  },
];

