import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

export default function Error() {

    const error = useRouteError();

    let title = 'AN ERROR HAS OCCURED LOL!';
    let message = 'Something went wrong lol!';


    // error will have status if we throw Response in the loader
    // if we throw anything else there's just the data property
    if (error.status === 500) {
        // only need to json parse if we throw our own Response object
        // message = JSON.parse(error.data).message;

        
        message = error.data.message;
    }

    if (error.status === 404) {
        title = 'PAGE NOT FOUND LOL';
        message = 'COULD NOT FIND RESOURCE OR PAGE LOL';
    }


    return (
        <>
            {/* <h1>AN ERROR HAS OCCURED LOL!</h1> */}
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    )
}