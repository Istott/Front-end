//This component is a form used for creating a new pair of login credentials for a user that does not have an account yet
//form should have validation visible to user

//Form inputs should include:
//username
//password
//submit button

//This component is a form used for creating new login credentials for
// a user who does not yet have an account.
//Form should have validation visible to user

//Form inputs should include:
//username
//password
//submit button

import React from 'react';
// import axios from 'axios';
import  axiosWithAuth from '../utils/axiosWithAuth';

const RegistrationForm = props => {
  const {
    setActive,
    credentials,
    handleChanges,
    formDisabled,
    formErrors,
  } = props

    // console.log(props)

    // const [credentials, setCredentials] = useState({
    //     username: '',
    //     password: '',
    //     confirmPassword: 
    //     // passwordConfirm: '',
    //     // passError: '',
    //     // successMess: ''
    // });

    // const handleChanges = event => {
    //     setCredentials( {
    //           ...credentials,
    //             [event.target.name]: event.target.value
    //           } )
    //       }

    const submitForm = event => {
      event.preventDefault();
      axiosWithAuth()
        .post('https://bw-essentialism-1.herokuapp.com/api/auth/register', credentials)
        .then(res => {
          console.log(res)
          setActive(true);
          })
        .catch(err => console.log(err));
    };

  return (
    <div>
      <h5>Register Here</h5>

      <div className='errors'>
        <p>{formErrors.username}</p>
        <p>{formErrors.password}</p>
        <p>{formErrors.confirmPassword}</p>
      </div>

      <form onSubmit={submitForm}>
        <div>Username:</div>
        <input id='username' name="username" type="text"  placeholder=' username' value={credentials.username} onChange={handleChanges} />
        <div>Password: </div>
        <input id='Password' name="password" type="password" placeholder=' password' value={credentials.password} onChange={handleChanges} />
        <div>Confirm Password: </div>
        <input id='confirmPassword' name="confirmPassword" type="password" placeholder=' confirm password' value={credentials.confirmPassword} onChange={handleChanges} />
        
        <button onClick={() => setActive(true)} disabled={formDisabled}>Register</button>
      </form>
    </div>
  );
}


export default RegistrationForm;