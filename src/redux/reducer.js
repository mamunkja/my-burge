import * as actionTypes from './actionTypes';

const INGREDIENT_PRICE = {
    salad: 20,
    cheese: 40,
    meat: 90,
    FIXED: 80
}

const INITIAL_STATE = {
    ingredients: [
        { type: "salad", amount: 0 },
        { type: "cheese", amount: 0 },
        { type: "meat", amount: 0 }
    ],
    orders: [],
    ordersLoading: true,
    orderErr: false,
    totalPrice: INGREDIENT_PRICE.FIXED,
    purchasable: false,
    token: null,
    userId: null,
    authLoading: false,
    authFailedMsg: null
}

export const reducer = (state = INITIAL_STATE, action) => {
    const ingredient = [...state.ingredients];
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            for (let item of ingredient) {
                if (item.type === action.payload) {
                    item.amount++;
                }
            }
            return {
                ...state,
                ingredients: ingredient,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload]
            }
        case actionTypes.REMOVE_INGREDIENT:
            let newPrice;

            for (let item of ingredient) {
                if (item.type === action.payload) {
                    if (item.amount > 0) {
                        item.amount--;
                        newPrice = state.totalPrice - INGREDIENT_PRICE[action.payload];
                        break;
                    } else {
                        newPrice = state.totalPrice;
                    }
                }
            }
            return {
                ...state,
                ingredients: ingredient,
                totalPrice: newPrice
            }
        case actionTypes.UPDATE_PURCHASABLE:
            const sum = ingredient.reduce((sum, element) => {
                return sum + element.amount;
            }, 0);
            return {
                ...state,
                purchasable: sum > 0
            }
        case actionTypes.RESET_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    { type: "salad", amount: 0 },
                    { type: "cheese", amount: 0 },
                    { type: "meat", amount: 0 }
                ],
                totalPrice: INGREDIENT_PRICE.FIXED,
                purchasable: false,
            }
        case actionTypes.LOAD_ORDERS:
            let orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key
                });
            }
            return {
                ...state,
                orders: orders,
                ordersLoading: false
            }
        case actionTypes.ORDER_LOAD_FAILED:
            return {
                ...state,
                orderErr: true,
                ordersLoading: false,
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                authFailedMsg: null
            }
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                authFailedMsg: action.payload
            }
        default:
            return state;
    }
}