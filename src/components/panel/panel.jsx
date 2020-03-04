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
            Panel
            {
                Pass.listings.filter((i)=>
                {
                    return i.user_id === parseInt(UID) ? true : false;
                })
            }
            <CreateListing />
        </PanelStyle>
    );
};

let PanelStyle = styled.div`

`;