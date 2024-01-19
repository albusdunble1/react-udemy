import { Form, useActionData, useNavigate, useNavigation } from 'react-router-dom';
import { json, redirect } from "react-router-dom";

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate('..');
  }


  console.log('FORM REFRESHED')
  return (
    // when using Form by react router, the form data will be redirected to the action property
    <Form method={method} className={classes.form}>
    {/* action will be sent to the action function on the same path by default
    but we can also send the form data to action in other paths by specifying the action prop with the desired path */}
    {/* <Form method="post" action="/other-path" className={classes.form}> */}



      {data && data.errors && (
          <ul>
              {Object.values(data.errors).map(error => {
                  return <li key={error}>{error}</li>
              })}
          </ul>
      )}

      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event? event.title : ''}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event? event.image : ''}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event? event.date : ''}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event? event.description : ''}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting? 'Submitting LA' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;


export async function action({request, params}) {

  const data = await request.formData();
  
  const newEvent = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description')
  }

  let url = 'http://localhost:8080/events';

  if (request.method === 'PATCH'){
    url = url + '/' + params.eventId;
  }

  const response = await fetch(url, {
    method: request.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEvent)
  });

  // CHECK FOR VALIDATION ERROR FROM THE BACKEND 422
  if (response.status === 422) {
      return response;
  }


  if(!response.ok){
    throw json({message: 'Could not save event LOL!'}, {status: 500});
  }

  return redirect('/events');
}