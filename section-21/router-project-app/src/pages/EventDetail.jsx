import { Await, Link, defer, json, redirect, useLoaderData, useParams, useRouteLoaderData } from "react-router-dom"
import EventItem from "../components/EventItem";
import Events from "./Events";
import EventsList from "../components/EventsList";
import { Suspense } from "react";


export default function EventDetail() {

    const params = useParams();

    // const data = useLoaderData();


    // const data = useRouteLoaderData('event-detail');


    const {event, events} = useRouteLoaderData('event-detail');


    return (
        <>
            {/* <h1>Event Detail Page</h1>
            <p>{params.eventId}</p>
            <p>
                <Link to=".." relative="path">Back</Link>
            </p> */}

            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading Event Details...</p>}>
                <Await resolve={event}>
                    {(loadedEvent) => <EventItem event={loadedEvent}/>}
                </Await>
            </Suspense>


            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading Events...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents}/>}
                </Await>
            </Suspense>

            {/* <EventItem event={data.event}/>
            <EventsList /> */}
        </>
    )
}


// we cant use react hooks such as useParams to get the eventId
// but loader by default accepts an object that has request and params property
// we can use the params property to get the eventId instead
export async function loader_old_without_defer({request, params}) {

    // can be used to extract the url
    // request.url

    const id = params.eventId;


    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok) {
        throw json({ message: 'Could not fetch event details of id:' + id + ' LOL!'}, {status: 500});
    } else {
        return response;
    }

    // usually the alternative above makes sense but since react router helps us resolve the promise and extract the data inside
    // we can just return the Promise directly and we will be able to access the data in the Promise
    // but if we want to check for the response's http status code, we have to use the solution above
    // return fetch('https://localhost:8080/events/' + id);
}


export async function action({request, params}) {

    const eventId = params.eventId;
    const testData = await request.formData();
    console.log(testData.get('test'))
    console.log(request.method)
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method
    });
  
    if(!response.ok){
      throw json({message: 'Could not delete event LOL!'}, {status: 500});
    }
  
    return redirect('/events');
}


// WITH DEFER + SUSPENSE ===================================


export async function loadEvent(id) {

    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok) {
        throw json({ message: 'Could not fetch event details of id:' + id + ' LOL!'}, {status: 500});
    } else {
        const resData = await response.json();
        return resData.event;
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


export async function loader({request, params}) {

    // we can add await in defer to tell react to wait for the data to be loaded first before showing the page at all
    // so when we use await for loadEvent, we will never see the 'loading...' fallback set in the page for event details
    // we will then see the loading element set by useNavigation state === 'loading'
    return defer({
        // event:  await loadEvent(params.eventId),
        event:  loadEvent(params.eventId),
        events: loadEvents()
    })
}