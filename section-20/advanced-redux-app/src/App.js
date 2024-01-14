import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/Notification/Notification';
import { useEffect } from 'react';
import { uiActions } from './store/ui-slice';
import { fetchCartData, sendCardData } from './store/cart-actions';

// so that we know if App is rendered for the first time (moved to changed property in cart initial state)
// let isInitial = true;

function App() {

  const cartIsVisible = useSelector(state => state.ui.cartIsVisible);
  const notification = useSelector(state => state.ui.notification);
  const dispatch = useDispatch();

  // subscribe to the card state so that useEffect can send execute the async code to send the data to firebase
  // we cant use async code in redux reducer
  const cart = useSelector(state => state.cart);

  // ===== USE EFFECT ALTERNATIVE FOR ACTION CREATOR ============
  // useEffect(() => {
  //   const sendCartData = async () => {

  //     dispatch(uiActions.showNotification({
  //       status: 'pending',
  //       title: 'Sending...',
  //       message: 'Sending cart data bro!'
  //     }))

  //     const response = await fetch("https://react-redux-database-51a0e-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json", {
  //       method: 'PUT',
  //       body: JSON.stringify(cart)
  //     });

  //     if (!response.ok) {
  //       throw new Error('Sending cart data failed LOL!')
  //     }

  //     const responseData = await response.json();

  //     dispatch(uiActions.showNotification({
  //       status: 'success',
  //       title: 'Success!',
  //       message: 'Successfully sent cart data bro!'
  //     }))

  //   }

  //   // if renders for the first time dont send the data yet
  //   if (isIniital) {
  //     isIniital = false;
  //     return;
  //   }

  //   sendCartData().catch(error => {
  //     dispatch(uiActions.showNotification({
  //       status: 'error',
  //       title: 'Error!',
  //       message: 'Cannot send cart data bro!'
  //     }))
  //   });
 
  //   // dispatch is added but react redux will ensure that it will not change
  //   // i added it because in the lecture video, there was a yellow squiggly line(so he added it) but my IDE does not have the yellow line
  // }, [cart, dispatch])

  useEffect(() => {
    // if renders for the first time dont send the data yet
    if (!cart.changed) {
      return;
    }

    // action creator/thunk
    // alternative to the commented code above
    // normally we would use dispatch(cartActions.addItemToCart), cartActions.addItemToCart automatically creates an action function for us {type: 'unique identifier etc'}
    // in this case, we create our own action creator known as sendCartData in cart-slice js
    dispatch(sendCardData(cart));
 
    // dispatch is added but react redux will ensure that it will not change
    // i added it because in the lecture video, there was a yellow squiggly line(so he added it) but my IDE does not have the yellow line
  }, [cart, dispatch])

  useEffect(() => {
    dispatch(fetchCartData());

  }, [dispatch])

  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>

  );
}

export default App;
