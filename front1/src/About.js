import React from 'react'

function About(){
   // localStorage.setItem('userID', JSON.stringify(this.state.username));
    const textFromStorage = localStorage.getItem('userID');
    console.log(textFromStorage)
    return(
        <div>
            <h1> About me!</h1>
        </div>
    )
}
export default About