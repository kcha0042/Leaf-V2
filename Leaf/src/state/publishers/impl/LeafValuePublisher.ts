import { Draft, PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

/**
 * A redux wrapper for managing application-wide state using the publisher-subscriber pattern.
 * The class contains the state value (generic type) to be read.
 * To only be initialised within StateManager.
 */
class LeafValuePublisher<Type> {
    private readonly slice;
    private readonly publisher;

    constructor(initialState: Type) {
        this.slice = createSlice({
            name: "LeafValuePublisher",
            initialState: {
                value: initialState,
            },
            reducers: {
                publishAction: (state, newValue: PayloadAction<Draft<Type>>) => {
                    state.value = newValue.payload;
                },
            },
        });

        this.publisher = configureStore({
            reducer: this.slice.reducer,
        });
    }

    /*
    // EXAMPLE

    useEffect(() => {
        const unsubscribe = StateManager.somePublisher.subscribe(() => {
            console.log("Received!");
        });

        return () => {
            unsubscribe();
        };
    }, []);
    */
    public subscribe(callback: () => void): () => void {
        return this.publisher.subscribe(callback);
    }

    public publish(value: Type) {
        this.publisher.dispatch(this.slice.actions.publishAction(value));
    }

    public read(): Type {
        return this.publisher.getState().value;
    }
}

export default LeafValuePublisher;
