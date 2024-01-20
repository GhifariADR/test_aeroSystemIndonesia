import React, { useEffect, useState  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Admin.css'

function Admin() {
  const [flight, setFlight] = useState([])
  const [id, setId] = useState("")
  const navigate = useNavigate()

  const getFlight = async () => {
    const response = await fetch(`http://localhost:3000/data`)
    const respJson = await response.json()
    console.log(respJson);
    setFlight(respJson)
  }

  const handleSubmit = async () => {
    let destination = document.getElementById("destination").value
    let departure = document.getElementById("departure").value
    let date = document.getElementById("date").value
    let time = document.getElementById("time").value

    await axios
    .post("http://localhost:3000/data",{
      destination : destination,
      departure : departure,
      date : date,
      time : time
    })
    .then((res) => {
      console.log(res);
      window.location.reload()
    })
    .catch((err) => {
      console.log(err.message);
    })

    console.log("Klik add");
    
  }

  const deleteData = async (id) => {
    console.log(id);
    await axios
    .delete(`http://localhost:3000/data/${id}`)
    .then((resp) => {
      console.log(resp);
      window.location.reload()
    })
    .catch((err)=>{
      console.log(err.message);
    })
  }

  const editData = (id, destination, departure, date, time) => {

    document.getElementById("destination").value = destination
    document.getElementById("departure").value = departure
    document.getElementById("date").value = date
    document.getElementById("time").value = time

    console.log(id);
    setId(id)

    document.getElementById("btn-add").style.display = "none"
    document.getElementById("btn-update").style.visibility = "visible"
    document.getElementById("btn-cancel").style.visibility = "visible"
    
    

  }

  const updateData = async (id) => {
    let destination = document.getElementById("destination").value
    let departure = document.getElementById("departure").value
    let date = document.getElementById("date").value
    let time = document.getElementById("time").value

    
    console.log('update data');
    
    await axios
    .patch(`http://localhost:3000/data/${id}`,{
      destination : destination,
      departure : departure,
      date : date,
      time : time
    })
    .then((res) => {
      console.log(res);
      window.location.reload()
    })
    .catch((err) => {
      console.log(err.message);
    })

  }

  const btnCancel = () => {
    window.location.reload()
  }

  useEffect(() => {
    getFlight()
  },[])


  return (
    <div style={{ width: "600px", margin: "0 auto" }}>
      <button onClick={() => navigate('/')}>Back to Home</button>
      <h1>Admin Page</h1>
      <div >
        <form>
          <p>Destination :</p>
          <input className="flight-input" type="text" id="destination" placeholder="Input Your Destiantion...." ></input><br></br>
          <p>Departure :</p>
          <input className="flight-input" type="text" id="departure" placeholder="Input Your departure...." ></input><br></br>
          <p>Date :</p>
          <input className="flight-input" type="text" id="date" placeholder="Input Your date...." ></input><br></br>
          <p>Time :</p>
          <input className="flight-input" type="text" id="time" placeholder="Input Your Time...." ></input><br></br>
        </form>
        <div style={{margin:"15px", gap:"10px"}}>
          <button className="btn-add" id="btn-add" onClick={handleSubmit}> ADD</button>
          <button className="btn-update" id="btn-update" onClick={e=>updateData(id)}> Update</button>
          <button className="btn-cancel" id="btn-cancel" onClick={btnCancel} > Cancel</button>
          
        </div>
      </div>
      <table style={{width:"108%"}}>
        <tr>
          <th>Destination</th>
          <th>Departure</th>
          <th>Date</th>
          <th>Time</th>
          <th>Action</th>
        </tr>
        {flight.map((val, i) => (
          <tr key={i}>
            <td>{val.destination}</td>
            <td>{val.departure}</td>
            <td>{val.date}</td>
            <td>{val.time} WIB</td>
            <td>
                <button  onClick={e => editData(val.id, val.destination, val.departure, val.date, val. time)} >Edit</button>
                <button onClick={e => deleteData(val.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Admin;
