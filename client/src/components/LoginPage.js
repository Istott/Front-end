//This is the first page the user sees after leaving the marketing page
//User can either login or register from here (but only one is displayed at a time)

//components contained in LoginPage:
//LoginForm
//RegistrationForm

import React, {useState, useEffect} from 'react';
// import LoginForm from './LoginForm';
import styled from "styled-components";
import RegistrationForm from './RegistrationForm';
// import { Tween, Timeline } from 'react-gsap';
import './LoginPage.css'
import axiosWithAuth from "../utils/axiosWithAuth"
import * as yup from 'yup'

const TopCard = styled.div`
  background-color: #C0C0C0;
  padding: 3%;
  color: #470B97;
  border-radius: 10px;
`;

const Tab = styled.div `
overflow: hidden;
background-color:  #C0C0C0;
width: 39.5%;
display: flex;
justify-content: space-around;
`

// const FormInput = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `;

const initialFormValues = {
  username: '',
  password: ''
}

const initialFormErrors = {
  username: '',
  password: ''
}

const formSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'userame must be atleast 3 characters')
    .required('userName is required'),
  password: yup
    .string()
    .min(6, 'Password Must be at least 6 characters long')
    .required('Password is Required'),
})



function LoginPage(props) {

  const [active, setActive] = useState(true)
  const [credentials, setCredentials] = useState(initialFormValues);

  const [formDisabled, setFormDisabled] = useState(true)
  const [formErrors, setFormErrors] = useState(initialFormErrors)


  const handleChanges = event => {
    // setCredentials({
    //       ...credentials,
    //         [event.target.name]: event.target.value
    //       })

    const name = event.target.name
    const value = event.target.value

    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: '',
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      });

      setCredentials({
      ...credentials,
      [name]: value,
    })
  }

  const loginToApp = event => {
    event.preventDefault();
    axiosWithAuth().post('https://bw-essentialism-1.herokuapp.com/api/auth/login', credentials)
    .then(res => {
      console.log(res)
      localStorage.setItem('token', res.data.token);
      props.history.push('/essentials')
      
    })
    .catch(err => console.log(err), "A")
  }

  useEffect(() => {
    formSchema.isValid(credentials)
      .then(valid => {
        setFormDisabled(!valid)
      })
  }, [credentials])

  

  // const TimelineComponent = () => (
  //   <Timeline
  //     target={
        // <div>
        //   <div className="App">
        //     <header className="App-header">

        //       <TopCard>
        //         <h1>Essentialism inc.</h1>

        //         <div className={`loginCard ${active ?'activeTab':'tabContent'}`}>
        //             <h5>Login Here</h5>

        //             <div className="login">
        //                 <div>
        //                     <form onSubmit={loginToApp}>
        //                         <input name="username" type="text"  placeholder=' username' onChange={handleChanges} />
        //                         <input name="password" type="password"  placeholder=' password' onChange={handleChanges} />
        //                         <button>Login</button>
        //                     </form>
        //                 </div>
        //             </div>

        //         </div>
        //         <div className={`loginCard ${active ?'tabContent':'activeTab'}`}>
        //             <RegistrationForm setActive = {setActive} />
        //         </div>
        //       </TopCard>
        //     </header>
        //   </div>
        // </div>
  //     }
  //   >
  //     <Tween from={{ x: '-20px', opacity: .5 }} to={{ x: '0px' }} />
  //     <Tween from={{ opacity: .5 }} to={{ opacity: 1 }} />
  //   </Timeline>
  // );


  return (
    <div className='container'>
      <div className='toggle'>
        <Tab className="tab" >
            <button className={`Button ${ active ? 'active' : ''}`} onClick={() => setActive(true)} >Login</button>
            <button className={`Button ${active ? '' : 'active'}`} onClick={() => setActive(false)}>Register</button>
        </Tab>
      </div>

      {/* <TimelineComponent></TimelineComponent>    */}
      <div className="App">
        <header className="App-header">

          <TopCard>
            <h1>Essentialism inc.</h1>

            <div className={`loginCard ${active ?'activeTab':'tabContent'}`}>
              <h5>Login Here</h5>

              <div className='errors'>
                <p>{formErrors.username}</p>
                <p>{formErrors.password}</p>
            </div>

              <div className="login">
                <div>
                  <form>
                    <input value={credentials.username} name="username" type="text"  placeholder=' username' onChange={handleChanges} />
                    <input value={credentials.password} name="password" type="password"  placeholder=' password' onChange={handleChanges} />
                    <button onSubmit={loginToApp} disabled={formDisabled}>Login</button>
                  </form>
                </div>
              </div>

            </div>
            <div className={`loginCard ${active ?'tabContent':'activeTab'}`}>
                <RegistrationForm setActive = {setActive} />
            </div>
          </TopCard>
        </header>
      </div>

      <p>	&#9400; 2020, Essentialism inc.</p>
    </div>

  );
}


export default LoginPage;