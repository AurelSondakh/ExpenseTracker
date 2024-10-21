import * as actionTypes from '../Constant/Types'

const initialState = {
    currencyList: [],
    conversionRate: 0,
    conversionResult: 0,
    currencySpinner: false,
}

export const CurrencyReducer = (state = initialState, action: { type: any; payload: { supported_codes: any; conversion_rate: any; conversion_result: any; }; }) => {
  switch (action.type) {
    // ============= GET_CURRENCY ===================
    case actionTypes.GET_CURRENCY_REQUEST:
        return {
            ...state,
            currencySpinner: true,
            errorModal: false
        };
    case actionTypes.GET_CURRENCY_SUCCESS:
        return {
            ...state,
            currencyList: action.payload.supported_codes,
            currencySpinner: false,
            errorModal: false
        };
    case actionTypes.GET_CURRENCY_FAILURE:
        return {
            ...state,
            currencySpinner: false,
            errorModal: true
        };
    // ============= GET_PAIR ===================
    case actionTypes.GET_PAIR_REQUEST:
        return {
            ...state,
            currencySpinner: true,
            errorModal: false
        };
    case actionTypes.GET_PAIR_SUCCESS:
        return {
            ...state,
            conversionRate: action.payload.conversion_rate,
            conversionResult: action.payload.conversion_result,
            currencySpinner: false,
            errorModal: false
        };
    case actionTypes.GET_PAIR_FAILURE:
        return {
            ...state,
            currencySpinner: false,
            errorModal: true
        };
    default:
        return state;
  }
};