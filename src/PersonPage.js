import { useLocation } from "react-router-dom";
import TimeChoser from "./components/TimeChoser";
import { useState } from "react";
import './PersonPage.css'

function PersonPage() {
    const location = useLocation();
    const userdata = location.state.data;
    const person = location.state.person;
    
    
    
    var a = [];
    a.push(new Array(24).fill(0))
    a.push(new Array(24).fill(0))
    a.push(new Array(24).fill(0))
    a.push(new Array(24).fill(0))
    a.push(new Array(24).fill(0))
    a.push(new Array(24).fill(0))
    a.push(new Array(24).fill(0))
    
    
    for(const day in userdata["contacts"][person]){
        for(let i = 0;i < 2400 ;i+=100){
            for (var interval in userdata["contacts"][person][day]){
                interval = userdata["contacts"][person][day][interval]
                if(Math.min(i + 100, interval[1]) - Math.max(i, interval[0]) >= 1){
                    a[day][i/100] = 1
                }
            }
        }
    }

    
    const [Times,setTimes] = useState(a);

    async function send_new_times() {
        var new_times = {
            0:[],
            1:[],
            2:[],
            3:[],
            4:[],
            5:[],
            6:[]
        }

        for(let d = 0;d < 7;d++){
            for(let i = 0;i < 2400 ;i+= 100){
                if(Times[d][i/100]) new_times[d].push([i,i+100]);
            }
        }

        console.log(Times);
        console.log(new_times);

        const data = {times: new_times , person_name : person}

        try {
            const response = await fetch("http://localhost:5000/UpdatePerson", {
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
              console.log("updated");
            } else {
              console.log(result.message);
            }
        } catch (error) {
            console.error('Update error', error);
            alert('Error in upadate');
        }
    }
   
    return(
        <div className="background">
        <div className="col">
            <h1 className="headig">{person}</h1>
            <div className = "Timerow">
                <h2 className="dayname">Monday</h2>
                <TimeChoser Times = {Times} setTimes={setTimes} day={1}/>
            </div>
            <div className = "Timerow"><h2 className="dayname">Tuesday</h2>
            <TimeChoser Times = {Times} setTimes={setTimes} day={2}/></div>
            <div className = "Timerow"><h2 className="dayname">Wednesday</h2>
            <TimeChoser Times = {Times} setTimes={setTimes} day={3}/></div>
            <div className = "Timerow"><h2 className="dayname">Thursday</h2>
            <TimeChoser Times = {Times} setTimes={setTimes} day={4}/></div>
            <div className = "Timerow"><h2 className="dayname">Friday</h2>
            <TimeChoser Times = {Times} setTimes={setTimes} day={5}/></div>
            <div className = "Timerow"><h2 className="dayname">Saturaday</h2>
            <TimeChoser Times = {Times} setTimes={setTimes} day={6}/></div>
            <div className = "Timerow"><h2 className="dayname">Sunday</h2>
            <TimeChoser Times = {Times} setTimes={setTimes} day={0}/></div>
            <button onClick={send_new_times}>update</button>
        </div>
        </div>
    );
}

export default PersonPage;
