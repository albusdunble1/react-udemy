import { Await, useLoaderData, useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";
import { Suspense } from "react";

export default function EditEvent() {

    // const data = useLoaderData();
    const data = useRouteLoaderData('event-detail');
    console.log('EDIT EVENT PAGE')
    console.log(data)


    return (
        <>
            <h1>Edit Event Page</h1>
            {/* <EventForm method="patch" event={data.event}/> */}

            {/* apparently this is instant as the event Promise has already been resolved in event details page */}
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading Event Details...</p>}>
                <Await resolve={data.event}>
                    {(loadedEvent) => <EventForm method="patch" event={loadedEvent}/>}
                </Await>
            </Suspense>

        </>
    )
}