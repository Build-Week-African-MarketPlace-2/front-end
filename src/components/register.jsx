import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

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
                <button type="submit">Register</button>
            </form>
            <h2>{FormData.error === "" ? null : FormData.error}</h2>
        </RegisterStyle>
    );
};

let RegisterStyle = styled.div`

`;