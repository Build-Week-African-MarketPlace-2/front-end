import React, { useContext } from "react";
import styled from "styled-components";

import CreateListing from "./createListing";
import PanelProduct from "./panelProduct";

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
                    return i.user_id === parseInt(UID);
                }).map((e, index)=>
                {
                    return (
                        <PanelProduct info={e} key={index} />
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
        padding: 20px;
        text-align: right;
    }
`;