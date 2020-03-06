import React, { useContext, useState } from "react";
import { ProductContext } from "../../contexts/products";

//Last minute code, begin.

export default function PanelProduct(props)
{
    let Pass = useContext(ProductContext);

    let [Editing, setEditing] = useState(false);
    let [ProdData, sProdData] = useState(props.info);

    let SubmitUpdate = function()
    {
        setEditing(false);
        Pass.updateItem(ProdData);
    }

    return (
        <>
            <div className="product" onClick={()=>{setEditing(true);}}>
                {
                    !Editing ?
                        <>
                            {ProdData.name}<br />
                            {ProdData.description}<br />
                            {ProdData.location}<br />
                            {ProdData.category}<br />
                            R{ProdData.price}<br />
                            <button onClick={()=>{Pass.deleteItem(ProdData.id)}}>Delete</button>
                        </>
                    :
                        <form onSubmit={(e)=>{e.preventDefault(); SubmitUpdate();}}>
                            <input type="text" name="name" defaultValue={ProdData.name} onChange={(e)=>{sProdData({...ProdData, [e.target.name]:e.target.value});}} />
                            <br />
                            <input type="text" name="description" defaultValue={ProdData.description} onChange={(e)=>{sProdData({...ProdData, [e.target.name]:e.target.value});}} />
                            <br />
                            <input type="text" name="location" defaultValue={ProdData.location} onChange={(e)=>{sProdData({...ProdData, [e.target.name]:e.target.value});}} />
                            <br />
                            
                            <label htmlFor="category">Category </label>
                            <select id="category" name="category" defaultValue={ProdData.category} onChange={(e)=>{sProdData({...ProdData, [e.target.name]:e.target.value});}}>
                                <option value="Accessories">Accessories</option>
                                <option value="Instruments">Instruments</option>
                                <option value="Foods">Foods</option>
                                <option value="Beverages">Beverages</option>
                                <option value="Seeds">Seeds</option>
                            </select>
                            <br />
                            <input type="number" name="price" defaultValue={ProdData.price} onChange={(e)=>{sProdData({...ProdData, [e.target.name]:e.target.value});}} /><br />
                            <br />
                            <button type="submit">Update</button>
                        </form>
                }
            </div>
        </>
    )
}