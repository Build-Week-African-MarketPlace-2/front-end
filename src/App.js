import React, { useState } from "react";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router";
import PrivateRoute from "./components/privateRoute";
import { axiosWithAuth } from "./components/axiosWithAuth";

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
    axiosWithAuth().get("/items").then((response)=>
    {
      sListings(response.data);
    }).catch((error)=>
    {
      console.log(error);
    })
  }

  return (
    <HeadStyle>
      <Switch>
        <Route exact path="/"><Redirect to="/login" /></Route>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
      
      <ProductContext.Provider value={{listings:listings, getListings:GetListings}}>
        <Switch>
          <PrivateRoute path="/products/:id?" component={ProductList} type="1" />
          <PrivateRoute path="/panel" component={Panel} type="2" />
        </Switch>
      </ProductContext.Provider>
    </HeadStyle>
  );
};

let HeadStyle = styled.div`
  
`;