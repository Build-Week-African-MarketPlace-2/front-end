import React from "react";
import { Link } from "react-router-dom";

export default function BaseNav()
{
    return (
        <>
            <a href="#" onClick={()=>{window.localStorage.removeItem("auth");}}>Logout</a>
            &nbsp;
            <Link to="/products">Product List</Link>
            &nbsp;
            <Link to="/panel">Panel</Link>
            <br />
        </>
    )
}