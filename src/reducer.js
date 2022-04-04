import { INCREASE, DECREASE, CLEAR_CART, REMOVE, GET_TOTALS } from "./actions";

function reducer(state, action) {
  console.log(action);
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  // Increase reducer

  if (action.type === INCREASE) {
    let tempCart = state.cart.map((cartItem) => {
      console.log(cartItem, "ccccccc");
      if (cartItem.id === action.payload.id) {
        cartItem = { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }

  // Decrease reducer

  if (action.type === DECREASE) {
    let tempCart = [];
    if (action.payload.amount === 1) {
      console.log(`the amount is one`);
      tempCart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
    } else {
      tempCart = state.cart.map((cartItem) => {
        console.log(cartItem, "ccccccc");
        if (cartItem.id === action.payload.id) {
          cartItem = { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      });
    }
    return { ...state, cart: tempCart };
  }

  // Remove reducer

  if (action.type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id),
    };
  }

  // Get totals reducer

  if (action.type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;

        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = total.toFixed(1);
    return { ...state, total, amount };
  }

  return state;
}

export default reducer;
