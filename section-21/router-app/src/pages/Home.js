import { Link, useNavigate } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate();

    function handleNavigate() {
        navigate("/contact-us");
    }


    // Link is converting "to" to "href" behind the scenes and prevents the default browser reload behaviour
    return (
        <>
            <h1>Home</h1>  
            <Link to="contact-us">Contact Us</Link>
            {/* <Link to="/contact-us">Contact Us</Link> */}
            <p>
                <button onClick={handleNavigate}>Navigate Programmatically</button>
            </p>
        </>
    )
}