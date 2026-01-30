export const monthlySpendingData = [
    { month: "Jan", amount: 2400 },
    { month: "Feb", amount: 1398 },
    { month: "Mar", amount: 3800 },
    { month: "Apr", amount: 3908 },
    { month: "May", amount: 2800 },
    { month: "Jun", amount: 3200 },
];

export const statCardsData = [
    {
        id: 1,
        title: "Total Expenses This Month",
        value: "$2,700.00",
        change: "+5.2% from last month",
        changeType: "positive",
        icon: "Wallet"
    },
    {
        id: 2,
        title: "Avg Daily",
        value: "$89.00",
        change: "-2.1% from last month",
        changeType: "negative",
        icon: "TrendingUp"
    },
    {
        id: 3,
        title: "Total Transactions",
        value: "40",
        change: "+2 from last month",
        icon: "CreditCard"
    },
    {
        id: 4,
        title: "Family Members",
        value: "4",
        change: "all Active",
        icon: "Users"
    }
]

export const recentExpensesData = [
  { id: "1", name: "Walmart Supermarket", amount: 125.50, date: "2026-01-22", category: "Shopping", member: "Dad" },
  { id: "2", name: "Shell Gas Station", amount: 45.00, date: "2026-01-21", category: "Transport", member: "Mom" },
  { id: "3", name: "Netflix", amount: 15.99, date: "2026-01-15", category: "Entertainment", member: "Dad" },
  { id: "4", name: "Whole Foods", amount: 89.75, date: "2026-01-14", category: "Food", member: "Mom" },
  { id: "5", name: "Electric Company", amount: 120.00, date: "2026-01-12", category: "Utilities", member: "Dad" },
];


export const familyMembersData = [
  { name: "Dad", avatar: "👨", totalSpent: 1250, lastExpense: "Walmart - $125.50", trend: "up" , trendValue: "+12%" },
  { name: "Mom", avatar: "👩", totalSpent: 980, lastExpense: "Whole Foods - $89.75", trend: "down" , trendValue: "-8%" },
  { name: "Alex", avatar: "👦", totalSpent: 320, lastExpense: "Steam Games - $29.99", trend: "up" , trendValue: "+5%" },
  { name: "Emma", avatar: "👧", totalSpent: 150, lastExpense: "Books - $24.99", trend: "down" , trendValue: "-15%" },
];

export const benefits = [
  "Single account for the whole family",
  "No manual data entry with invoice OCR",
  "Monthly and yearly spending insights",
  "Privacy-first - invoice images never stored",
  "Member-wise expense breakdown",
  "Simple and intuitive interface",
];