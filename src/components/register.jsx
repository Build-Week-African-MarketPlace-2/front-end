import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Register()
{
    let history = useHistory();
    
    let [FormData, sFormData] = useState(
        {
            username:"",
            password:"",
            error:""
        }
    )

    let updateForm = function(e)
    {
        sFormData(
            {
                ...FormData,
                [e.target.name]:e.target.value
            }
        );
    }

    let submitForm = function(e)
    {
        let SubData =
        {
            ...FormData,
            types:e.target.types.value
        }
        
        history.push("/login");
    }

    return (
        <RegisterStyle>
            Register
            <form onSubmit={(e)=>{e.preventDefault(); submitForm(e);}} onChange={(e)=>{updateForm(e);}}>
                <input type="text" name="username" defaultValue={FormData.username} placeholder="Username" />
                <br />
                <input type="password" name="password" defaultValue={FormData.password} placeholder="Password" />
                <br />
                {/* */}
                    <label htmlFor="customer">Customer</label>
                    <input type="radio" name="types" id="customer" value="customer" /><br />
                    <label htmlFor="owner">Business Owner</label>
                    <input type="radio" name="types" id="owner" value="owner" /><br />
                {/* */}
                <button type="submit">Register</button>
            </form>
            <h2>{FormData.error === "" ? null : FormData.error}</h2>
            <Link to="/login">Already have an account? Login here!</Link>
        </RegisterStyle>
    );
};

let RegisterStyle = styled.div`

`;