import React, { useState } from "react";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router";
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
      sListings([
        {
          name:"beans",
          description:"just beans",
          price:"5.00",
          location:"Serengeti",
          category:"food",
          URL:"#what",
          user_id:1
        },
        {
          name:"pickles",
          description:"just pickles",
          price:"2.00",
          location:"Serengeti",
          category:"food",
          URL:"#what",
          user_id:1
        }
      ]);
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