import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

export default function Login(props)
{
    let history = useHistory();

    let [FormData, sFormData] = useState(
        {
            username:"",
            password:"",
            error:""
        }
    )

    //////////////////////////////////////////////////
    //Temporary data, to be replaced with API

    function verifyLogin(user, pass)
    {
        if (user === "user_name")
        {
            if (pass === "pass_word")
            {
                window.localStorage.setItem("auth", "000");
                history.push("/panel");
            }
            else
                sFormData({...FormData, error:"Invalid password"});
        }
        else
            sFormData({...FormData, error:"Invalid username"});
    }

    //////////////////////////////////////////////////

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
        verifyLogin(FormData.username, FormData.password);
    }

    return (
        <LoginStyle>
            Login
            <form onSubmit={(e)=>{e.preventDefault(); submitForm(e);}} onChange={(e)=>{updateForm(e);}}>
                <input type="text" name="username" defaultValue={FormData.username} placeholder="Username" />
                <br />
                <input type="password" name="password" defaultValue={FormData.password} placeholder="Password" />
                <br />
                <button type="submit">Login</button>
            </form>
            <h2>{FormData.error === "" ? null : FormData.error}</h2>
        </LoginStyle>
    );
};

let LoginStyle = styled.div`

`;