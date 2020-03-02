import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

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
                window.localStorage.setItem("class", 1);
                history.push("/products");
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
        let SubData =
        {
            ...FormData,
            types:e.target.types.value
        }

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
                {/* */}
                    <label htmlFor="customer">Customer</label>
                    <input type="radio" name="types" id="customer" value="customer" /><br />
                    <label htmlFor="owner">Business Owner</label>
                    <input type="radio" name="types" id="owner" value="owner" /><br />
                {/* */}
                <button type="submit">Login</button>
            </form>
            <h2>{FormData.error === "" ? null : FormData.error}</h2>
            <Link to="/register">Don't have an account yet? Click here!</Link>
        </LoginStyle>
    );
};

let LoginStyle = styled.div`

`;