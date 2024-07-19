import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/authSlice.js"
import employeeReducer from "./feature/employeeSlice.js"

export const store = configureStore({
    reducer: {
         auth: authReducer,
        employee: employeeReducer
    }
})