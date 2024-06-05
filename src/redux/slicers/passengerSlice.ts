import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import instance from "../../utils/api";

export interface passengerData {
    name: string,
    trips: number
}

export interface PassengerState {
    passengerData: passengerData[];
    loading: boolean;
}

const initialState: PassengerState = {
    passengerData: [],
    loading: false,
}


export const getPassenger: any = createAsyncThunk(
    'photos/getPhotos',
    async (data: any) => {
        const { page, size } = data
        // const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=${size}`)
        const response = await instance.get(`/passenger?page=${page}&size=${size}`)
        return response
    }
)

const PassengerSlice = createSlice({
    name: "passenger",
    initialState,
    extraReducers: {
        [getPassenger.pending]: (state: any) => {
            state.loading = true
        },
        [getPassenger.fulfilled]: (state: any, action) => {
            state.passengerData = action.payload.data.map((data: passengerData) => {
                return { name: data.name, trips: data.trips }
            })
            state.loading = false
        },
        [getPassenger.rejected]: (state: any) => {
            state.isLoading = false
        },
    },
    reducers: {}
})

export default PassengerSlice.reducer