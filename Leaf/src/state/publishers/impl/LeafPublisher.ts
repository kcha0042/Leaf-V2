import { configureStore, createSlice } from "@reduxjs/toolkit";

/**
 * A redux wrapper for managing application-wide state using the publisher-subscriber pattern.
 * To only be initialised within StateManager.
 */
class LeafPublisher {

    private readonly slice = createSlice({
        name: 'LeafPublisher',
        initialState: {
            value: 0
        },
        reducers: {
            newForm: state => {
                state.value = (state.value + 1)%10;
            }
        }
    })

    private readonly publisher = configureStore({
        reducer: this.slice.reducer
    })

    public subscribe(callback: () => void) {
        this.publisher.subscribe(callback);
    }

    public publish() {
        this.publisher.dispatch(this.slice.actions.newForm());
    }

}

export default LeafPublisher;