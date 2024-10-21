import { URL_GET_CURRENCY } from "../../Configs/GlobalUrl"
import * as ActionTypes from '../Constant/Types'
import { Dispatch } from 'redux';

export const GetAllCurrency = () => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: ActionTypes.GET_CURRENCY_REQUEST });
       fetch(`${URL_GET_CURRENCY}`, {
           method: "GET",
           redirect: "follow"
       }).then(response => {
           return response.json()
       }).then(data => {
           console.log("GET_ALL_CURRENCY: ", data);
           dispatch({
               type: ActionTypes.GET_CURRENCY_SUCCESS,
               payload: data
           })
       }).catch(data => {
           console.log("ERROR", data.message)
           dispatch({
               type: ActionTypes.GET_CURRENCY_FAILURE,
               error: data.message,
           })
       })
   }
}