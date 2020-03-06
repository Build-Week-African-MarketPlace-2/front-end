import React, { useContext } from "react";
import styled from "styled-components";

import CreateListing from "./createListing";

import { ProductContext } from "../../contexts/products";

export default function Panel()
{
    let Pass = useContext(ProductContext);
    let UID = window.localStorage.getItem("uid");

    if (Pass.listings.length === 0)
        Pass.getListings();

    return (
        <PanelStyle>
            Items
            {
                Pass.listings.filter((i)=>
                {
                    return i.user_id === parseInt(UID) ? true : false;
                }).map((e, index)=>
                {
                    return (
                        <div key={index} className="product">
                            {e.name}<br />
                            {e.description}<br />
                            {e.location}<br />
                            {e.category}<br />
                            {e.price}<br />
                            <button onClick={(f)=>{Pass.deleteItem(e.id)}}>Delete</button>
                        </div>
                    )
                })
            }
            <CreateListing />
        </PanelStyle>
    );
};

let PanelStyle = styled.div`
    .product
    {
        border: 3px solid white;
        border-radius: 5px;
        padding: 5px 0px;
        margin: 10px 20px;
        text-align: center;

        background-color: #353535;
    }

    form
    {
        border: 1px solid black;
        padding: 20px;
        text-align: right;
    }
`;