import { useState } from "react";
import './TimeChoser.css'
function TimeChoser({Times,setTimes,day}){

    var ListItems = []
    
    function toggleItem(i){
        let items = [...Times];
        if(items[day][i] == 1) items[day][i] = 0;
        else items[day][i] = 1;
        setTimes(items);
    }

    for(let i = 0;i<24;i++){
        ListItems.push( <li key = {i}>
                            <button onClick = {() => toggleItem(i)}style = {{
                                backgroundColor : (Times[day][i] ? "blue" : "white"),
                                width: "30px",
                                height: "30px",
                                }}>
                           
                            </button>
                        </li>);
    }
    return (<ul className="choose_line">{ListItems}</ul>);
}

export default TimeChoser