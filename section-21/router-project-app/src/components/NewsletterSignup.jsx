import { Form, useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

export default function NewsletterSignup() {

    // Form, submit provided by fetcher allows us to access actions and loaders from other routes
    const fetcher = useFetcher();

    // as opposed to useNavigation and useActionData because useNavigation redirects the page
    const { data, state } = fetcher;

    if (state === "submitting") {
        console.log('SUBMITTING NEWS LETTER')
    }

    useEffect(() => {
        if (state === "idle" && data && data.message) { 
            console.log('++++++++++++++++++++++++++++++++++++++++++++++')
            console.log(state)
            console.log('YES LOLS')
            window.alert(data.message);
        } else {
            console.log('============================================')
            console.log(state)
            console.log('NOPE LOLS')
        }
    }, [data, state]);

  return (
    // fetcher.Form so that we dont redirect to /newsletter which is what will happen if we use Form
    // we specify action because that's where we want react to find the newsletterAction
    <fetcher.Form method="post" action="/newsletter" className={classes.newsletter}>
      <input
        type="email"
        name='email'
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}