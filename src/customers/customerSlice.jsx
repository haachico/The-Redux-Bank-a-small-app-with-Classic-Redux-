//in slice, always maintain initialState, reducer function and action creators

//initial state
const initialState = {
  fullName: "",
  natioanalID: "",
  createdAt: ""
};

//reducer
const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        natioanalID: action.payload.nationalID,
        createdAt: action.payload.createdAt
      };

    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload
      };

    default:
      return state;
  }
};

export default customerReducer;
//this reducer function will be exported to store where i will be maintained in a rooot reducer with all other reducers, if any

//action creators

export const createCustomer = (fullName, nationalID) => {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName: fullName,
      nationalID: nationalID,
      createdAt: new Date().toISOString()
    }
  };
};
