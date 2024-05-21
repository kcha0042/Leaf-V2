// ReportData.ts

export interface Report {
    name: string;
    date: Date;
    creator: string;
    type: string;
}

// Function to generate a random date within the last two months
const getRandomDateLastTwoMonths = (): Date => {
    const today = new Date();
    const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());
    const randomTime = twoMonthsAgo.getTime() + Math.random() * (today.getTime() - twoMonthsAgo.getTime());
    return new Date(randomTime);
};

// Array of report data with random dates from the last two months
const reports: Report[] = [
    {
        name: "Report_1_Title",
        date: getRandomDateLastTwoMonths(),
        creator: "admin",
        type: "Quick Report",
    },
    {
        name: "Report_2_Title",
        date: getRandomDateLastTwoMonths(),
        creator: "admin",
        type: "Custom Report",
    },
    {
        name: "Report_3_Title",
        date: getRandomDateLastTwoMonths(),
        creator: "admin",
        type: "Full Report",
    },
    {
        name: "Report_4_Title",
        date: getRandomDateLastTwoMonths(),
        creator: "admin",
        type: "Custom Report",
    },
    {
        name: "Report_5_Title",
        date: getRandomDateLastTwoMonths(),
        creator: "admin",
        type: "Quick Report",
    },
    {
        name: "Report_6_Title",
        date: getRandomDateLastTwoMonths(),
        creator: "admin",
        type: "Full Report",
    },
];

export default reports;
