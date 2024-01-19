import { Link } from "react-router-dom";


const ADDRESSES = [
    {id: 'a1', city: 'Gelugor', postcode: 11700},
    {id: 'a2', city: 'Georgetown', postcode: 11600},
    {id: 'a3', city: 'Jelutong', postcode: 11500},
]

export default function ContactUs() {
    return (
        <>
            <h1>Contact Us</h1>
            <ul>
                {ADDRESSES.map((address) => {
                    return (
                        <li key={address.id}><Link to={address.id}>{address.city}</Link></li>

                        // absolute path alternative
                        // <li key={address.id}><Link to={`/contact-us/${address.id}`}>{address.city}</Link></li>
                    )
                })}
                {/* <li><Link to="/contact-us/address-1">Address Details 1</Link></li>
                <li><Link to="/contact-us/address-2">Address Details 2</Link></li>
                <li><Link to="/contact-us/address-3">Address Details 3</Link></li> */}
            </ul>
        </>

        
    )
}