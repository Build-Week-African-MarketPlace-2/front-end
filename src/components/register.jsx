import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, Redirect } from "react-router";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function Register(props)
{
    let history = useHistory();

    let [FormData, sFormData] = useState(
        {
            username:"",
            password:"",
            error:""
        }
    )

    if (window.localStorage.getItem("auth") !== undefined && window.localStorage.getItem("class") !== undefined)
        return (<Redirect to="/products" />);

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
            username: FormData.username,
            password: FormData.password,
            department: e.target.types.value
        }

        Axios.post("https://africanmarketplace-2.herokuapp.com/auth/register", SubData).then((response)=>
        {
            history.push("/login");
        }).catch((error)=>
        {
            sFormData({...FormData, error:error.response.data.message});
        });
    }

    return (
        <RegisterStyle>
            Register
            <form onSubmit={(e)=>{e.preventDefault(); submitForm(e);}}>
                <input type="text" name="username" defaultValue={FormData.username} placeholder="Username" onChange={(e)=>{updateForm(e);}} />
                <br />
                <input type="password" name="password" defaultValue={FormData.password} placeholder="Password" onChange={(e)=>{updateForm(e);}} />
                <br />
                {/* */}
                    <label htmlFor="buyer">Customer</label>
                    <input type="radio" name="types" id="buyer" value="buyer" defaultChecked={true} /><br />
                    <label htmlFor="seller">Business Owner</label>
                    <input type="radio" name="types" id="seller" value="seller" /><br />
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