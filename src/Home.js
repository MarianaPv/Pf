import React, {Component, useState} from "react";
import app from 'firebase/app'


function Home () {


      return (
        <>
        <div className="header">
            Home Birch
        </div>
        <button onClick={() => app.auth().signOut()}>Sign out</button>
        </>
      );
}


export default Home;