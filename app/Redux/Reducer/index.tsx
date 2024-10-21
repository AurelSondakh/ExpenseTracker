import {combineReducers} from "redux"
import { CurrencyReducer } from "./Currency";

const rootReducer = combineReducers({
    currency: CurrencyReducer
});


export default rootReducer;