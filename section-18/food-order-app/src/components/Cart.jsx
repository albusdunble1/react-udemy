import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((total, item) => total + (item.price*item.quantity), 0);


    function handleCartClose() {
        userProgressCtx.hideCart();
    }

    function handleCheckout() {
        userProgressCtx.showCheckout();
    }

    function handleDecreaseQuantity(id) {
        cartCtx.removeItem(id);
    }

    function handleIncreaseQuantity(item) {
        cartCtx.addItem(item);
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart'? handleCartClose : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map(item => {
                    return (
                        // <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price}/>
                        <CartItem key={item.id} {...item} onDecrease={() => handleDecreaseQuantity(item.id)} onIncrease={() => handleIncreaseQuantity(item)}/>
                    )
                })}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCartClose}>Close</Button>
                {cartCtx.items.length > 0 && <Button onClick={handleCheckout}>Go to Checkout</Button>} 
            </p>
        </Modal>
    )
}