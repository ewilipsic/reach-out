import './Form.css';
import { useNavigate } from 'react-router-dom';

function SignInForm() {
  const navigate = useNavigate();
  
  async function HandleSignIn(event) {
    event.preventDefault(); // Prevent default form submission
    
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      password: formData.get('password')
    };

    try {
      const response = await fetch("http://localhost:5000/SignIn", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for session cookies
        body: JSON.stringify(data), // Send as JSON
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
        
      if (result.success) {
        navigate(result.redirectTo); 
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during sign in');
    }
  }

  return (
    <div className='card'>
      <h2 className='formtitle'>Sign In</h2>
      <form className="Form" onSubmit={HandleSignIn}>
        <label className='label'>Name</label>
        <input type="text" name="name" required />
        <label className='label'>Password</label>
        <input type="password" name="password" required />
        <input type="submit" value="Submit" /> 
      </form>
    </div>
  );
}

export default SignInForm;