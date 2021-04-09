import React from 'react';
import './Weather.css';

function Weather(props) {
   
      return (
        <div className="container text-light">
        
         <div className="sub-con pt-4">
             <h2>{props.city}  {props.country}</h2>
             <h5 className="py-4">
             <i className={`wi ${props.weatherIcon} display-1`}></i>
             </h5>
             {props.temp_celsius ? (<h1 className="py-2">{props.temp_celsius}&deg;</h1>) : null }

            {minmaxTemp(props.temp_min,props.temp_max)}
            <h3 className="py-3">{props.description}</h3>
         </div>
         {props.temp_celsius ? null : (<h7 className="yuni">By Younus Baloch</h7>) }
          </div>
      )
    
  }

  function minmaxTemp(min,max){
     if(min && max){ return (
       <h3>
           <span className="px-4">{min}&deg;</span>
           <span className="px-4">{max}&deg;</span>
       </h3>
      )
     }
  }

export default Weather
