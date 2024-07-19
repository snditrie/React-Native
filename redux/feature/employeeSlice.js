import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axiosInstance from "../../api/axiosInstance"
import axios from "axios"

const initialState = {
    
    employees: [],
    status: null,
    error: null
}

export const fetchEmployees = createAsyncThunk(
    'employee/fetchEmployees',
    async (_, {rejectedWithValue}) => {
        try {
            const response = await axiosInstance.get('/employee')
            return response.data
        } catch (e) {
            return rejectedWithValue(error.response.data)
        }
    }
)

export const createEmployee = createAsyncThunk(
    'employee/createEmployee',
    async (employee, {rejectedWithValue}) => {
        try {
            console.log('Sending employee data:', employee);
            // const response = await axiosInstance.post('/employee', employee, {
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })

            const formData = new FormData()
            formData.append("employee", JSON.stringify(employee))
            formData.append("image", null)

            const res = await fetch("http://10.10.103.57:8082/api/v1/employee", {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive"
                },
                body: formData
            })

            console.log("Status kita saat ini: ", res)

            const data = res.json()

            console.log("Masuk GOBLOK nih data: ", data)

            return data.data
        } catch (e) {
            return rejectedWithValue(error.response.data)
        }
    }
)

// export const updateEmployee = createAsyncThunk(
//     'employee/updateEmployee',
//     async (employee, {rejectedWithValue}) => {
//         try {
//             const response = await axiosInstance.put('/employee', employee)
//             return response.data
//         } catch (e) {
//             return rejectedWithValue(error.response.data)
//         }
//     }
// )

export const updateEmployee = createAsyncThunk(
    'employee/updateEmployee',
    async (employee, { rejectWithValue }) => {
        try {
            console.log('Updating employee data:', employee)
            const response = await axiosInstance.put(`/employee/${employee.id}`, employee, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',
    async (id, {rejectedWithValue}) => {
        try {
            const response = await axiosInstance.delete(`/employee/${id}` )
            return response.data
        } catch (e) {
            return rejectedWithValue(error.response.data)
        }
    }
)


const employeeSlice = createSlice({
    name: 'employee',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.employees = action.payload.data
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.employees.push(action.payload)
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.employees.findIndex(employee => employee.id === action.payload.id)
                if (index !== -1) {
                    state.employees[index] = action.payload
                }
                state.status = 'succeeded'
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter((emp) => emp.id !== action.meta.arg)
                state.status = 'succeeded'
            })
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                  state.error = action.payload;
                  state.status = 'failed';
                }
              );

    }

})

export default employeeSlice.reducer