import { useState } from 'react';
import ShowAvailable from './components/ShowAvailable';
import './HomePage.css';
import ShowAll from './components/ShowAll';
import refresh from './refresh.svg';


function HomePage() {
  
  const [userdata,setUserData] = useState({"init" : false});
  async function getData(){
    var result;
    try {
      const response = await fetch("http://localhost:5000/getuserdata", {credentials: 'include'} );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      result = await response.json();
      setUserData(result);
    } catch (error) {
      console.error(error.message);
    }
   
  }

  if("init" in userdata){
    console.log("sent");
    getData();
    console.log("got data");
    return (
      <div>
        <h1>Waiting</h1>
      </div>
    );
  }

  async function AddPerson(event){
    event.preventDefault(); 

    const formData = new FormData(event.target);
    const data = {
      new_contact: formData.get('name'),
    };
    
    try {
      const response = await fetch("http://localhost:5000/AddPerson", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify(data), 
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
        
      if (result.success) {
        console.log("added");
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Error in adding friend');
    }
  }

  
  return (
    <div className='backing'>
    <div className='center_column'>
      <h1 className='page_heading'> Hello <span className='color_text'> {userdata["name"]} </span> </h1>
      <button onClick={getData} className='refresh'><img className='imgref' src = {refresh} /></button>

      <h2 className='section_heading'>Available</h2>
      <ShowAvailable className = 'showAvail' userdata = {userdata} />

      <h2 className='section_heading'>All People</h2>
      <ShowAll className = 'showAvail' userdata = {userdata} />

      <h2 style={{backgroundColor: "#111113",color:"whitesmoke"}} >Add person</h2>
        <form className = 'add_person_form' onSubmit={AddPerson}> 
            <label style= {{color:"whitesmoke"}}>Name</label>
            <input type="text" name = "name" />
            <input type="submit" name = "Submit"/> 
        </form>
    </div>
    </div>
  );
}

export default HomePage;
