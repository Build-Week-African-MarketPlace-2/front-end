import React, { useContext } from "react";
import styled from "styled-components";
import { axiosWithAuth } from "../axiosWithAuth";
import { ProductContext } from "../../contexts/products";

export default function CreateListing(data)
{
    let Pass = useContext(ProductContext);

    let Submit = function(e)
    {
        let Build = 
        {
            name:e.target.iname.value,
            description:e.target.idescription.value,
            location:e.target.ilocation.value,
            category:e.target.icategory.value,
            price:e.target.iprice.value,
            user_id:window.localStorage.getItem("uid")
        }
       
        axiosWithAuth().post("/api/products", Build).then((response)=>
        {
            Pass.getListings();
        
        }).catch((error)=>
        {
            console.log(error.response);
        })
    }

    return (
      <div>
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
      </div>
    );
};

