import { createContext, useReducer } from "react";


const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
})


function cartReducer(state, action) {

    if (action.type == 'ADD_ITEM'){
        const existingCartItemIndex = state.items.findIndex(item => item.id == action.item.id);

        // do not mutate the original state, always create a new array/object
        const updatedItems = [...state.items];

        // if item exists, just increase the quantity
        if (existingCartItemIndex !== -1) {
            // updatedItems[existingCartItemIndex].quantity += 1
            const existing = state.items[existingCartItemIndex];

            const updatedItem = {
                ...existing,
                quantity: existing.quantity + 1
            }

            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({...action.item, quantity: 1});
        }

        // good practice to spread the remaining state even though we only have the items state for this project
        return {...state, items: updatedItems};
    }

    if(action.type == 'REMOVE_ITEM'){
        const existingCartItemIndex = state.items.findIndex(item => item.id == action.id);

        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            }

            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {...state, items: updatedItems};
    }

    if(action.type == 'CLEAR_CART'){
        return {...state, items: []};
    }


    return state;
}

export function CartContextProvider({children}) {

    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []})

    // cartContext will change whenever the cart state changes
    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    }

    function addItem(item) {
        // if the name of the object is same as the key (e.g. item: item), the shorthand version of just 'item' can be used
        dispatchCartAction({
            type: 'ADD_ITEM',
            item
        })
    }

    function removeItem(id) {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id
        })
    }

    function clearCart() {
        dispatchCartAction({
            type: 'CLEAR_CART'
        })
    }

    console.log('INSIDE CART CONTEXT')
    console.log(cartContext)

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
}


export default CartContext;