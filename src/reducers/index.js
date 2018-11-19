import AppReducer from './appReducer';
import { routerReducer } from "react-router-redux";

export default {
    app: AppReducer,
    router: routerReducer
};