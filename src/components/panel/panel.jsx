import React, { useContext } from "react";
import styled from "styled-components";

import CreateListing from "./createListing";

import { ProductContext } from "../../contexts/products";

export default function Panel()
{
    let Pass = useContext(ProductContext);

    if (Pass.listings.length === 0)
        Pass.getListings();

    return (
        <PanelStyle>
            Panel
            <CreateListing />
        </PanelStyle>
    );
};

let PanelStyle = styled.div`

`;