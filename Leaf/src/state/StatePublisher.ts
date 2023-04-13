import { configureStore, createSlice } from "@reduxjs/toolkit";

class StatePublisher {

    /**
     * THIS IS A DEMO PROPERTY
     */
    static formSlice = createSlice({
        name: 'form',
        initialState: {
            value: 0
        },
        reducers: {
            newForm: state => {
                state.value = (state.value + 1)%10
            }
        }
    })

    /**
     * THIS IS A DEMO PROPERTY
     */
    static formPublisher = configureStore({
        reducer: StatePublisher.formSlice.reducer
    })

}

export default StatePublisher
export const { newForm } = StatePublisher.formSlice.actions