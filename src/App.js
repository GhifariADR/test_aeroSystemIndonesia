import React, { useEffect, useState } from "react";
import titleize from "titleize";
import './App.css'
function App() {

  const [product, setProduct] = useState([])
  const [Search, setSearch] = useState("")

  const getFlight = async (val) => {

    if(val) {
      const response = await fetch(`http://localhost:3000/data?destination=${val}`)
      const respJson = await response.json()
      console.log(respJson);
      setProduct(respJson)
    } else {
      const response = await fetch(`http://localhost:3000/data`)
      const respJson = await response.json()
      console.log(respJson);
      setProduct(respJson)
    }

  }

  const getSearch = async (val) => {
    const response = await fetch(`http://localhost:3000/data?destination=${val}`)
    const respJson = await response.json()
    console.log(respJson);
  }

  const handleSearch = (e) => {
    const {target} = e;
    setSearch(target.value)
  }

  const handeSubmit = () => {
    const capital = titleize(Search);
    console.log(capital);
    getFlight(capital);
  }

  useEffect(() => {
    getFlight()
  },[])


  return (
    <div className="wrapper" >
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
