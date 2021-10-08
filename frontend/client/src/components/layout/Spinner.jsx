import React from 'react'
import loading from '../../img/loading.gif'
const Spinner = () => {
    return (
        <>
         <img src = {loading} sx = {{width:'200px',height:'100px', margin: 'auto', display: 'block'}} alt = '...loading'/>   
        </>
    )
}

export default Spinner
