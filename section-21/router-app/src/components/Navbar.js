import { Link, NavLink } from "react-router-dom";
import classes from "./Navbar.module.css"


// className is not a string and accepts a function instead in this case due to react router dom 
// good practice to just add the end prop to NavLink to tell the router that isActive should only be true for URL that ends with the "to" prop
// it is currently unnecessary for the "/" route but just add anyways 
// the nested routes will still be affected if end is not added
export default function Navbar() {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li><NavLink end to="/" className={({isActive}) => isActive? classes.active : undefined}>Home</NavLink></li>
                    <li><NavLink to="/contact-us" className={({isActive}) => isActive? classes.active : undefined}>Contact Us</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}