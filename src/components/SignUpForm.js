
import './Form.css';


function SignUpForm() {

  async function HandleSignUp(FormData){
    const response = await fetch("http://localhost:5000/SignUp",{
      method: "POST",
      body: FormData,
    });

    const text = await response.text();
    console.log(text);
   

  }

  return (
    <div className='card'>
        <h2 className='formtitle'>Sign Up</h2>
        <form className="Form" action={HandleSignUp}>
            <label className='label'>Name</label>
            <input type="text" name = "name" />
            <label className='label'>Password</label>
            <input type="text" name = "password" />
            <input type="submit" name = "Submit"/> 
        </form>
    </div>
  );
}

export default SignUpForm;
