import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';


export default function Header() {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((total, item) => {
        return total + item.quantity
    }, 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    // MY ALTERNATIVE TO REDUCE
    // let totalCartItems = 0;
    // cartCtx.items.map(item => item.quantity).forEach(itemQuantity => {
    //     totalCartItems += itemQuantity
    // });

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="logo image" />
                <h1>React Food</h1>
            </div>
            <nav>
                {/* <button>Cart (0)</button> */}
                {/* <Button textOnly>{`Cart (${cartCtx.items.length})`}</Button> */}
                <Button textOnly onClick={handleShowCart}>{`Cart (${totalCartItems})`}</Button>
            </nav>
        </header>
    )
}