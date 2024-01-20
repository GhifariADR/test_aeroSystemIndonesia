import React, { useEffect, useState } from "react";
import titleize from "titleize";
import './App.css'
import { useNavigate } from "react-router-dom";

function App() {

  const [product, setProduct] = useState([])
  const [Search, setSearch] = useState("")
  const navigate = useNavigate()

  const getFlight = async (val) => {

    if(val) {
      const response = await fetch(`http://localhost:3000/data?destination=${val}`)
      const respJson = await response.json()
      setProduct(respJson)
    } else {
      const response = await fetch(`http://localhost:3000/data`)
      const respJson = await response.json()
      setProduct(respJson)
    }

  }

  const handleSearch = (e) => {
    const {target} = e;
    setSearch(target.value)
  }

  const handeSubmit = () => {
    const capital = titleize(Search);
    getFlight(capital);
  }

  useEffect(() => {
    getFlight()
  },[])


  return (
    <div className="wrapper" >
      <button onClick={() => navigate('/admin')} >Login As Admin</button>
      <div className="tittle">
      Bandung international Airport Today Flight Schdule  
      </div>
      <div className="search" >
        <input onChange={handleSearch} placeholder="Cari destinasimu ...."></input>
        <button style={{marginLeft : '10px'}} type="button" onClick={handeSubmit}>Search</button>
      </div>
        {product.map((val,i) =>{
          return(
          <div id ={i.toString} className="map" style={{}}>
            <p>Destination : {val.destination}</p>
            <p>Departure : {val.departure}</p>
            <p style={{textAlign:'center'}} >{val.date}</p>
            <p style={{textAlign:'center'}}>{val.time} WIB</p>
          </div>
          )
        })}
    </div>
  );
}

export default App;
