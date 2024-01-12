// import { legacy_createStore as createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import authReducer from "./auth";
// import { createStore } from "redux";

// const initialCounterState = { counter: 0, showCounter: true } 
// const initialAuthState = { isAuthenticated: false } 

// const counterSlice = createSlice({
//     name: 'counter',
//     initialState: initialCounterState,
//     reducers: {
//         increment(state){
//             // THIS IS FINE BECAUSE EVEN IF IT LOOKS LIKE WE ARE MUTATING THE STATE DIRECTLY
//             // REDUX TOOLKIT WILL DETECT THIS MUTATION AND CONVERT THIS INTO A IMMUTABLE FORM BEHIND THE SCENES
//             // SO IT'S ACTUALLY IMPOSSIBLE TO MUTATE THE ORIGINAL OBJECT USING REDUX TOOLKIT
//             // THIS MAKES OUR LIVES EASIER AS WE DON'T NEED TO CREATE A NEW OBJECT BY OURSELVES AND SPREAD THE OTHER STATES IN THE NEW OBJECT
//             // WE CAN JUST TARGET THE DESIRED STATE DIRECTLY
//             state.counter++;
//         },
//         decrement(state){
//             state.counter--;
//         },
//         increase(state, action){
//             state.counter = state.counter + action.payload;
//         },
//         toggleCounter(state){
//             state.showCounter = !state.showCounter;
//         },
//     }
// })

// const authSlice = createSlice({
//     name: 'auth',
//     initialState: initialAuthState,
//     reducers: {

//         login(state){
//             state.isAuthenticated = true;
//         },
//         logout(state){
//             state.isAuthenticated = false;
//         },
//     }
// })


// const counterReducer = (state = initialState, action) => {
//     // NEVER MUTATE THE ORIGINAL state OBJECT to prevent unpredictable and hard to debug errors, ALWAYS CLONE
//     if (action.type === 'increment') {
//         return {
//             ...state,
//             counter: state.counter + 1
//         }
//     }

//     if (action.type === 'increase') {
//         return {
//             ...state,
//             counter: state.counter + action.value
//         }
//     }

//     if (action.type === 'decrement') {
//         return {
//             ...state,
//             counter: state.counter - 1
//         }
//     }

//     if (action.type === 'toggle') {
//         return {
//             ...state,
//             showCounter: !state.showCounter
//         }
//     }

//     // return unchanged state if no action type
//     return state;
// }

// const store = createStore(counterReducer);


// if you only have 1 slice, below works fine
// const store = configureStore({
//     reducer: counterSlice.reducer
// });

// const store = configureStore({
//     // the object passed into the reducer property will be merged into 1 main reducer behind the scenes
//     reducer: {
//         counter: counterSlice.reducer,
//         auth: authSlice.reducer
//     }
// });

const store = configureStore({
    // the object passed into the reducer property will be merged into 1 main reducer behind the scenes
    reducer: {
        counter: counterReducer,
        auth: authReducer
    }
});


// redux toolkit will convert the actions into {type: 'UNIQUE IDENTIFIER'} for us behind the scenes
// export const counterActions = counterSlice.actions;
// export const authActions = authSlice.actions;

export default store;