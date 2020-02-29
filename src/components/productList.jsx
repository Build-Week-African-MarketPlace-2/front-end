import React, { useContext } from "react";
import styled from "styled-components";

import { ProductContext } from "../contexts/products";

export default function ProductList()
{
    let Pass = useContext(ProductContext);
    
    if (Pass.listings.length === 0)
        Pass.getListings();

    return (
        <ProductListStyle>
            Product List
        </ProductListStyle>
    );
};

let ProductListStyle = styled.div`

`;