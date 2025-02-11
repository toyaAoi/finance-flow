const transactions = [
  {
    type: "income",
    amount: 1500,
    category: "Salary",
    time: new Date("2025-02-01T10:00:00Z"),
    notes: "Salary for February",
  },
  {
    type: "expense",
    amount: 200,
    category: "Groceries",
    time: new Date("2025-02-02T12:00:00Z"),
    notes: "Groceries shopping",
  },
  {
    type: "expense",
    amount: 50,
    category: "Utilities",
    time: new Date("2025-02-03T14:00:00Z"),
    notes: "Electricity bill",
  },
  {
    type: "expense",
    amount: 1200,
    category: "Rent",
    time: new Date("2025-02-04T09:00:00Z"),
    notes: "Monthly rent payment",
  },
  {
    type: "expense",
    amount: 300,
    category: "Transportation",
    time: new Date("2025-02-05T16:00:00Z"),
    notes: "Gas for the car",
  },
  {
    type: "expense",
    amount: 100,
    category: "Entertainment",
    time: new Date("2025-02-06T11:00:00Z"),
    notes: "Movie night",
  },
  {
    type: "income",
    amount: 200,
    category: "Salary",
    time: new Date("2025-02-07T10:00:00Z"),
    notes: "Freelance work payment",
  },
  {
    type: "expense",
    amount: 75,
    category: "Health & Fitness",
    time: new Date("2025-02-08T15:00:00Z"),
    notes: "Gym membership fee",
  },
  {
    type: "expense",
    amount: 60,
    category: "Clothing",
    time: new Date("2025-02-09T18:00:00Z"),
    notes: "New shirt purchase",
  },
  {
    type: "income",
    amount: 500,
    category: "Salary",
    time: new Date("2025-02-10T09:30:00Z"),
    notes: "Bonus received",
  },
  {
    type: "expense",
    amount: 150,
    category: "Education",
    time: new Date("2025-02-11T14:00:00Z"),
    notes: "Online course fee",
  },
  {
    type: "expense",
    amount: 90,
    category: "Miscellaneous",
    time: new Date("2025-02-12T17:00:00Z"),
    notes: "Office supplies",
  },
  {
    type: "income",
    amount: 300,
    category: "Salary",
    time: new Date("2025-02-13T11:00:00Z"),
    notes: "Side project payment",
  },
  {
    type: "expense",
    amount: 250,
    category: "Entertainment",
    time: new Date("2025-02-14T13:00:00Z"),
    notes: "Concert tickets",
  },
  {
    type: "expense",
    amount: 30,
    category: "Transportation",
    time: new Date("2025-02-15T19:00:00Z"),
    notes: "Bus fare",
  },
  {
    type: "income",
    amount: 600,
    category: "Salary",
    time: new Date("2025-02-16T10:00:00Z"),
    notes: "Payment for consulting services",
  },
  {
    type: "expense",
    amount: 45,
    category: "Health & Fitness",
    time: new Date("2025-02-17T16:00:00Z"),
    notes: "Yoga class fee",
  },
  {
    type: "expense",
    amount: 120,
    category: "Clothing",
    time: new Date("2025-02-18T12:00:00Z"),
    notes: "Winter jacket purchase",
  },
  {
    type: "income",
    amount: 350,
    category: "Salary",
    time: new Date("2025-02-19T09:00:00Z"),
    notes: "Affiliate marketing earnings",
  },
  {
    type: "expense",
    amount: 80,
    category: "Miscellaneous",
    time: new Date("2025-02-20T14:00:00Z"),
    notes: "Gift for a friend",
  },
  {
    type: "expense",
    amount: 150,
    category: "Groceries",
    time: new Date("2025-03-01T12:00:00Z"),
    notes: "Groceries shopping",
  },
  {
    type: "income",
    amount: 700,
    category: "Salary",
    time: new Date("2025-03-05T10:00:00Z"),
    notes: "Payment for freelance work",
  },
  {
    type: "expense",
    amount: 60,
    category: "Health & Fitness",
    time: new Date("2025-03-08T15:00:00Z"),
    notes: "Gym membership fee",
  },
];

const transactionCategories = [
  {
    name: "Salary",
    color: "#4CAF50", // Green
  },
  {
    name: "Groceries",
    color: "#FF9800", // Orange
  },
  {
    name: "Utilities",
    color: "#2196F3", // Blue
  },
  {
    name: "Rent",
    color: "#F44336", // Red
  },
  {
    name: "Transportation",
    color: "#9C27B0", // Purple
  },
  {
    name: "Entertainment",
    color: "#FFEB3B", // Yellow
  },
  {
    name: "Health & Fitness",
    color: "#3F51B5", // Indigo
  },
  {
    name: "Clothing",
    color: "#E91E63", // Pink
  },
  {
    name: "Education",
    color: "#8BC34A", // Light Green
  },
  {
    name: "Miscellaneous",
    color: "#607D8B", // Blue Grey
  },
];

const account = {
  name: "My Account",
  balance: 20310,
};

const user = {
  name: "John Doe",
  username: "johndoe",
  password: "password",
};

export { transactions, transactionCategories, account, user };
