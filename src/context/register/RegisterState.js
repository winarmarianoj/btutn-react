import React, {useReducer} from "react";

import RegisterContext from "./RegisterContext";
import RegisterReducer from "./RegisterReducer";

import { GET_REGISTER } from "../Types";

const RegisterState = (props) => {
    const initialState = {
        newPerson = null,
        successful = null,
        message = null,
        form = useRef(),
        checkBtn = useRef(),
    };



}

export default RegisterState;