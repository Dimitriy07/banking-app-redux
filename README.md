# 🏦 React-Redux Banking App (Study Application)

A simple banking application built with React and Redux Toolkit, allowing users to create a customer profile, perform account operations such as deposits, withdrawals, loan requests, and view account balances.

## 🚀 Features

- Create a customer profile with a full name and national ID
- Perform account operations (deposit, withdraw, request a loan, pay loan)
- Fetch currency conversion rates for deposits in different currencies
- Manage account balance and loan details
- Redux state management using Redux Toolkit

## 📂 Project Structure

```
📦 react-redux-banking-app
├── src
│   ├── features
│   │   ├── accounts
│   │   │   ├── AccountOperations.js
│   │   │   ├── BalanceDisplay.js
│   │   │   ├── accountSlice.js
│   │   ├── customers
│   │   │   ├── CreateCustomer.js
│   │   │   ├── Customer.js
│   │   │   ├── customerSlice.js
│   ├── App.js
│   ├── store.js
│   ├── index.js
│   ├── index.css
└── README.md
```

## 🛠️ Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/react-redux-banking-app.git
   cd react-redux-banking-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## 🏗️ State Management (Redux Toolkit)

The application uses Redux Toolkit for managing state. The store combines two reducers:

- **Customer Slice (`customerSlice.js`)**
  - `createCustomer(fullName, nationalID)`: Creates a new customer profile.
  - `updateName(fullName)`: Updates the customer's name.

- **Account Slice (`accountSlice.js`)**
  - `deposit(amount, currency)`: Deposits money, with optional currency conversion.
  - `withdraw(amount)`: Withdraws money.
  - `requestLoan(amount, purpose)`: Requests a loan (if none exists).
  - `payLoan()`: Pays off an existing loan.

## 📜 How It Works

1. When no customer exists, the `CreateCustomer` component allows a user to input their details.
2. Once a customer is created, the app displays account operations (`deposit`, `withdraw`, `request loan`, `pay loan`) and the current balance.
3. Deposits in different currencies are converted using an API call (`https://api.frankfurter.dev`).

## 🏆 Future Enhancements

- UI improvements with better styling
- Persistent state using localStorage or a backend
- More advanced account features (transaction history, overdraft, etc.)


