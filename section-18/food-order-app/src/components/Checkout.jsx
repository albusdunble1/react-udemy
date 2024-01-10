import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
// import { submitOrder } from "../http";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig)

    const cartTotal = cartCtx.items.reduce((total, item) => total + (item.price*item.quantity), 0);

    function handleCheckoutClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        // console.log(formData.get('name'));
        const customerData= Object.fromEntries(formData.entries());
        console.log(customerData);


        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));

        // async function submitCheckoutOrder() {
        //     const response = await submitOrder(cartCtx.items, customerData);
        //     console.log('ORDER SUBMITTED')
        //     console.log(response)
        // }

        // submitCheckoutOrder();
    }


    let actions = (
        <>
            <Button type="button" textOnly onClick={handleCheckoutClose}>Close</Button>
            <Button>Submit Order</Button>
        </>
    )

    if (isSending) {
        actions = <span>Sending order data...</span>;
    }

    if (data && !error) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={userProgressCtx.progress === 'checkout'? handleCheckoutClose : null}>
                <h2>Success!</h2>
                <p>Your order was submitted successfuly.</p>
                <p>Message from the backend: <b>{data.message}</b></p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={userProgressCtx.progress === 'checkout'? handleCheckoutClose : null}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name"/>
                <Input label="Email" type="email" id="email"/>
                <Input label="Street" type="text" id="street"/>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                </div>

                {error && <Error title="Failed to submit order LOL!" message={error}/>}

                <p className="modal-actions">
                    {/* <Button type="button" textOnly onClick={handleCheckoutClose}>Close</Button>
                    <Button>Submit Order</Button> */}
                    {actions}
                </p>
            </form>
        </Modal>
    )
}