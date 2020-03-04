import React, { useContext } from "react";
import styled from "styled-components";
import { axiosWithAuth } from "../axiosWithAuth";
import { useHistory } from "react-router";
import { ProductContext } from "../../contexts/products";

export default function CreateListing()
{
    let Pass = useContext(ProductContext);
    let history = useHistory();

    console.log(Pass);

    let Submit = function(e)
    {
        let Build = 
        {
            name:e.target.iname.value,
            description:e.target.idescription.value,
            location:e.target.ilocation.value,
            category:e.target.icategory.value,
            price:e.target.iprice.value
        }
       
        axiosWithAuth().post("/items/additem", Build).then((response)=>
        {
            Pass.getListings();
            history.push("/products");
        }).catch((error)=>
        {
            console.log(error.response);
        })
    }

    return (
        <CreateListingStyle>
            Create Listing
            <form onSubmit={(e)=>{e.preventDefault(); Submit(e);}}>
                <input type="text" name="iname" placeholder="Name" /><br />
                <input type="text" name="idescription" placeholder="Description" /><br />
                <input type="text" name="ilocation" placeholder="Location" /><br />
                
                <label htmlFor="icategory">Category </label>
                <select id="icategory">
                    <option value="Accessories">Accessories</option>
                    <option value="Instruments">Instruments</option>
                    <option value="Foods">Foods</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Seeds">Seeds</option>
                </select>
                <br />

                <input type="number" name="iprice" placeholder="Price" /><br />
                <button type="submit">Add Item</button>
            </form>
        </CreateListingStyle>
    );
};

let CreateListingStyle = styled.div`

`;