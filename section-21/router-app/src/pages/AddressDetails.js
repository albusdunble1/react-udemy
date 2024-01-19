import { Link, useParams } from "react-router-dom"



export default function AddressDetails(props) {
    const params = useParams();

    // const { city, id, postcode } = props.address;

    return (
        <>
            {/* <h1>{city}</h1> */}
            <h2>{params.addressId}</h2>
            {/* <h2>{params.addressId} {id}</h2> */}
            {/* <h3>{postcode}</h3> */}

            <p><Link to=".." relative="path">Back</Link></p>

            {/* default is relative to the parent route defined in the createBrowserRouter  */}
            {/* the relative prop is only important when using ".." relative path  */}
            {/* relative prop doesnt affect absolute path  */}
            {/* <p><Link to="..">Back</Link></p>
            <p><Link to=".." relative="route">Back</Link></p> */}
        </>
    )
}