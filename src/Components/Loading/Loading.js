import React from "react";
import ReactLoading from "react-loading";
import './Loading.css'
 
export default function Loading(){
    return(
        <div className="loading">
            <ReactLoading type="spokes" color="#000" height={50} width={50} />
            <h4 className='loading-text'>Loading...</h4>
        </div>
    )
}