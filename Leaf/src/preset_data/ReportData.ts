// ReportData.ts

export interface Report {
    name: string;
    date: Date;
    creator: string;
    type: string;
}

const reports: Report[] = [
    {
        name: "Report_1_Title",
        date: new Date(),
        creator: "admin",
        type: "Quick Report",
    },
    {
        name: "Report_2_Title",
        date: new Date(),
        creator: "admin",
        type: "Custom Report",
    },
    {
        name: "Report_3_Title",
        date: new Date(),
        creator: "admin",
        type: "Full Report",
    },
    {
        name: "Report_4_Title",
        date: new Date(),
        creator: "admin",
        type: "Custom Report",
    },
    {
        name: "Report_5_Title",
        date: new Date(),
        creator: "admin",
        type: "Quick Report",
    },
        {
        name: "Report_6_Title",
        date: new Date(),
        creator: "admin",
        type: "Full Report",
    },
];

export default reports;
