export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  endpoints: {
    auth: {
      login: "/auth/login",
      logout: "/auth/logout",
      register: "/auth/register",
      me: "/auth/me",
    },
    transactions: "/transactions",
    categories: "/categories",
  },
};

export const APP_CONFIG = {
  name: "FinanzApp",
  defaultCurrency: "$",
  itemsPerPage: 10,
};
