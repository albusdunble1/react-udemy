import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

export default function MealItem({meal}) {

    const cartCtx = useContext(CartContext);

    function handleAddToCart() {
        cartCtx.addItem(meal);
    }

    return (
        <li className="meal-item">
            <article>
                <img src={"http://localhost:3000/" + meal.image} alt="meal image" />
                <div>
                    <h3>{meal.name}</h3>
                    <h2 className="meal-item-price">{currencyFormatter.format(meal.price)}</h2>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
    )
}