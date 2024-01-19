// import { Link } from "react-router-dom"


// const EVENTS = [
//     { id: '1', name: 'Event 1'},
//     { id: '2', name: 'Event 2'},
//     { id: '3', name: 'Event 3'}
// ]

// export default function Events() {


//     return (
//         <>
//             <h1>Events Page</h1>
//             <Link to="/events/new">New Event</Link>
//             <ul>
//                 {EVENTS.map((event) => {
//                     return <li key={event.id}><Link to={event.id}>{event.name}</Link></li>
//                 })}
//             </ul>
//         </>
//     )
// }


import { Await, defer, json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

export default function Events() {

    // const events = useLoaderData();
    const data = useLoaderData();

    // if (data.hasError) {
    //     return <p>{data.message}</p>
    // }

    const events = data.events;

  return (
    <>
      {/* <EventsList events={events} /> */}

        {/* suspense will bypass the default loading set in RootLayout because the fallback is loaded instantly */}
        {/* this allows a better user experience when lazy loading certain parts of the page instead of loading the entire page */}
        {/* i believe this can also be achieved if we call fetch using useEffect but that would require the html components to be loaded first before making the request */}
        {/* so if we want to load the data before displaying the html page, we should use loader and if we use loader, we have to use Suspense */}
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading Events la...</p>}>
            {/* the function between the Await elements are basically .then that executes after event Promise has been resolved */}
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>

    </>
  );
}







export async function loader_OLD_WITHOUT_DEFER() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // this is one way to do it but the alternative below is better
        // return {hasError: true, message: 'Could not fetch events LOL!'}

        // will find the closest errorElement defined in createBrowserRouter and display it
        // errors bubble up until it finds an errorElement
        // throw Error('Loader could not fetch events LOL!');

        // alternative to the json helper method provided by react router
        // creating our own Response object will require us to use json.parse manually in the errorElement
        // throw new Response(JSON.stringify({ message: 'Could not fetch EVENTS LOL'}), {
        //     status: 500
        // });

        // much less code than the alternative above
        throw json({ message: 'Could not fetch EVENTS LOL'}, {status: 500});

    } else {
        //   const resData = await response.json();

      // this will return a Promise because this is an async method, but react router will resolve the promise for us
      // alternatively we can return the data directly if we dont use async method
      // return resData.events;

        // we can also directly return the Response object and react router will automatically extract the data for us
        return response;
    }
}




export async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {

        throw json({ message: 'Could not fetch EVENTS LOL'}, {status: 500});

    } else {
        const resData = await response.json();
        return resData.events;
    }
}


export async function loader() {
    // we can add more loaders for multiple http requests
    // for example we can have loadProfile() and set it to profile key in defer
    return defer({
        events: loadEvents()
    })
}