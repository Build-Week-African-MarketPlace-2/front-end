import React, { useContext } from "react";
import { ProductContext } from "../../contexts/products";

//Last minute code, begin.

export default function PanelProduct(props)
{
    let Pass = useContext(ProductContext);
    let e = props.info;

    return (
        <>
            <div className="product">
                {e.name}<br />
                {e.description}<br />
                {e.location}<br />
                {e.category}<br />
                R{e.price}<br />
                <button onClick={()=>{Pass.deleteItem(e.id)}}>Delete</button>
            </div>
        </>
    )
}