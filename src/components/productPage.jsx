import React from "react";
import styled from "styled-components";

export default function ProductPage(props)
{
    let Product = props.product[0];

    if (Product === undefined)
        return <h2>Couldn't find that product...</h2>

    return (
        <ProductStyle>
            <h1>{Product.name}, R{Product.price}</h1>
            <h2>{Product.description}</h2>
            <h3>Located at {Product.location}</h3>
            <h3>Listed by {Product.user_id}</h3>
            <h4>#{Product.category}</h4>
        </ProductStyle>
    );
};

let ProductStyle = styled.div`
    img
    {
        width: 200px;
    }
`;