import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true } 

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment(state){
            // THIS IS FINE BECAUSE EVEN IF IT LOOKS LIKE WE ARE MUTATING THE STATE DIRECTLY
            // REDUX TOOLKIT WILL DETECT THIS MUTATION AND CONVERT THIS INTO A IMMUTABLE FORM BEHIND THE SCENES
            // SO IT'S ACTUALLY IMPOSSIBLE TO MUTATE THE ORIGINAL OBJECT USING REDUX TOOLKIT
            // THIS MAKES OUR LIVES EASIER AS WE DON'T NEED TO CREATE A NEW OBJECT BY OURSELVES AND SPREAD THE OTHER STATES IN THE NEW OBJECT
            // WE CAN JUST TARGET THE DESIRED STATE DIRECTLY
            state.counter++;
        },
        decrement(state){
            state.counter--;
        },
        increase(state, action){
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state){
            state.showCounter = !state.showCounter;
        },
    }
})

// redux toolkit will convert the actions into {type: 'UNIQUE IDENTIFIER'} for us behind the scenes
export const counterActions = counterSlice.actions;

export default counterSlice.reducer;