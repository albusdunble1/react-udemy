import { useRef } from "react";

export default function LoginWithRef() {

  const emailRef = useRef();
  const passwordRef = useRef();
  console.log('REFRESHED')

  function handleSubmit(event) {
    event.preventDefault();
    console.log('SUBMITTED')

    let formValues = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    console.log(formValues)


    // reset form
    // downside of ref is that resetting the values is bad practive as we are accessing the dom directly
    // you will also end up with a lot of refs for complex forms and you have to manually link them to the input fields
    // emailRef.current.value = '';
    // passwordRef.current.value = '';

    // slightly better approach but it's still manipulating the dom manually
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={emailRef}/>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={passwordRef}/>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        {/* <button className="button" onClick={handleSubmit}>Login</button> */}
        {/* <button type="button"className="button" onClick={handleSubmit}>Login</button> */}
        <button className="button">Login</button>
      </p>
    </form>
  );
}
