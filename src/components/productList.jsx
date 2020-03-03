import React, { useContext } from "react";
import styled from "styled-components";

import { ProductContext } from "../contexts/products";
import { useParams } from "react-router";
import ProductPage from "./productPage";
import { Link } from "react-router-dom";

export default function ProductList()
{
    let Pass = useContext(ProductContext);
    
    if (Pass.listings.length === 0)
        Pass.getListings();

    let targetID = useParams().id;

    if (targetID != undefined)
        return <ProductPage product={Pass.listings.filter((i, index)=>{return parseInt(targetID) === index})} />

    return (
        <ProductListStyle>
            <h1>Product List</h1>
            {
                Pass.listings.map((i, index)=>
                {
                    return (
                        <div key={index} className="product">
                            <Link to={`/products/${index}`}><h2>{i.name} - R{i.price}</h2></Link>
                            <h4>{i.description}</h4>
                            <h6>{i.location}</h6>
                        </div>
                    );
                })
            }
        </ProductListStyle>
    );
};

let ProductListStyle = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    h1
    {
        text-align: center;
        width: 100%;
    }

    .product
    {
        border: 1px solid black;
        width: 300px;
        margin: 10px 20px;

        h2, h4, h6
        {
            width: 100%;
            text-align: center;
            margin: 5px 0px;
        }
        
        h2
        {
            text-decoration: underline;
        }
    }
`;