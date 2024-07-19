import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    employees: [],
    status: null,
    error: null,
};

const API_BASE_URL = 'http://10.10.103.57:8082/api/v1/employee';

export const fetchEmployees = createAsyncThunk(
    'employee/fetchEmployees',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const createEmployee = createAsyncThunk(
    'employee/createEmployee',
    async (employee, { rejectWithValue }) => {
        try {
            console.log('Sending employee data:', employee);
            const formData = new FormData();
            formData.append("employee", JSON.stringify(employee));
            formData.append("image", null);  // Ganti `null` dengan file gambar jika ada

            const res = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive"
                },
                body: formData
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const data = await res.json();
            console.log("Response data:", data);

            return data.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const updateEmployee = createAsyncThunk(
    'employee/updateEmployee',
    async (employee, { rejectWithValue }) => {
        try {
            console.log('Updating employee data:', employee);
            const formData = new FormData();
            formData.append("employee", JSON.stringify(employee));
            formData.append("image", null);  // Ganti `null` dengan file gambar jika ada

            const res = await fetch(`${API_BASE_URL}/${employee.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive"
                },
                body: formData
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const data = await res.json();
            console.log("Response data:", data);

            return data.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            return id;  // Mengembalikan ID karyawan yang dihapus
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const employeeSlice = createSlice({
    name: 'employee',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.employees = action.payload.data;
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.employees.push(action.payload);
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.employees.findIndex(employee => employee.id === action.payload.id);
                if (index !== -1) {
                    state.employees[index] = action.payload;
                }
                state.status = 'succeeded';
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter(emp => emp.id !== action.payload);
                state.status = 'succeeded';
            })
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.error = action.payload;
                    state.status = 'failed';
                }
            );
    },
});

export default employeeSlice.reducer;
