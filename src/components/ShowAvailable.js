import "./ShowAvailable.css"
import { useNavigate } from 'react-router-dom';
import rene from './rene.jpg';
import klaassje from './klaassje.jpeg';
import kim_kisaragi from './kim_kisaragi.jpeg';
import guston from './guston.jpeg';


function ShowAvailable({userdata}) {
    const navigate = useNavigate();
    const now = new Date();
    const weekday = now.getDay();
    const listItems = [];

    function convertDateToMilitaryTimeInteger(dateObject) {
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');

        return parseInt(formattedHours + formattedMinutes);
    }

    const time = convertDateToMilitaryTimeInteger(now);

    function GoToPersonPage(userdata , key){
        navigate("/PersonPage",{state :{data :  userdata, person : key}})
    }

    const styles = [
                {
                    position: "relative",
                    top: "0%",
                    backgroundColor: "#f2ede3",
                    paddingBottom: "20px",
                    paddingLeft: "60px",
                    paddingRight: "60px",
                    paddingTop: "20px",
                    margin: "20px",
                    borderRadius: "10px",
                    border: "0px",
                    backgroundImage: `url(${klaassje})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: "no-repeat",
                },
                {
                    position: "relative",
                    top: "0%",
                    backgroundColor: "#c59834",
                    paddingBottom: "20px",
                    paddingLeft: "60px",
                    paddingRight: "60px",
                    paddingTop: "20px",
                    margin: "20px",
                    borderRadius: "10px",
                    border: "0px",
                    backgroundImage: `url(${rene})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: "no-repeat",
                },
                {
                    position: "relative",
                    top: "0%",
                    backgroundColor: "#301a10",
                    paddingBottom: "20px",
                    paddingLeft: "60px",
                    paddingRight: "60px",
                    paddingTop: "20px",
                    margin: "20px",
                    borderRadius: "10px",
                    border: "0px",
                    backgroundImage: `url(${kim_kisaragi})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: "no-repeat",
                    color: "white"
                },
                {
                    position: "relative",
                    top: "0%",
                    backgroundColor: "#b3a677",
                    paddingBottom: "20px",
                    paddingLeft: "60px",
                    paddingRight: "60px",
                    paddingTop: "20px",
                    margin: "20px",
                    borderRadius: "10px",
                    border: "0px",
                    backgroundImage: `url(${guston})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: "no-repeat",
                },
            ]
     
    for (const key in userdata["contacts"]){
        for (var interval in userdata["contacts"][key][weekday]){
            interval = userdata["contacts"][key][weekday][interval]
            if(interval[0] <= time && time <= interval[1]){
                listItems.push(
                <li key = {listItems.length}> 
                    <button onClick = {() => GoToPersonPage(userdata,key)} style={styles[Math.floor(Math.random() * 3.99)]} >
                        <p>{key}</p>
                    </button>
                </li>);
            }
        }
    }
    return (
        <ul className="list_grid">{listItems}</ul>
    );
}

export default ShowAvailable;
