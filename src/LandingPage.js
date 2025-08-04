import { useState } from 'react';
import './components/SignUpForm'
import './components/SignInForm'
import './LandingPage.css';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';


function LandingPage() {
  const [formState,setFormState] = useState(0)

  function handleClickSignIn(){
    setFormState(1);
  }

  function handleClickSignUp(){
    setFormState(2);
  }

  return (
    <div className="screen">
        <div className='screeninside'>
        {(() => {
            if(formState == 0){
              return (<></>);
            }
            else if(formState == 1){
              return (<SignInForm />)
            }
            else if(formState == 2){
              return (<SignUpForm />)
            }
          })()
        }

        <div className='span'> </div>
        <div className='card'>
        <div className='col'>
          <h1 className='heading'> Reach Out </h1>
          <p className='caption'> Human Biengs Have Friends. You do too.</p>
        </div>

        <div className='button_bar'>
          <button className='signin' onClick={handleClickSignIn}> Sign in </button>
          <button className='signup' onClick={handleClickSignUp}> Sign up </button>
        </div>
        </div>

        
        </div>

        <div className='bottom-text'>
          <p>We hold no liabilty for your continued sadness</p>
        </div>
      
    </div>

    
  );
}

export default LandingPage;
