import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account", // name of a slice
  initialState, // name of initial state,
  reducers: {
    // name of one reducer for each state (instead of action creator function)
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },

    requestLoan: {
      // if we need to pass more then one argument to our reducer we need to prepare object of payload with prepare method and reducer
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },

    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

console.log(accountSlice);

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return function (dispatch, getState) {
    //API call
    dispatch({ type: "account/convertingCurrency" });
    return fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
    )
      .then((res) => res.json())
      .then((data) => {
        return (amount * data.rates["USD"]).toFixed(2);
      })
      .then((convertedAmount) => {
        // dispatch the result to return action
        dispatch({ type: "account/deposit", payload: +convertedAmount });
      });
  };
}

export default accountSlice.reducer;

// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.loanPurpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: +state.balance - +state.loan,
//       };
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };
//   return function (dispatch, getState) {
//     //API call
//     dispatch({ type: "account/convertingCurrency" });
//     return fetch(
//       `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         return (amount * data.rates["USD"]).toFixed(2);
//       })
//       .then((convertedAmount) => {
//         // dispatch the result to return action
//         dispatch({ type: "account/deposit", payload: +convertedAmount });
//       });
//   };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount: amount, loanPurpose: purpose },
//   };
// }
// export function payLoan() {
//   return { type: "account/payLoan" };
// }
