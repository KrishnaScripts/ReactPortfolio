import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { userData, crudInitial } from "../../utils/interface"

const initialState: crudInitial = {
    registeredUsers: [],
}

const crudSlice = createSlice({
    name: "crud",
    initialState,
    // extraReducers: {}, // for handling api response
    reducers: {
        setUser: (state, { payload }: PayloadAction<userData>) => {
            if(payload.id === undefined) {
                const date = new Date();
                payload = { ...payload, id: date.getTime() }
                state.registeredUsers = [...state.registeredUsers, payload]
            } else {
                state.registeredUsers = state.registeredUsers.map((data: any) => {
                    if(data.id === payload.id) {
                        return payload
                    }
                    return data
                })
            }
        },
        deleteUser: (state, { payload }: PayloadAction<any>) => {
            state.registeredUsers = state.registeredUsers.filter((data: any) => data.id !== payload)
        }
    },
})


export const { setUser, deleteUser } = crudSlice.actions

export default crudSlice.reducer