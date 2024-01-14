import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        
        const fetchRequest = async () => {
            const response = await fetch("https://react-redux-database-51a0e-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json");

            if (!response.ok) {
                throw new Error('Fetching cart data failed LOL!')
            }

            const responseData = await response.json();
            
            return responseData;
        }

        try {
            const cartData = await fetchRequest();

            // dispatch(cartActions.replaceCart(cartData));

            // will throw error if firebase json doesnt match the expected argument (e.g. firebase doesnt have items property after we remove all of it)
            // totalQuantity is fine because once added, it will never be removed
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }));

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Successfully fetched cart data bro!'
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Cannot fetch cart data bro!'
            }))
        }
    };
}



export const sendCardData = (cart) => {
    // dispatch argument is automatically provided by react redux
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data bro!'
        }))
    
        const sendRequest = async () => {
            const response = await fetch("https://react-redux-database-51a0e-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json", {
                method: 'PUT',
                body: JSON.stringify(cart)
            });

            if (!response.ok) {
                throw new Error('Sending cart data failed LOL!')
            }
        }

        try {
            await sendRequest();

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Successfully sent cart data bro!'
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Cannot send cart data bro!'
            }))
        }
    }
}
