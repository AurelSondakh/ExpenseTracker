import { URL_GET_PAIR } from "../../Configs/GlobalUrl"
import * as ActionTypes from '../Constant/Types'
import { Dispatch } from 'redux';

export const GetPair = (baseCode: string, targetCode: string, amount: string) => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: ActionTypes.GET_PAIR_REQUEST });
       fetch(`${URL_GET_PAIR}/${baseCode}/${targetCode}/${amount}`, {
           method: "GET",
           redirect: "follow"
       }).then(response => {
           return response.json()
       }).then(data => {
           console.log("GET_ALL_PAIR: ", data);
           dispatch({
               type: ActionTypes.GET_PAIR_SUCCESS,
               payload: data
           })
       }).catch(data => {
           console.log("ERROR", data.message)
           dispatch({
               type: ActionTypes.GET_PAIR_FAILURE,
               error: data.message,
           })
       })
   }
}