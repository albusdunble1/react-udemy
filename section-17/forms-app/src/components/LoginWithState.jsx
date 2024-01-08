import { useState } from "react";
import Input from "./Input";

export default function LoginWithState() {

  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  })

  const invalidEmail = didEdit.email && !formValues.email.includes('@');
  const invalidPassword = didEdit.password && formValues.password.trim().length < 6;

  function handleInputChange(identifier, value) {
    setFormValues(prevValues => ({
      ...prevValues,
      [identifier]: value
    }))

    // to make sure that the validation error disappears when the user tries to input a new value
    setDidEdit(prevValues => {
        return {
            ...prevValues,
            [identifier]: false
        }
    })
  }

//   console.log('REFRESHED')
//   console.log(didEdit)
//   console.log(invalidEmail)

  function handleSubmit(event) {

    event.preventDefault();
    console.log('SUBMITTED')
    console.log(formValues)

    // reset form
    setFormValues({
        email: '',
        password: ''
    })

    setDidEdit({
        email: false,
        password: false
    })
  }


  function handleInputBlur(identifier) {
    setDidEdit(prevValues => {
        return {
            ...prevValues,
            [identifier]: true
        }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input 
            label="Email" 
            id="email" 
            type="email" 
            name="email" 
            value={formValues.email} 
            onChange={(event) => handleInputChange('email', event.target.value)} 
            onBlur={() => handleInputBlur('email')}
            error={invalidEmail && 'Please enter a valid email bro!'}
        />

        <Input 
            label="Password" 
            id="password" 
            type="password" 
            name="password" 
            value={formValues.password} 
            onChange={(event) => handleInputChange('password', event.target.value)} 
            onBlur={() => handleInputBlur('password')}
            error={invalidPassword && 'Please enter a valid password bro!'}
        />

        {/* <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input onBlur={() => handleInputBlur('email')} id="email" type="email" name="email" value={formValues.email} onChange={(event) => handleInputChange('email', event.target.value)}/>
          {invalidEmail && <p>Please enter a valid email address!</p>}
        </div>
        
        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" value={formValues.password} onChange={(event) => handleInputChange('password', event.target.value)}/>
        </div> */}
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
