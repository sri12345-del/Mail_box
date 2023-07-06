import { createSlice } from "@reduxjs/toolkit"

const authslice = createSlice({
    name: "auth",
    initialState: { token: "" },
    reducers: {
        addtoken(state, action) {
            state.token = action.payload
        },
        removetoken(state) {
            state.token=""
        }
       
    }
})

export const authaction = authslice.actions

export default authslice