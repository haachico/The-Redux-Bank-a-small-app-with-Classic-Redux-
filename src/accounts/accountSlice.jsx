//initial State

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: ""
};

//reducer fn

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload
      };

    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload
      };

    case "account/requestForLoan":
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose
      };

    case "account/paybackLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: "",
        purpose: ""
      };

    default:
      return state;
  }
};

export default accountReducer;

///

//action crearors

export const deposit = (amount, currency) => {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount
    };

  //else Thunk comes into picture here

  //actionCreators ==> dispatch==> store (Normally)

  //actionCreators ==> dispatch ==> Thunk(middleWare)==> store (When there is async work, like eg fetching from API )

  return async function (dispatch, getState) {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();

    const converted = data.rates.USD;
    dispatch({
      type: "account/deposit",
      payload: converted
    });
  };
};

export const withdraw = (amount) => {
  return {
    type: "account/withdraw",
    payload: amount
  };
};

export const requestForLoan = (amount, purpose) => {
  return {
    type: "account/requestForLoan",
    payload: {
      amount: amount,
      purpose: purpose
    }
  };
};

export const paybackLoan = () => {
  return {
    type: "account/paybackLoan"
  };
};
