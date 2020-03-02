import React, { useState } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router";
import PrivateRoute from "./components/privateRoute";
import Axios from "axios";

import Login from "./components/login";
import Register from "./components/register";
import ProductList from "./components/productList";
import Panel from "./components/panel/panel";

import { ProductContext } from "./contexts/products";

export default function App()
{
  let [listings, sListings] = useState([]);

  let GetListings = function()
  {
    Axios.get("http://158.69.205.136/nothing").then((response)=>
    {
      sListings([{testItem:"po"}]);
    }).catch((error)=>
    {
      console.log(error);
    })
  }

  return (
    <HeadStyle>
      <Switch>
        <Route exact path="/" component={function(){return (<>Base</>)}} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
      
      <ProductContext.Provider value={{listings:listings, getListings:GetListings}}>
        <Switch>
          <Route path="/products" component={ProductList} />
          <PrivateRoute path="/panel" component={Panel} />
        </Switch>
      </ProductContext.Provider>
    </HeadStyle>
  );
};

let HeadStyle = styled.div`
  
`;