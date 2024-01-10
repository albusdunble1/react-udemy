// import { useEffect } from "react";
// import { useState } from "react"
// import { fetchMeals } from "../http";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItem from "./MealItem";

const requestConfig = {};

export default function Meals() {
    // {} will be recreated everytime the Meals component is reexecuted since it's an object, causing an infinite loop
    // so we declare the object outside the function so it doesnt get recreated and trigger the infinite loop
    // const {data: meals, isLoading, error} = useHttp('http://localhost:3000/meals', {}, []);
    const {data: meals, isLoading, error} = useHttp('http://localhost:3000/meals', requestConfig, []);
    // const [meals, setMeals] = useState([]);

    // useEffect(() => {
    //     async function fetchAvailableMeals() {
    //         const fetchedMeals = await fetchMeals();
    //         setMeals(fetchedMeals);
    //     }

    //     fetchAvailableMeals();

    // }, [])

    if (isLoading) {
        return <p className="center">Fetching meals...</p>;
    }

    if (error) {
        return <Error title="Failed to fetch meals!" message={error}/>;
    }

    return (
        <ul id="meals">
            {meals.map((meal) => {
                return (
                    // <li key={meal.id} className="meal-item">
                    //     <img src={"http://localhost:3000/" + meal.image} alt="meal image" />
                    //     <h3>{meal.name}</h3>
                    //     <h2 className="meal-item-price">{meal.price}</h2>
                    //     <p className="meal-item-description">{meal.description}</p>
                    //     <button className="meal-item-action">Add to Cart</button>
                    // </li>
                    <MealItem key={meal.id} meal={meal} />
                )

            })}
        </ul>

    )

}